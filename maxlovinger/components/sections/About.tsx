"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const SKILLS = {
  "Languages": ["Python", "Java", "C/C++", "Scala", "TypeScript", "JavaScript", "SQL", "MATLAB", "R", "Cypher"],
  "Frameworks": ["Flask", "Spark", "React", "Next.js", "Node.js", "PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "pgvector"],
  "Cloud & Tools": ["AWS (S3, EMR, Glue, Bedrock, EC2, RDS, DynamoDB)", "Vercel", "Cloudflare", "Docker", "Git", "Hugging Face", "Jupyter"],
  "Databases": ["PostgreSQL", "Apache Iceberg", "Supabase", "MySQL", "MongoDB", "Neo4J", "Pinecone", "DynamoDB", "Neon", "dbt"],
  "Quant": ["Algorithmic Trading", "Backtesting", "FVG/SMT Analysis", "Multi-Timeframe", "Options", "Risk Models", "IB API"],
};

const BENTO_ITEMS = [
  {
    title: "Dual Enrolled",
    content: "BS CS (AI Concentration) + Applied Math @ Haverford · MEng Data Science @ Penn (4+1)",
    accent: true,
    span: "md:col-span-2",
  },
  {
    title: "GPA",
    content: "3.65 / 4.0",
    accent: false,
    span: "",
  },
];

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      viewport={{ once: true }}
      className="text-mono-custom text-[#CFDBD5] text-[11px] px-3 py-1.5 uppercase tracking-wider gold-underline cursor-default hover:text-[#F5CB5C] transition-colors"
      style={{
        background: "var(--color-bg-hover)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "1px",
      }}
    >
      {skill}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative z-10 py-32 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="section-number">03 / About</span>
          <div className="flex-1 h-px bg-[rgba(207,219,213,0.08)] max-w-24" />
        </div>
        <h2 className="text-section">Me</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Bio + bento */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.div variants={staggerItem}>
            <span className="text-label block mb-4">a little about me</span>
            <p className="text-body leading-loose">
              Dual-enrolled in Haverford College&apos;s 4+1 program, completing a BS in Computer Science
              (AI concentration) and Applied Mathematics at Haverford while pursuing an MEng in Data Science
              at Penn Engineering. GPA 3.65.
            </p>
          </motion.div>

          {/* Bento grid */}
          <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BENTO_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className={`p-4 relative overflow-hidden ${item.span}`}
                style={{
                  background: item.accent ? "var(--color-accent-dim)" : "var(--color-bg-surface)",
                  border: `1px solid ${item.accent ? "var(--color-border-accent)" : "var(--color-border-subtle)"}`,
                  borderRadius: "2px",
                }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-mono-custom text-[#7a8075] text-[10px] uppercase tracking-widest block mb-2">
                  {item.title}
                </span>
                <p
                  className="text-body text-[13px]"
                  style={{ color: item.accent ? "var(--color-text-primary)" : "var(--color-text-muted)" }}
                >
                  {item.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Skill matrix */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-8"
        >
          <div>
            <span className="text-label block mb-6">skill matrix</span>
            <div className="space-y-6">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category}>
                  <span className="text-mono-custom text-[#F5CB5C] text-[11px] uppercase tracking-[0.15em] block mb-3">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <SkillTag key={skill} skill={skill} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coursework */}
          <div
            className="p-6"
            style={{
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "2px",
            }}
          >
            <span className="text-label block mb-4">relevant coursework</span>
            <div className="flex flex-wrap gap-2">
              {[
                "Analysis I", "Data Science", "Scientific Computing", "Analysis of Algorithms",
                "Principles of Computing Systems", "Differential Equations", "Discrete Math",
                "Data Structures", "Linear Algebra", "Probability & Statistics",
                "Time Series / Agent-Based Models", "Applied ML", "DB & Information Systems",
              ].map((c) => (
                <span
                  key={c}
                  className="text-mono-custom text-[#7a8075] text-[10px] px-2 py-0.5 uppercase tracking-wide"
                  style={{ background: "var(--color-bg-hover)", border: "1px solid var(--color-border-subtle)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
