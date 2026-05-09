import { Reveal, RevealRight } from "./Reveal";
import "../styles/Sections.css";

const VALUES = [
  ["🎯", "Precision over chaos"],
  ["🛡️", "Brotherhood over everything"],
  ["🔥", "Relentless grind mentality"],
];

export default function About() {
  return (
    <section className="de-section de-section-about" id="about">
      <div className="de-section-inner">
        <div className="de-about-grid">
          {/* Text */}
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
                grind harder, strategize smarter, and fight with no mercy. Every
                match is a war — and we come to win.
              </p>
            </Reveal>
            <Reveal delay="de-d3">
              <p>
                We are a <strong>Call of Duty Mobile</strong> clan built on{" "}
                <strong>discipline, teamwork, and skill</strong>. No randoms. No
                excuses. Only warriors who are hungry for victory.
              </p>
            </Reveal>
            <Reveal delay="de-d4">
              <p>
                Whether it's ranked matches, clan wars, or tournaments —
                DarkEmpire shows up and shuts opponents down.
              </p>
            </Reveal>

            <div className="de-about-values">
              {VALUES.map(([icon, label], i) => (
                <Reveal key={label} delay={`de-d${i + 2}`}>
                  <div className="de-value-item">
                    {icon} <span className="de-value-label">{label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Spinning emblem */}
          <RevealRight>
            <div className="de-about-emblem">
              <div className="de-emblem-ring">
                <div className="de-emblem-inner">
                  <img
                    src="/src/assets/logo.png"
                    alt="DarkEmpire Logo"
                    className="de-emblem-img"
                  />
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
  );
}
