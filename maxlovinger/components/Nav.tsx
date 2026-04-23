"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects", number: "02" },
  { label: "About", href: "#about", number: "03" },
  { label: "Experience", href: "#experience", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["projects", "about", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-6"
        style={{
          background: scrolled ? "rgba(36,36,35,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(207,219,213,0.06)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <span
              className="text-[#E8EDDF] tracking-widest group-hover:text-[#F5CB5C] transition-colors"
              style={{ fontFamily: "var(--font-display)", fontSize: "18px", letterSpacing: "0.08em" }}
            >
              ML
            </span>
            <div className="w-px h-4 bg-[rgba(207,219,213,0.2)] hidden sm:block" />
            <span className="text-mono-custom text-[#7a8075] text-[10px] uppercase tracking-widest hidden sm:block">
              Max Lovinger
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 group"
              >
                <span className="text-mono-custom text-[#F5CB5C] text-[9px]">{item.number}</span>
                <span
                  className={`text-[13px] tracking-wider uppercase transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? "text-[#F5CB5C]"
                      : "text-[#7a8075] group-hover:text-[#E8EDDF]"
                  }`}
                  style={{ fontFamily: "var(--font-mono-custom)", letterSpacing: "0.1em" }}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#7a8075] hover:text-[#F5CB5C] transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(36,36,35,0.97)", backdropFilter: "blur(20px)" }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-[#E8EDDF] hover:text-[#F5CB5C] transition-colors"
              >
                <span className="text-mono-custom text-[#F5CB5C] text-[11px]">{item.number}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "32px", fontStyle: "italic" }}>
                  {item.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
