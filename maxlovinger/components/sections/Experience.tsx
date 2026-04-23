"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const TIMELINE = [
  {
    company: "Capital One",
    role: "Software Engineering Intern",
    period: "June 2026 to August 2026",
    location: "McLean, VA",
    description:
      "Incoming intern working on active engineering projects in machine learning, software engineering, and data analysis using Java, Python, AWS, and more to enhance company services.",
    highlights: ["Java", "Python", "AWS", "ML Engineering"],
    type: "work",
  },
  {
    company: "University of Pennsylvania",
    role: "MEng, Data Science",
    period: "August 2025 to Present",
    location: "Philadelphia, PA",
    description:
      "4+1 dual-enrollment program. Relevant coursework: Database and Information Systems, Applied Machine Learning.",
    highlights: ["Applied ML", "Database Systems", "Data Science"],
    type: "education",
  },
  {
    company: "FINRA",
    role: "Technology Intern",
    period: "June 2025 to August 2025",
    location: "Rockville, MD",
    description:
      "Spearheaded migration of trillions of financial records from Parquet to Amazon S3 Apache Iceberg tables, achieving a ~600% improvement in query time. Developed automated EMR orchestration drivers in IntelliJ with extensive Spark/SQL benchmarks. Won company-wide hackathon with an Amazon Bedrock investor education platform, later deployed company-wide.",
    highlights: ["Apache Iceberg", "AWS EMR", "Spark", "Bedrock", "Hackathon Win"],
    type: "work",
  },
  {
    company: "TAMID, Haverford Chapter",
    role: "Co-Founder & President",
    period: "August 2023 to April 2026",
    location: "Haverford, PA",
    description:
      "Co-founded the Haverford chapter of this international technology/business consulting org. Led a consulting team through a 12-week data-driven market analysis for Tutterra (EdTech startup): competitor benchmarking, SWOT, customer persona modeling, and perceptual mapping. Presented findings to TAMID's international leadership group.",
    highlights: ["Leadership", "Consulting", "Market Analysis", "EdTech"],
    type: "leadership",
  },
  {
    company: "Athletes Untapped",
    role: "Technology & Growth Strategy Manager",
    period: "May 2024 to August 2024",
    location: "Philadelphia, PA",
    description:
      "Developed startup growth strategies with the CEO. Built automation tools including a CSV parser for email outreach, an Instagram bot messaging 100-200 recipients daily, a blog drafter, and a coach identifier, boosting outreach and recruiting by over 100%.",
    highlights: ["Python Automation", "Growth Strategy", "Startup", "100%+ Growth"],
    type: "work",
  },
  {
    company: "Web3Names.AI",
    role: "Data Scientist Intern",
    period: "August 2024 to October 2024",
    location: "Haverford, PA",
    description:
      "Engineered Python web crawlers to extract and compile data from digital accounts for analysis and outreach. Researched the transition to Web3 technologies and decentralized domain names, providing insights on secure digital identity ownership.",
    highlights: ["Python", "Web Scraping", "Web3", "Data Analysis"],
    type: "work",
  },
  {
    company: "Haverford College",
    role: "BS Computer Science (AI) + Applied Mathematics",
    period: "August 2023 to Present",
    location: "Haverford, PA",
    description:
      "Dual degree with AI concentration in CS. GPA 3.65/4.0. Haverford Varsity Soccer (Center Midfielder / Winger / Fullback, 25-30 hrs/week in season). Member of Havercode, TAMID, Haverford Quantum Computing Club, and Investing & Trading Club.",
    highlights: ["GPA 3.65", "AI Concentration", "Varsity Soccer", "Dual Degree"],
    type: "education",
  },
];

const TYPE_COLORS: Record<string, string> = {
  work: "#F5CB5C",
  education: "#CFDBD5",
  leadership: "#a89060",
};
const TYPE_LABEL: Record<string, string> = {
  work: "Industry",
  education: "Education",
  leadership: "Leadership",
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative z-10 py-32 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="section-number">04 / Timeline</span>
          <div className="flex-1 h-px bg-[rgba(207,219,213,0.08)] max-w-24" />
        </div>
        <h2 className="text-section">Timeline</h2>
      </motion.div>

      <div className="relative max-w-3xl">
        {/* Animated timeline line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "var(--color-border-accent)" }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-0"
        >
          {TIMELINE.map((item, i) => (
            <motion.div key={i} variants={staggerItem} className="relative pl-10 pb-10 group">
              {/* Dot */}
              <motion.div
                className="absolute left-[-5px] top-[6px] w-2.5 h-2.5 rounded-full border-2"
                style={{ borderColor: TYPE_COLORS[item.type], background: "var(--color-bg-base)" }}
                whileInView={{ scale: [0, 1.4, 1] }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              />

              {/* Card */}
              <motion.div
                className="p-5 relative overflow-hidden"
                style={{
                  background: "var(--color-bg-surface)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "2px",
                  borderLeft: `2px solid ${TYPE_COLORS[item.type]}`,
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-card-title text-[17px]">{item.company}</h3>
                      <span
                        className="text-mono-custom text-[9px] uppercase tracking-wider px-1.5 py-0.5"
                        style={{ background: "var(--color-bg-hover)", color: TYPE_COLORS[item.type], border: `1px solid ${TYPE_COLORS[item.type]}30` }}
                      >
                        {TYPE_LABEL[item.type]}
                      </span>
                    </div>
                    <p className="text-[#E8EDDF] text-[13px]" style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}>
                      {item.role}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-mono-custom text-[#F5CB5C] text-[11px] block">{item.period}</span>
                    <span className="text-mono-custom text-[#7a8075] text-[10px] block mt-0.5">{item.location}</span>
                  </div>
                </div>

                <p className="text-body text-[13px] mb-4 leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-mono-custom text-[10px] uppercase tracking-wider px-2 py-0.5"
                      style={{
                        background: "var(--color-bg-hover)",
                        border: "1px solid var(--color-border-subtle)",
                        color: TYPE_COLORS[item.type],
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute left-[-4px] bottom-0 w-2 h-2 rounded-full" style={{ background: "var(--color-accent)" }} />
      </div>
    </section>
  );
}
