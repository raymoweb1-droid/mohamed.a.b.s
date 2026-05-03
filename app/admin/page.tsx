"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  LayoutDashboard,
  User,
  Briefcase,
  Link as LinkIcon,
  Star,
  Quote,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Globe,
  ArrowUpRight,
  ExternalLink,
  Settings,
  Tag,
} from "lucide-react";

// ─── Simple PIN Guard ────────────────────────────────────────────────
const ADMIN_PIN = "1234"; // ← غير هاد الرقم

function PinGuard({ children }: { children: React.ReactNode }) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const check = () => {
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 1500);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-[#0a0a0a] border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col items-center gap-6"
      >
        <div className="p-4 bg-blue-500/10 rounded-2xl">
          <LayoutDashboard className="w-8 h-8 text-blue-500" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black">Command Center</h1>
          <p className="text-zinc-500 text-sm mt-1">Enter your PIN to continue</p>
        </div>
        <motion.div
          animate={error ? { x: [-8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <input
            type="password"
            placeholder="● ● ● ●"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            className={`w-full bg-black border ${
              error ? "border-red-500" : "border-white/[0.05] focus:border-blue-500"
            } rounded-2xl p-4 text-center text-lg tracking-widest outline-none transition-colors`}
          />
        </motion.div>
        {error && (
          <p className="text-red-500 text-xs font-bold">Wrong PIN. Try again.</p>
        )}
        <button
          onClick={check}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl py-4 font-bold transition-all active:scale-95"
        >
          Unlock
        </button>
      </motion.div>
    </div>
  );
}

// ─── Reusable Components ─────────────────────────────────────────────
const Field = ({
  label, children,
}: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full bg-black border border-white/[0.05] rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-colors ${props.className ?? ""}`}
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={`w-full bg-black border border-white/[0.05] rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-colors resize-none ${props.className ?? ""}`}
  />
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0a0a] rounded-[2rem] p-8 border border-white/[0.05] space-y-6">
    <h3 className="text-base font-black uppercase tracking-widest text-zinc-400">{title}</h3>
    {children}
  </div>
);

// ─── Image Upload ────────────────────────────────────────────────────
function ImageUploader({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Project Image</label>
      <div
        onClick={() => fileRef.current?.click()}
        className="relative w-full aspect-video rounded-2xl bg-zinc-900 border border-dashed border-white/10 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-colors group"
      >
        {value ? (
          <img src={value} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8 text-zinc-600 group-hover:text-blue-500 transition-colors" />
            <span className="text-xs text-zinc-500 group-hover:text-blue-400 transition-colors">Click to upload image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-xs font-bold text-white">Change Image</span>
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {/* Or URL input */}
      <Input
        type="text"
        placeholder="Or paste image URL / path (e.g. /project.png)"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────
const TABS = [
  { id: "profile",    label: "Profile",     icon: User },
  { id: "projects",   label: "Projects",    icon: ImageIcon },
  { id: "experience", label: "Experience",  icon: Briefcase },
  { id: "socials",    label: "Socials",     icon: LinkIcon },
  { id: "misc",       label: "Testimonial", icon: Quote },
];

// ─── Main Dashboard ──────────────────────────────────────────────────
function Dashboard() {
  const [data, setData]       = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [status, setStatus]   = useState<{ type: string; msg: string }>({ type: "", msg: "" });
  const [tab, setTab]         = useState("profile");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus({ type: "", msg: "" });
    try {
      const r = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (r.ok) {
        setStatus({ type: "ok", msg: "Portfolio saved successfully! 🎉" });
      } else throw new Error();
    } catch {
      setStatus({ type: "err", msg: "Save failed. Please try again." });
    } finally {
      setSaving(false);
      setTimeout(() => setStatus({ type: "", msg: "" }), 3500);
    }
  };

  const set = (path: string[], val: any) => {
    setData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let cur = next;
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
      cur[path[path.length - 1]] = val;
      return next;
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/80 backdrop-blur-xl px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-blue-500/10 rounded-xl">
            <LayoutDashboard className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h1 className="font-black text-lg leading-none">Command Center</h1>
            <p className="text-zinc-600 text-xs">Portfolio CMS</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors"
          >
            <Eye className="w-4 h-4" /> Preview Portfolio
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Status Toast */}
      <AnimatePresence>
        {status.msg && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-xl text-sm font-bold ${
              status.type === "ok"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {status.type === "ok" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-73px)] border-r border-white/[0.05] p-6 space-y-2 hidden lg:block">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                tab === t.id
                  ? "bg-white/[0.05] text-white border border-white/[0.1]"
                  : "text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.02]"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 max-w-4xl space-y-6">
          {/* Mobile Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  tab === t.id ? "bg-white/[0.08] text-white" : "text-zinc-500"
                }`}
              >
                <t.icon className="w-3 h-3" />
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── PROFILE ── */}
            {tab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <Section title="Personal Info">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Name">
                      <Input value={data.profile.name} onChange={(e) => set(["profile", "name"], e.target.value)} />
                    </Field>
                    <Field label="Role / Title">
                      <Input value={data.profile.role} onChange={(e) => set(["profile", "role"], e.target.value)} />
                    </Field>
                    <Field label="Email">
                      <Input value={data.profile.email} onChange={(e) => set(["profile", "email"], e.target.value)} />
                    </Field>
                    <Field label="Location">
                      <Input value={data.profile.location} onChange={(e) => set(["profile", "location"], e.target.value)} />
                    </Field>
                    <Field label="Age">
                      <Input type="number" value={data.profile.age} onChange={(e) => set(["profile", "age"], +e.target.value)} />
                    </Field>
                    <Field label="Years of Experience">
                      <Input value={data.profile.experience_years} onChange={(e) => set(["profile", "experience_years"], e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Bio">
                    <Textarea rows={4} value={data.profile.bio} onChange={(e) => set(["profile", "bio"], e.target.value)} />
                  </Field>
                  <Field label="Availability">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => set(["profile", "availability"], !data.profile.availability)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${data.profile.availability ? "bg-green-500" : "bg-zinc-700"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${data.profile.availability ? "left-7" : "left-1"}`} />
                      </button>
                      <span className={`text-sm font-bold ${data.profile.availability ? "text-green-400" : "text-zinc-500"}`}>
                        {data.profile.availability ? "Available for new projects" : "Not available right now"}
                      </span>
                    </div>
                  </Field>
                </Section>

                <Section title="Interests / Tags">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {data.interests.map((interest: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-xl text-sm font-medium">
                        {interest}
                        <button onClick={() => set(["interests"], data.interests.filter((_: string, i: number) => i !== idx))}>
                          <X className="w-3 h-3 text-zinc-500 hover:text-red-400 transition-colors" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add interest (e.g. React, Design Systems...)"
                      id="interest-input"
                    />
                    <button
                      onClick={() => {
                        const inp = document.getElementById("interest-input") as HTMLInputElement;
                        if (inp.value.trim()) {
                          set(["interests"], [...data.interests, inp.value.trim()]);
                          inp.value = "";
                        }
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </Section>
              </motion.div>
            )}

            {/* ── PROJECTS ── */}
            {tab === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">Projects <span className="text-zinc-600">({data.projects.length})</span></h2>
                  <button
                    onClick={() => set(["projects"], [...data.projects, { id: Date.now().toString(), title: "New Project", description: "Short description here.", tag: "Web App", image: "", link: "#" }])}
                    className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] px-5 py-3 rounded-2xl text-sm font-bold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                {data.projects.map((p: any, idx: number) => (
                  <Section key={p.id} title={`Project ${idx + 1}`}>
                    <div className="absolute top-6 right-6">
                      <button
                        onClick={() => set(["projects"], data.projects.filter((_: any, i: number) => i !== idx))}
                        className="p-2 rounded-xl text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <ImageUploader
                      value={p.image}
                      onChange={(v) => {
                        const np = [...data.projects];
                        np[idx].image = v;
                        set(["projects"], np);
                      }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Project Title">
                        <Input value={p.title} onChange={(e) => { const np = [...data.projects]; np[idx].title = e.target.value; set(["projects"], np); }} />
                      </Field>
                      <Field label="Tag / Category">
                        <Input value={p.tag} onChange={(e) => { const np = [...data.projects]; np[idx].tag = e.target.value; set(["projects"], np); }} />
                      </Field>
                      <Field label="Description">
                        <Input value={p.description} onChange={(e) => { const np = [...data.projects]; np[idx].description = e.target.value; set(["projects"], np); }} />
                      </Field>
                      <Field label="Live URL">
                        <Input value={p.link} placeholder="https://..." onChange={(e) => { const np = [...data.projects]; np[idx].link = e.target.value; set(["projects"], np); }} />
                      </Field>
                    </div>
                  </Section>
                ))}
              </motion.div>
            )}

            {/* ── EXPERIENCE ── */}
            {tab === "experience" && (
              <motion.div key="experience" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">Experience</h2>
                  <button
                    onClick={() => set(["experience"], [...data.experience, { company: "New Company", role: "Role", period: "2024 - Present", points: ["Task 1"] }])}
                    className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] px-5 py-3 rounded-2xl text-sm font-bold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>

                {data.experience.map((exp: any, idx: number) => (
                  <Section key={idx} title={`Position ${idx + 1}`}>
                    <div className="absolute top-6 right-6">
                      <button
                        onClick={() => set(["experience"], data.experience.filter((_: any, i: number) => i !== idx))}
                        className="p-2 rounded-xl text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <Field label="Company">
                        <Input value={exp.company} onChange={(e) => { const ne = [...data.experience]; ne[idx].company = e.target.value; set(["experience"], ne); }} />
                      </Field>
                      <Field label="Role">
                        <Input value={exp.role} onChange={(e) => { const ne = [...data.experience]; ne[idx].role = e.target.value; set(["experience"], ne); }} />
                      </Field>
                      <Field label="Period">
                        <Input value={exp.period} onChange={(e) => { const ne = [...data.experience]; ne[idx].period = e.target.value; set(["experience"], ne); }} />
                      </Field>
                    </div>
                    <Field label="Bullet Points">
                      <div className="space-y-2">
                        {exp.points.map((pt: string, pIdx: number) => (
                          <div key={pIdx} className="flex gap-2">
                            <Input
                              value={pt}
                              onChange={(e) => { const ne = [...data.experience]; ne[idx].points[pIdx] = e.target.value; set(["experience"], ne); }}
                            />
                            <button onClick={() => { const ne = [...data.experience]; ne[idx].points = exp.points.filter((_: string, i: number) => i !== pIdx); set(["experience"], ne); }}
                              className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => { const ne = [...data.experience]; ne[idx].points.push("New task"); set(["experience"], ne); }}
                          className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors mt-2"
                        >
                          <Plus className="w-4 h-4" /> Add bullet point
                        </button>
                      </div>
                    </Field>
                  </Section>
                ))}
              </motion.div>
            )}

            {/* ── SOCIALS ── */}
            {tab === "socials" && (
              <motion.div key="socials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <Section title="Social Links">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Object.entries(data.socials).map(([key, val]) => (
                      <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                        <Input
                          value={val as string}
                          placeholder={key === "binance_id" ? "Enter Binance ID" : `https://...`}
                          onChange={(e) => set(["socials", key], e.target.value)}
                        />
                      </Field>
                    ))}
                  </div>
                </Section>
              </motion.div>
            )}

            {/* ── TESTIMONIAL / MISC ── */}
            {tab === "misc" && (
              <motion.div key="misc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <Section title="Featured Testimonial">
                  <Field label="Quote Text">
                    <Textarea rows={4} value={data.testimonial.text} onChange={(e) => set(["testimonial", "text"], e.target.value)} />
                  </Field>
                  <div className="grid grid-cols-2 gap-5">
                    <Field label="Author Name">
                      <Input value={data.testimonial.author} onChange={(e) => set(["testimonial", "author"], e.target.value)} />
                    </Field>
                    <Field label="Author Role / Company">
                      <Input value={data.testimonial.role} onChange={(e) => set(["testimonial", "role"], e.target.value)} />
                    </Field>
                  </div>
                </Section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <PinGuard>
      <Dashboard />
    </PinGuard>
  );
}
