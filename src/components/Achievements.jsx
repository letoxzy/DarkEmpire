import { Reveal } from "./Reveal";
import "../styles/Sections.css";

const ACHIEVEMENTS = [
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

export default function Achievements() {
  return (
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
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.num} delay={`de-d${i + 1}`}>
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
  );
}
