import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import MemberUpload from "./MemberUpload";
import "../styles/Sections.css";

const MEMBERS = [
  {
    image: "/assets/BlackOmega.jpg",
    name: "ÐX¹_BlackOmega",
    rank: "Clan Leader",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "XM4",
    bio: "The founder and leader of DarkEmpire. Feared on every battlefield.",
  },
  {
    image: "/assets/Letoxzy.png",
    name: "ÐX¹_Letoxzy",
    rank: "Co-Leader",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "BY15",
    bio: "Second in command. Tactical mastermind and clutch player.",
  },
  {
    image: "/assets/Loki.jpg",
    name: "ÐX¹_Loki",
    rank: "Elite Member",
    gameRank: "Legendary",
    playStyle: "BR Only",
    weapon: "AK117",
    bio: "Aggressive rusher with unmatched game sense.",
  },
  {
    image: "/assets/Asiko.jpg",
    name: "ÐX¹_Asiko",
    rank: "Member",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "KRM",
    bio: "Consistent performer and reliable squad player.",
  },
  {
    image: "/assets/CHIEF.jpg",
    name: "ÐX¹_CHIEF",
    rank: "Member",
    gameRank: "Grandmaster",
    playStyle: "BR Only",
    weapon: "Fennec",
    bio: "Sharp shooter. Never misses under pressure.",
  },
  {
    image: "/assets/THE_DUKE.jpg",
    name: "ÐX¹_THE_DUKE",
    rank: "Member",
    gameRank: "Pro",
    playStyle: "Hybrid Player",
    weapon: "Groza",
    bio: "The wall of DarkEmpire. Defensive anchor of the team.",
  },
  {
    image: "/assets/Palmer.jpg",
    name: "ÐX¹_Palmer",
    rank: "Member",
    gameRank: "Pro",
    playStyle: "Hybrid Player",
    weapon: "HVK-30",
    bio: "Versatile player who adapts to any game mode.",
  },
  {
    image: "/assets/Lynx.jpg",
    name: "ÐX¹_Lynx",
    rank: "Member",
    gameRank: "Master",
    playStyle: "Hybrid Player",
    weapon: "BY15",
    bio: "Stealthy and unpredictable. A nightmare in ranked.",
  },
];

const DELAYS = ["de-d1", "de-d2", "de-d3", "de-d4", "de-d5"];

const RANK_COLORS = {
  Legendary: "#FFD700",
  Grandmaster: "#CC0000",
  Master: "#a855f7",
  Pro: "#60a5fa",
  Platinum: "#34d399",
};

export default function Members() {
  const [selected, setSelected] = useState(null);
  const [images, setImages] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("de_member_images") || "{}");
    setImages(saved);
  }, []);

  const getImage = (member) => images[member.id] || member.image;

  const handleUpload = (memberId, url) => {
    setImages((prev) => ({ ...prev, [memberId]: url }));
    if (selected?.id === memberId) {
      setSelected((prev) => ({ ...prev, image: url }));
    }
  };

  return (
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
          {MEMBERS.map((m, i) => (
            <Reveal key={m.name} delay={DELAYS[i] ?? "de-d5"}>
              <div
                className="de-member-card"
                onClick={() => setSelected(m)}
                style={{ cursor: "pointer" }}
              >
                <div className="de-member-avatar">
                  <img src={getImage(m)} alt={m.name} />
                </div>
                <div className="de-member-name">{m.name}</div>
                <div className="de-member-rank">{m.rank}</div>
                <div className="de-member-kd">
                  🏆{" "}
                  <span
                    style={{ color: RANK_COLORS[m.gameRank] ?? "var(--gold)" }}
                  >
                    {m.gameRank}
                  </span>
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
            0 MORE WARRIORS IN THE EMPIRE. WE ARE IN NEED OF ACTIVE PLAYERS
          </p>
        </Reveal>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="de-modal-overlay" onClick={() => setSelected(null)}>
          <div className="de-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="de-modal-close"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            <div className="de-modal-avatar">
              <img src={getImage(selected)} alt={selected.name} />
            </div>

            {/* Upload button */}
            <MemberUpload
              memberName={selected.id}
              onUpload={(url) => handleUpload(selected.id, url)}
            />

            <div className="de-modal-badge">{selected.rank}</div>
            <h2 className="de-modal-name">{selected.name}</h2>
            <p className="de-modal-bio">{selected.bio}</p>

            <div className="de-modal-stats">
              <div className="de-modal-stat">
                <span
                  className="de-modal-stat-num"
                  style={{
                    color: RANK_COLORS[selected.gameRank] ?? "var(--gold)",
                  }}
                >
                  {selected.gameRank}
                </span>
                <span className="de-modal-stat-label">Game Rank</span>
              </div>

              <div className="de-modal-stat-divider" />

              <div className="de-modal-stat">
                <span
                  className="de-modal-stat-num"
                  style={{ fontSize: "1rem" }}
                >
                  {selected.playStyle}
                </span>
                <span className="de-modal-stat-label">Play Style</span>
              </div>

              <div className="de-modal-stat-divider" />

              <div className="de-modal-stat">
                <span
                  className="de-modal-stat-num"
                  style={{ fontSize: "1rem" }}
                >
                  {selected.weapon}
                </span>
                <span className="de-modal-stat-label">Best Weapon</span>
              </div>
            </div>

            <div className="de-modal-game">
              <span>🎮</span> Call of Duty Mobile
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
