"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const PROJECTS = [
  {
    number: "01",
    name: "The Holmes Project",
    tagline: "2nd Place Philly CodeFest 2026 · Comcast Challenge Winner",
    description:
      "Full-stack civic intelligence platform on Cloudflare Workers with Leaflet interactive mapping, Cloudflare Workers AI, and a Pinecone RAG pipeline with cosine similarity vector search. Delivers context-aware housing, policy, connectivity, and audit insights from live Philadelphia open data. Placed 2nd overall out of 90+ teams (700+ participants) and 1st in the Comcast Connectivity Challenge.",
    tags: ["Next.js", "Cloudflare Workers", "Pinecone", "Neon Postgres", "RAG", "Leaflet"],
    category: "Full-Stack / AI",
    url: "https://holmes.maxlovinger88.workers.dev",
    award: "🏆 2nd Place CodeFest",
  },
  {
    number: "02",
    name: "NQ Futures Trading System",
    tagline: "Algorithmic Trading · Python · Interactive Brokers API",
    description:
      "Dual-feed NQ futures system with a multi-timeframe bias engine featuring confidence scoring, PDH/PDL interaction checks, 9:30/10:00 AM timed re-evaluation, Forex Factory event filtering, and tiered take-profit logic up to 3R. Backtesting engine with strict no-lookahead enforcement and live data ingestion across 9 timeframes (30s → 4h). Signal detectors for FVG/iFVG states, SMT divergence, and liquidity sweep targets across a cascading 4h → 1m hierarchy.",
    tags: ["Python", "Backtrader", "IB API", "ib_insync", "yfinance", "Matplotlib"],
    category: "Quant Finance",
  },
  {
    number: "03",
    name: "OpenClaw",
    tagline: "Self-Hosted Autonomous AI Agent · Raspberry Pi 5",
    description:
      "Self-hosted autonomous AI agent running 24/7 on a Raspberry Pi 5 with Telegram as primary interface. Powered by Kimi k2.5 (Moonshot AI) via the Nvidia NIM inference platform. Integrates Google Workspace automation (Gmail, Calendar) via gog CLI. Implements agentic workflows for searching, evaluating, and backtesting forex trading algorithms using Tavily search and Forex Factory economic event data. Currently also training a custom LLM on the Pi.",
    tags: ["Raspberry Pi 5", "Kimi k2.5", "Nvidia NIM", "Telegram", "Tavily", "Forex Factory"],
    category: "AI Infrastructure",
  },
  {
    number: "04",
    name: "Bayes AI Assistant",
    tagline: "Production RAG Application · 1000+ Concurrent Users",
    description:
      "Production-ready AI application with RAG architecture for personalized responses using Google Gemini 2.0 Flash API, React, and Supabase PostgreSQL. Secure authentication with Row Level Security policies supporting 1000+ concurrent users and a real-time analytics dashboard.",
    tags: ["Gemini 2.0 Flash", "React", "Supabase", "RLS", "pgvector", "RAG"],
    category: "Full-Stack / AI",
    url: "https://bayes-ai.vercel.app",
  },
  {
    number: "05",
    name: "Schemer",
    tagline: "1st Place Tri-Co Hackathon · Built in 24 Hours",
    description:
      "College course planning application with dual student/advisor interfaces, built in 24 hours. Features 4-year academic planning, real-time progress tracking, weekly calendar integration, and comprehensive graduation requirements management.",
    tags: ["Next.js", "TypeScript", "Supabase", "React"],
    category: "Hackathon",
    award: "🥇 1st Place Tri-Co",
    url: "https://schemer-rod.vercel.app",
  },
  {
    number: "06",
    name: "Aperture Ratings",
    tagline: "Movie Rating Platform · Full-Stack",
    description:
      "Full-stack movie rating and discovery platform. Browse, rate, and track films with a clean, fast interface built for cinephiles. Live production deployment.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "API Integration"],
    category: "Full-Stack",
    url: "https://aperture-ratings.vercel.app",
  },
];

type Project = typeof PROJECTS[0];

function TiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["20%", "80%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const CardWrapper = project.url ? motion.a : motion.div;
  const extraProps = project.url
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div variants={staggerItem} className="relative" style={{ perspective: "1000px" }}>
      <CardWrapper
        ref={cardRef as any}
        {...(extraProps as any)}
        className="relative card-glow cursor-pointer group overflow-hidden block"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "2px",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gold accent border */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#F5CB5C]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(245,203,92,0.07) 0%, transparent 55%)`,
          }}
        />

        <div className="p-6 md:p-7" style={{ transform: "translateZ(25px)" }}>
          {/* Number + category */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-mono-custom text-[#F5CB5C] font-bold text-[11px] tracking-[0.2em]">
              {project.number}
            </span>
            <div className="flex items-center gap-2">
              {project.award && (
                <span className="text-[10px] text-[#F5CB5C]" style={{ fontFamily: "var(--font-mono-custom)" }}>
                  {project.award}
                </span>
              )}
              <span
                className="text-mono-custom text-[#7a8075] text-[10px] uppercase tracking-widest px-2 py-1"
                style={{ background: "var(--color-bg-hover)", border: "1px solid var(--color-border-subtle)" }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-card-title mb-1 group-hover:text-[#F5CB5C] transition-colors duration-300">
            {project.name}
          </h3>

          {/* Tagline */}
          <p className="text-label text-[12px] mb-4 leading-relaxed">{project.tagline}</p>

          {/* Description */}
          <p className="text-body text-[13px] mb-5 leading-relaxed">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-mono-custom text-[#CFDBD5] text-[10px] px-2 py-1 uppercase tracking-wide"
                style={{ background: "var(--color-bg-hover)", border: "1px solid var(--color-border-subtle)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer link */}
          <div className="flex items-center gap-2 text-[#7a8075] group-hover:text-[#F5CB5C] transition-colors">
            <span style={{ fontFamily: "var(--font-mono-custom)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {project.url ? "View Live" : "View Project"}
            </span>
            {project.url
              ? <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              : <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            }
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="relative z-10 py-32 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="section-number">02 / Projects</span>
          <div className="flex-1 h-px bg-[rgba(207,219,213,0.08)] max-w-24" />
        </div>
        <h2 className="text-section">Projects</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {PROJECTS.map((project) => (
          <TiltCard key={project.name} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
