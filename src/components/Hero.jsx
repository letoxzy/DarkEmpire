import "../styles/Hero.css";

const WHATSAPP_LINK = "https://chat.whatsapp.com/ILrD9Lkbajv809fVfwj5lD";

const STATS = [
  ["7+", "Warriors"],
  ["2.8", "Avg K/D"],
  ["TOP 0.1%", "Ranked"],
  ["50+", "Wars Won"],
];

export default function Hero({ smoothScroll }) {
  return (
    <section className="de-hero" id="home">
      <div className="de-hero-bg" />

      <div className="de-hero-skull">
        <img src="/assets/logo.png" alt="DarkEmpire Logo" />
      </div>
      <p className="de-hero-eyebrow">Call of Duty Mobile · Elite Clan</p>

      <h1 className="de-hero-title">
        <span>Dark </span>Empire
      </h1>

      <p className="de-hero-sub">We Don't Play. We Dominate.</p>

      <p className="de-hero-desc">
        A brotherhood of elite warriors forged in fire. DarkEmpire isn't just a
        clan — it's a legacy. Are you worthy?
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
        {STATS.map(([num, label]) => (
          <div className="de-stat-item" key={label}>
            <span className="de-stat-num">{num}</span>
            <span className="de-stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
