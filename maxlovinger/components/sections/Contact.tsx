"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitFork, Link, Mail, ArrowUpRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const LINKS = [
  { icon: Mail, label: "Email", value: "mloving@seas.upenn.edu", href: "mailto:mloving@seas.upenn.edu" },
  { icon: GitFork, label: "GitHub", value: "github.com/maxlovinger", href: "https://github.com/maxlovinger" },
  { icon: Link, label: "LinkedIn", value: "linkedin.com/in/max-lovinger", href: "https://www.linkedin.com/in/max-lovinger/" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="relative z-10 py-32 px-8 md:px-16 lg:px-24 min-h-[50vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="section-number">05 / Contact</span>
          <div className="flex-1 h-px bg-[rgba(207,219,213,0.08)] max-w-24" />
        </div>
        <h2 className="text-section">Get in touch</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
      >
        {LINKS.map(({ icon: Icon, label, value, href }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            variants={staggerItem}
            className="group flex items-center gap-4 p-5 hover:border-[#F5CB5C] transition-all duration-300 relative overflow-hidden"
            style={{
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "2px",
            }}
            whileHover={{ x: 4 }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:bg-[#F5CB5C] group-hover:text-[#242423] transition-all duration-300"
              style={{ background: "var(--color-bg-hover)", border: "1px solid var(--color-border-subtle)" }}
            >
              <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-mono-custom text-[#7a8075] text-[10px] uppercase tracking-widest block mb-0.5">
                {label}
              </span>
              <span className="text-body text-[13px] text-[#E8EDDF] truncate block">
                {value}
              </span>
            </div>
            <ArrowUpRight
              size={14}
              className="text-[#7a8075] group-hover:text-[#F5CB5C] shrink-0 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="mt-24 pt-8 border-t border-[rgba(207,219,213,0.06)]"
      >
        <span className="text-mono-custom text-[#7a8075] text-[11px]">
          © 2026 Max Lovinger
        </span>
      </motion.div>
    </section>
  );
}
