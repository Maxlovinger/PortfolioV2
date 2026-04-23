import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import BackgroundWrapper from "@/components/three/BackgroundWrapper";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#242423]">
      {/* 3D canvas — fixed full-viewport layer */}
      <BackgroundWrapper />

      {/* Navigation */}
      <Nav />

      {/* Content layers */}
      <div className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
