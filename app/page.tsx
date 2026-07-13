import Background from "@/components/Background";
import CursorGlow from "@/components/CursorGlow";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import SocialDock from "@/components/SocialDock";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import Timeline from "@/components/sections/Timeline";
import Exploring from "@/components/sections/Exploring";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <SocialDock />

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-neon-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <TechStack />
        <Timeline />
        <Exploring />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
