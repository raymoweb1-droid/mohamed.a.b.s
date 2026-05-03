"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Code,
  Palette,
  ExternalLink,
  MapPin,
  Calendar,
  Smartphone,
  Cpu,
  Figma,
  Dribbble,
  Youtube,
  Instagram,
  Terminal,
  Zap,
  Globe2,
  GraduationCap,
  MessageCircle,
  CreditCard,
  Wallet,
  Check,
  Copy,
  Download,
  Star,
  Quote,
  Loader2
} from "lucide-react";
import React, { useState, useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Card = ({ children, className = "", noPadding = false }: { children: React.ReactNode; className?: string; noPadding?: boolean }) => (
  <motion.div
    variants={item}
    className={`bg-[#0a0a0a] rounded-[2.5rem] ${noPadding ? "" : "p-6 md:p-8"} flex flex-col justify-start border border-white/[0.05] hover:border-white/[0.1] transition-colors relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    {children}
  </motion.div>
);

const Tag = ({ icon, text }: { icon?: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/[0.05] text-[11px] font-medium text-zinc-400 hover:text-white transition-colors">
    {icon}
    {text}
  </div>
);

const ProjectCard = ({ title, desc, tag, img, link }: { title: string; desc: string; tag: string; img: string; link: string }) => (
  <Card noPadding className="h-full">
    <div className="relative aspect-video overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-6 right-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2 block">{tag}</span>
        <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
      </div>
    </div>
    <div className="p-6">
      <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{desc}</p>
      <div className="flex items-center justify-between">
        <a href={link} target="_blank" className="flex items-center gap-2 text-xs font-bold text-white hover:text-blue-400 transition-colors">
          View Project <ExternalLink className="w-3 h-3" />
        </a>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <div className="w-2 h-2 rounded-full bg-zinc-800" />
        </div>
      </div>
    </div>
  </Card>
);

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  return (
    <main className="bg-black min-h-screen text-white p-4 md:p-10 font-sans selection:bg-blue-500/30">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto flex flex-col gap-6"
      >
        {/* Top Section: Avatar and Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Avatar Area */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div
              variants={item}
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/[0.05] group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-950 flex items-center justify-center">
                <span className="text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors">MA</span>
                <div className="absolute inset-4 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-xl border border-white/[0.05] flex items-center justify-center overflow-hidden">
                  <img
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9n3Ou54TLUf_pvwcziXrhcnZbWCcmKIiu7sIA8jj3MijqsEssl93P18-jCXZT9hCPaob68p4m6GTw0CAaHAuTMaDSWri4DF8jHeetpJApzc73KTZvDgdo60ItW0k7KgDoAWvvhVeuUhSfILm1lvjXHyN-NJnQ6YpQuayUDo6I-C3pQetLu3VGRIxC/s1080/profile.jpg.jpeg"
                    alt={data.profile.name}
                    className="w-full h-full object-cover grayscale opacity-60 contrast-[110%] brightness-[70%] group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-700"
                  />
                </div>
                {/* Availability Badge */}
                {data.profile.availability && (
                  <div className="absolute top-8 right-8 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.1] z-10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Available</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
               <button 
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 bg-[#0a0a0a] border border-white/[0.05] hover:border-white/[0.1] rounded-2xl p-4 transition-all active:scale-95 group"
               >
                 <AnimatePresence mode="wait">
                   {copied ? (
                     <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                       <Check className="w-4 h-4 text-green-500" />
                       <span className="text-xs font-bold">Copied!</span>
                     </motion.div>
                   ) : (
                     <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                       <Copy className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                       <span className="text-xs font-bold text-zinc-500 group-hover:text-white">Copy Email</span>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </button>
               <button className="flex items-center justify-center gap-2 bg-white text-black rounded-2xl p-4 font-bold text-xs hover:bg-zinc-200 transition-all active:scale-95">
                 <Download className="w-4 h-4" />
                 CV
               </button>
            </div>
          </div>

          {/* Bio and Interests */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="flex-1 flex flex-col justify-center gap-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                Building <span className="text-blue-500">digital</span> experiences that <span className="italic">matter</span>.
              </h1>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-zinc-400 max-w-2xl">
                I'm <span className="text-white">{data.profile.name}</span>, a self-taught <span className="text-white">{data.profile.role}</span> from Morocco. {data.profile.bio.split(". ")[1]}
              </p>
            </Card>

            <div className="bg-[#0a0a0a] rounded-[2.5rem] p-6 flex flex-wrap items-center gap-4 border border-white/[0.05]">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Interests
              </div>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest: string, idx: number) => (
                  <Tag key={idx} text={interest} icon={idx === 0 ? <Cpu className="w-3 h-3" /> : idx === 1 ? <Palette className="w-3 h-3" /> : idx === 2 ? <Globe2 className="w-3 h-3" /> : <Zap className="w-3 h-3" />} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.projects.map((project: any) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              desc={project.description}
              tag={project.tag}
              img={project.image}
              link={project.link}
            />
          ))}
        </div>

        {/* Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.experience.map((exp: any, idx: number) => (
              <Card key={idx}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <p className="text-zinc-500 text-sm">{exp.role}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${idx === 0 ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-zinc-800/50 text-zinc-500 border-white/5"}`}>
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3 text-zinc-400 text-sm list-disc pl-4 marker:text-blue-500">
                  {exp.points.map((point: string, pIdx: number) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Testimonial / Quote */}
          <Card className="lg:col-span-4 flex flex-col justify-center items-center text-center relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-white/5" />
            <div className="flex gap-1 mb-6">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
            </div>
            <p className="text-lg font-medium italic text-zinc-300 mb-6 leading-relaxed">
              "{data.testimonial.text}"
            </p>
            <div>
              <p className="font-bold text-white">{data.testimonial.author}</p>
              <p className="text-xs text-zinc-500">{data.testimonial.role}</p>
            </div>
          </Card>
        </div>

        {/* Tech Stack & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <Card className="flex flex-col gap-6">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Core Tech Stack</span>
              <div className="grid grid-cols-2 gap-3">
                 <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">R</div>
                    <span className="text-xs font-bold">React 19</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-xs">N</div>
                    <span className="text-xs font-bold">Next.js 16</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-xs">T</div>
                    <span className="text-xs font-bold">Tailwind 4</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">J</div>
                    <span className="text-xs font-bold">JavaScript</span>
                 </div>
              </div>
           </Card>

           <Card className="flex flex-col gap-6">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Education & Growth</span>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.05] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Self-Taught Path</h4>
                  <p className="text-xs text-zinc-500">10,000+ hours of coding & research</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Focused on mastery through real-world projects and deep-diving into documentation.
              </p>
           </Card>

           <Card className="flex flex-col gap-6">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Personal Details</span>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Location</span>
                    <span className="font-bold">{data.profile.location}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Experience</span>
                    <span className="font-bold">{data.profile.experience_years} Years</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Age</span>
                    <span className="font-bold">{data.profile.age} Years</span>
                 </div>
              </div>
           </Card>
        </div>

        {/* Footer Links */}
        <div className="bg-[#0a0a0a] rounded-[2.5rem] p-8 border border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex gap-6">
             <a href={data.socials.github} className="text-zinc-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
             <a href={data.socials.linkedin} className="text-zinc-500 hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
             <a href={data.socials.twitter} className="text-zinc-500 hover:text-sky-400 transition-colors"><Twitter className="w-5 h-5" /></a>
             <a href={data.socials.instagram} className="text-zinc-500 hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
           </div>

           <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-zinc-900/50 rounded-2xl border border-white/[0.05] text-xs font-bold">
                 <Wallet className="w-4 h-4 text-yellow-500" />
                 Binance: {data.socials.binance_id}
              </div>
              <a href={data.socials.paypal} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold text-xs hover:bg-blue-600 transition-all">
                 <CreditCard className="w-4 h-4" />
                 Support via PayPal
              </a>
           </div>
        </div>

      </motion.div>
    </main>
  );
}
