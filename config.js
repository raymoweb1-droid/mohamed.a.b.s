// Put your Supabase details here
const SUPABASE_URL = "https://egvhekzpkvttmhwiwren.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndmhla3pwa3Z0dG1od2locmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MzY4MzYsImV4cCI6MjA5MzQxMjgzNn0.7qUU8HxN7q8tQNtJn1mIOj03Mr_EbjIAE0_lMkgUV6g";

// Initialize Supabase Client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
