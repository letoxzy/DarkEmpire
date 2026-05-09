import { useState, useEffect } from "react";
import "../styles/Navbar.css";

const WHATSAPP_LINK = "https://chat.whatsapp.com/ILrD9Lkbajv809fVfwj5lD";
const NAV_SECTIONS = ["about", "members", "achievements", "gallery", "join"];

export default function Navbar({ smoothScroll, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    smoothScroll(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`de-nav${scrolled ? " scrolled" : ""}`}>
        <button className="de-nav-logo" onClick={() => handleNav("home")}>
          ⚔ DΛRK・ΞMPIRΞ
        </button>

        <ul className="de-nav-links">
          {NAV_SECTIONS.map((s) => (
            <li key={s}>
              <a
                className={activeSection === s ? "active" : ""}
                onClick={() => handleNav(s)}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="de-nav-cta"
        >
          Join Now
        </a>

        <button
          className={`de-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`de-mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_SECTIONS.map((s) => (
          <a key={s} onClick={() => handleNav(s)}>
            {s}
          </a>
        ))}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="de-mob-join"
        >
          💬 Join on WhatsApp
        </a>
      </div>
    </>
  );
}
