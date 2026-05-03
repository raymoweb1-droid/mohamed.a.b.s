import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

export async function GET() {
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('content')
      .eq('id', 'main')
      .single();
      
    if (data && data.content) return NextResponse.json(data.content);
  }

  try {
    const fileData = await fs.readFile(DATA_PATH, "utf8");
    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const newData = await request.json();

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from('portfolio_data')
      .upsert({ id: 'main', content: newData });
      
    if (!error) return NextResponse.json({ message: "Data updated in Supabase successfully" });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), "utf8");
    return NextResponse.json({ message: "Data updated locally" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
