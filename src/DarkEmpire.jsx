import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/ILrD9Lkbajv809fVfwj5lD";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`de-reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}

function RevealRight({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`de-reveal-right ${className}`}>
      {children}
    </div>
  );
}

const members = [
  { icon: "👑", name: "ÐX¹_BlackOmega", rank: "Clan Leader", kd: "4.2" },
  { icon: "⚔️", name: "ÐX¹_Letoxzy", rank: "Co-Leader", kd: "3.8" },
  { icon: "🔥", name: "ÐX¹_Loki", rank: "Elite Member", kd: "3.1" },
  { icon: "💀", name: "ÐX¹_Asiko", rank: "Member", kd: "2.9" },
  { icon: "🎯", name: "ÐX¹_CHIEF", rank: "Member", kd: "2.6" },
  { icon: "🛡️", name: "ÐX¹_THE_DUKE", rank: "Member", kd: "2.4" },
  { icon: "🛡️", name: "ÐX¹_Palmer", rank: "Member", kd: "2.4" },
  { icon: "🛡️", name: "ÐX¹_Lynx", rank: "Member", kd: "2.4" },
];

const achievements = [
  {
    num: "01",
    icon: "🏆",
    title: "Clan War Champions",
    desc: "Finished top 3 across multiple clan war seasons. We fight every war to win.",
  },
  {
    num: "02",
    icon: "💥",
    title: "100+ Wars Won",
    desc: "A century of clan war victories — each earned through strategy and firepower.",
  },
  {
    num: "03",
    icon: "🎖️",
    title: "Ranked Elite Tier",
    desc: "Members consistently push Legendary and Grandmaster ranks every season.",
  },
  {
    num: "04",
    icon: "🔫",
    title: "2.8 Average K/D",
    desc: "No passengers here. Every member carries their weight and then some.",
  },
];

const gallery = [
  { icon: "🏆", label: "Clan War Victory" },
  { icon: "🎯", label: "Top Score Gameplay" },
  { icon: "💀", label: "Ranked Highlights" },
  { icon: "🔥", label: "Kill Streak" },
  { icon: "🛡️", label: "Clan Lineup" },
];

const delays = ["de-d1", "de-d2", "de-d3", "de-d4", "de-d5"];

