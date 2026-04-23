"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, GitFork, Link, Mail } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-start z-10"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Name */}
          <motion.div variants={staggerItem}>
            <h1 className="text-display gradient-text leading-none">
              Max<br />Lovinger
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.p variants={staggerItem} className="text-body max-w-md">
            Dual-enrolled BS CS (AI) + Applied Math at Haverford · MEng Data Science at Penn.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={staggerItem} className="flex items-center gap-6 pt-2">
            <a
              href="#projects"
              className="glow-border inline-flex items-center gap-2 px-6 py-3 border border-[#F5CB5C] text-[#F5CB5C] text-sm font-medium tracking-wider uppercase hover:bg-[#F5CB5C] hover:text-[#242423] transition-all duration-300"
              style={{ fontFamily: "var(--font-mono-custom)" }}
            >
              View Work
              <ArrowDown size={14} />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/maxlovinger"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7a8075] hover:text-[#F5CB5C] transition-colors duration-200"
                title="GitHub"
              >
                <GitFork size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/max-lovinger/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7a8075] hover:text-[#F5CB5C] transition-colors duration-200"
                title="LinkedIn"
              >
                <Link size={18} />
              </a>
              <a
                href="mailto:mloving@seas.upenn.edu"
                className="text-[#7a8075] hover:text-[#F5CB5C] transition-colors duration-200"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-mono-custom text-[#7a8075] uppercase tracking-widest text-[10px]">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#F5CB5C] to-transparent"
        />
      </motion.div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(207,219,213,1) 1px, transparent 1px), linear-gradient(90deg, rgba(207,219,213,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </section>
  );
}
