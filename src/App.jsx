import { useState, useEffect } from "react";

import "./styles/global.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Members from "./components/Members";
import Achievements from "./components/Achievements";
import Gallery from "./components/Gallery";
import Join from "./components/Join";
import Footer from "./components/Footer";

const SECTIONS = [
  "home",
  "about",
  "members",
  "achievements",
  "gallery",
  "join",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showTop, setShowTop] = useState(false);

  /* Track scroll position → update active nav link + scroll-to-top btn */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const navH = 60;

      setShowTop(y > 400);

      let current = "home";
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= navH + 80) current = id;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Smooth scroll helper — offset for fixed navbar */
  const smoothScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = 60;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navH;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <Navbar smoothScroll={smoothScroll} activeSection={activeSection} />

      <Hero smoothScroll={smoothScroll} />
      <About />
      <Members />
      <Achievements />
      <Gallery />
      <Join />
      <Footer />

      {/* Scroll-to-top button */}
      <button
        className={`de-scroll-top${showTop ? " visible" : ""}`}
        onClick={() => smoothScroll("home")}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