export default function DarkEmpire() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "members",
      "achievements",
      "gallery",
      "join",
    ];
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setShowTop(y > 400);
      const navH = 60;
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= navH + 80) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smoothScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = 60;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navH;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div>
      {/* NAV */}
      <nav className={`de-nav${scrolled ? " scrolled" : ""}`}>
        <button
          className="de-nav-logo"
          onClick={() => smoothScroll("home")}
          style={{
            fontFamily: "'Black Ops One',cursive",
            color: "var(--blood-bright)",
            fontSize: "1.3rem",
            letterSpacing: "2px",
            textShadow: "0 0 20px rgba(204,0,0,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ⚔ DΛRKΞMPIRΞ
        </button>
        <ul className="de-nav-links">
          {["about", "members", "achievements", "gallery", "join"].map((s) => (
            <li key={s}>
              <a
                className={activeSection === s ? "active" : ""}
                onClick={() => smoothScroll(s)}
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

      {/* MOBILE MENU */}
      <div className={`de-mobile-menu${menuOpen ? " open" : ""}`}>
        {["about", "members", "achievements", "gallery", "join"].map((s) => (
          <a key={s} onClick={() => smoothScroll(s)}>
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

      {/* HERO */}
      <section className="de-hero" id="home">
        <div className="de-hero-bg" />
        <div className="de-hero-skull">💀</div>
        <p className="de-hero-eyebrow">Call of Duty Mobile · Elite Clan</p>
        <h1 className="de-hero-title">
          <span>Dark</span>Empire
        </h1>
        <p className="de-hero-sub">We Don't Play. We Dominate.</p>
        <p className="de-hero-desc">
          A brotherhood of elite warriors forged in fire. DarkEmpire isn't just
          a clan — it's a legacy. Are you worthy?
        </p>
        <div className="de-hero-btns">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="de-btn-primary"
          >
            🩸 Join The Empire
          </a>
          <button
            className="de-btn-secondary"
            onClick={() => smoothScroll("about")}
          >
            Learn More
          </button>
        </div>
        <div className="de-hero-stats">
          {[
            ["7+", "Warriors"],
            ["2.8", "Avg K/D"],
            ["TOP 0.1%", "Ranked"],
            ["20+", "Wars Won"],
          ].map(([n, l]) => (
            <div className="de-stat-item" key={l}>
              <span className="de-stat-num">{n}</span>
              <span className="de-stat-label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="de-section de-section-about" id="about">
        <div className="de-section-inner">
          <div className="de-about-grid">
            <div className="de-about-text">
              <Reveal>
                <span className="de-section-tag">// Our Story</span>
              </Reveal>
              <Reveal delay="de-d1">
                <h2 className="de-section-title">
                  Born from <span>Darkness</span>
                </h2>
              </Reveal>
              <Reveal delay="de-d2">
                <div className="de-divider" />
              </Reveal>
              <Reveal delay="de-d2">
                <p>
                  DarkEmpire was built by players who refused to be average. We
                  grind harder, strategize smarter, and fight with no mercy.
                  Every match is a war — and we come to win.
                </p>
              </Reveal>
              <Reveal delay="de-d3">
                <p>
                  We are a <strong>Call of Duty Mobile</strong> clan built on{" "}
                  <strong>discipline, teamwork, and skill</strong>. No randoms.
                  No excuses. Only warriors who are hungry for victory.
                </p>
              </Reveal>
              <Reveal delay="de-d4">
                <p>
                  Whether it's ranked matches, clan wars, or tournaments —
                  DarkEmpire shows up and shuts opponents down.
                </p>
              </Reveal>
              <div className="de-about-values">
                {[
                  ["🎯", "Precision over chaos"],
                  ["🛡️", "Brotherhood over everything"],
                  ["🔥", "Relentless grind mentality"],
                ].map(([icon, label], i) => (
                  <Reveal key={label} delay={delays[i + 2]}>
                    <div className="de-value-item">
                      {icon} <span className="de-value-label">{label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <RevealRight>
              <div className="de-about-emblem">
                <div className="de-emblem-ring">
                  <div className="de-emblem-inner">
                    <div className="de-emblem-icon">💀</div>
                    <div className="de-emblem-text">
                      DARK EMPIRE
                      <br />
                      CODM
                    </div>
                  </div>
                </div>
              </div>
            </RevealRight>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="de-section de-section-members" id="members">
        <div className="de-section-inner">
          <Reveal>
            <span className="de-section-tag">// The Warriors</span>
          </Reveal>
          <Reveal delay="de-d1">
            <h2 className="de-section-title">
              Our <span>Elite</span> Roster
            </h2>
          </Reveal>
          <Reveal delay="de-d2">
            <div className="de-divider" />
          </Reveal>
          <div className="de-members-grid">
            {members.map((m, i) => (
              <Reveal key={m.name} delay={delays[i] || "de-d5"}>
                <div className="de-member-card">
                  <div className="de-member-avatar">{m.icon}</div>
                  <div className="de-member-name">{m.name}</div>
                  <div className="de-member-rank">{m.rank}</div>
                  <div className="de-member-kd">
                    K/D: <span>{m.kd}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p
              style={{
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "0.85rem",
                marginTop: "1.25rem",
                letterSpacing: "2px",
              }}
            >
              + 0 MORE WARRIORS IN THE EMPIRE. WE ARE IN NEED OF ACTIVE PLAYERS
            </p>
          </Reveal>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="de-section de-section-achievements" id="achievements">
        <div className="de-section-inner">
          <Reveal>
            <span className="de-section-tag">// Battle Records</span>
          </Reveal>
          <Reveal delay="de-d1">
            <h2 className="de-section-title">
              Our <span>Achievements</span>
            </h2>
          </Reveal>
          <Reveal delay="de-d2">
            <div className="de-divider" />
          </Reveal>
          <div className="de-ach-grid">
            {achievements.map((a, i) => (
              <Reveal key={a.num} delay={delays[i]}>
                <div className="de-ach-card">
                  <div className="de-ach-num">{a.num}</div>
                  <div className="de-ach-icon">{a.icon}</div>
                  <div className="de-ach-title">{a.title}</div>
                  <div className="de-ach-desc">{a.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="de-section de-section-gallery" id="gallery">
        <div className="de-section-inner">
          <Reveal>
            <span className="de-section-tag">// Battle Moments</span>
          </Reveal>
          <Reveal delay="de-d1">
            <h2 className="de-section-title">
              War <span>Gallery</span>
            </h2>
          </Reveal>
          <Reveal delay="de-d2">
            <div className="de-divider" />
          </Reveal>
          <div className="de-gallery-grid">
            {gallery.map((g, i) => (
              <Reveal key={g.label} delay={delays[Math.min(i, 4)]}>
                <div className="de-gallery-item">
                  <div className="de-gallery-placeholder">
                    <span>{g.icon}</span>
                    <p>{g.label}</p>
                  </div>
                  <div className="de-gallery-overlay" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p
              style={{
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "0.8rem",
                marginTop: "1.25rem",
                letterSpacing: "2px",
              }}
            >
              📸 Replace placeholders with your real screenshots
            </p>
          </Reveal>
        </div>
      </section>

      {/* JOIN */}
      <section className="de-section de-section-join" id="join">
        <div className="de-join-inner">
          <Reveal>
            <div className="de-join-skull">💀</div>
          </Reveal>
          <Reveal delay="de-d1">
            <span className="de-section-tag">// Recruitment Open</span>
          </Reveal>
          <Reveal delay="de-d2">
            <h2 className="de-section-title">
              Join the <span>Empire</span>
            </h2>
          </Reveal>
          <Reveal delay="de-d3">
            <div className="de-divider" style={{ margin: "0 auto 1.5rem" }} />
          </Reveal>
          <Reveal delay="de-d3">
            <p className="de-join-desc">
              We are recruiting elite players ready to dominate. If you have the
              skill and the hunger, DarkEmpire has a place for you. Request to
              join on WhatsApp — our officers will review your profile.
            </p>
          </Reveal>
          <Reveal delay="de-d4">
            <div className="de-join-reqs">
              {[
                ["K/D", "1.5+"],
                ["Rank", "Legendary"],
                ["Active", "Daily"],
                ["Age", "16+"],
                ["Clan Wars", "Required"],
              ].map(([k, v]) => (
                <div className="de-req-badge" key={k}>
                  {k} <strong>{v}</strong>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay="de-d5">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="de-btn-whatsapp"
            >
              <span>💬</span> Request to Join on WhatsApp
            </a>
            <p className="de-join-note">
              Our officers respond within 24 hours · All skill levels reviewed
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="de-footer">
        <div className="de-footer-logo">💀 DarkEmpire</div>
        <p className="de-footer-tagline">
          Call of Duty Mobile · We Don't Play. We Dominate.
        </p>
      </footer>

      {/* SCROLL TO TOP */}
      <button
        className={`de-scroll-top${showTop ? " visible" : ""}`}
        onClick={() => smoothScroll("home")}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
