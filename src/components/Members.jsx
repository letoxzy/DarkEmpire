import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import MemberUpload from "./MemberUpload";
import "../styles/Sections.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const MEMBERS = [
  {
    id: "blackomega",
    image: "/assets/logo.png",
    name: "ÐX¹_BlackOmega",
    rank: "Clan Leader",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "XM4",
    bio: "The founder and leader of DarkEmpire. Feared on every battlefield.",
  },
  {
    id: "letoxzy",
    image: "/assets/logo.png",
    name: "ÐX¹_Letoxzy",
    rank: "Co-Leader",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "BY15",
    bio: "Second in command. Tactical mastermind and clutch player.",
  },
  {
    id: "loki",
    image: "/assets/logo.png",
    name: "ÐX¹_Loki",
    rank: "Elite Member",
    gameRank: "Legendary",
    playStyle: "BR Only",
    weapon: "AK117",
    bio: "Aggressive rusher with unmatched game sense.",
  },
  {
    id: "asiko",
    image: "/assets/logo.png",
    name: "ÐX¹_Asiko",
    rank: "Member",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "KRM",
    bio: "Consistent performer and reliable squad player.",
  },
  {
    id: "chief",
    image: "/assets/logo.png",
    name: "ÐX¹_CHIEF",
    rank: "Member",
    gameRank: "Grandmaster",
    playStyle: "BR Only",
    weapon: "Fennec",
    bio: "Sharp shooter. Never misses under pressure.",
  },
  {
    id: "theduke",
    image: "/assets/logo.png",
    name: "ÐX¹_THE_DUKE",
    rank: "Member",
    gameRank: "Pro",
    playStyle: "Hybrid Player",
    weapon: "Groza",
    bio: "The wall of DarkEmpire. Defensive anchor of the team.",
  },
  {
    id: "palmer",
    image: "/assets/logo.png",
    name: "ÐX¹_Palmer",
    rank: "Member",
    gameRank: "Pro",
    playStyle: "Hybrid Player",
    weapon: "HVK-30",
    bio: "Versatile player who adapts to any game mode.",
  },
  {
    id: "lynx",
    image: "/assets/logo.png",
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

const VISIBLE_COUNT = 8;

export default function Members() {
  const [selected, setSelected] = useState(null);
  const [images, setImages] = useState({});
  const [uploadEnabled, setUploadEnabled] = useState(true);
  const [extraMembers, setExtraMembers] = useState([]);
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "clan", "memberImages");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setImages(docSnap.data());

        const settingsSnap = await getDoc(doc(db, "clan", "settings"));
        if (settingsSnap.exists()) {
          setUploadEnabled(settingsSnap.data().uploadEnabled ?? true);
        }

        // Load extra members added from admin
        const membersSnap = await getDoc(doc(db, "clan", "memberList"));
        if (membersSnap.exists()) {
          const list = membersSnap.data().list ?? [];
          // Filter out members already in MEMBERS array
          const existingIds = MEMBERS.map((m) => m.id);
          const extras = list.filter((m) => !existingIds.includes(m.id));
          setExtraMembers(extras);
        }
      } catch (error) {
        console.error("Firestore fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const getImage = (member) =>
    images[member.id] || member.image || "/assets/logo.png";

  const handleUpload = async (memberId, url) => {
    setImages((prev) => ({ ...prev, [memberId]: url }));
    if (selected?.id === memberId) {
      setSelected((prev) => ({ ...prev, image: url }));
    }
    try {
      await setDoc(
        doc(db, "clan", "memberImages"),
        { [memberId]: url },
        { merge: true },
      );
    } catch (error) {
      console.error("Upload save error:", error);
    }
  };

  const allMembers = [...MEMBERS, ...extraMembers];
  const visibleMembers = allMembers.slice(0, VISIBLE_COUNT);
  const hiddenMembers = allMembers.slice(VISIBLE_COUNT);
  const hiddenCount = hiddenMembers.length;

  const MemberCard = ({ m, i }) => (
    <Reveal key={m.id} delay={DELAYS[i % 5]}>
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
          <span style={{ color: RANK_COLORS[m.gameRank] ?? "var(--gold)" }}>
            {m.gameRank}
          </span>
        </div>
      </div>
    </Reveal>
  );

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

        {/* Main visible members */}
        <div className="de-members-grid">
          {visibleMembers.map((m, i) => (
            <MemberCard key={m.id} m={m} i={i} />
          ))}
        </div>

        {/* Extra members — show/hide */}
        {hiddenCount > 0 && (
          <>
            {showExtra && (
              <div className="de-members-grid" style={{ marginTop: "1.25rem" }}>
                {hiddenMembers.map((m, i) => (
                  <MemberCard key={m.id} m={m} i={i} />
                ))}
              </div>
            )}

            {/* View more / hide button */}
            <Reveal>
              <div className="de-members-more">
                <button
                  className="de-members-more-btn"
                  onClick={() => setShowExtra((v) => !v)}
                >
                  {showExtra ? (
                    <>⬆ Hide Members</>
                  ) : (
                    <>
                      ⚔ View {hiddenCount} More Warrior
                      {hiddenCount > 1 ? "s" : ""} in the Empire
                    </>
                  )}
                </button>
                {!showExtra && (
                  <p className="de-members-more-sub">
                    WE ARE IN NEED OF ACTIVE PLAYERS 😁
                  </p>
                )}
              </div>
            </Reveal>
          </>
        )}

        {/* No extra members */}
        {hiddenCount === 0 && (
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
              WE ARE IN NEED OF ACTIVE PLAYERS —{" "}
              <a
                href="https://chat.whatsapp.com/ILrD9Lkbajv809fVfwj5lD"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--blood-bright)" }}
              >
                JOIN NOW
              </a>
            </p>
          </Reveal>
        )}
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

            {uploadEnabled && (
              <MemberUpload
                memberName={selected.id}
                onUpload={(url) => handleUpload(selected.id, url)}
              />
            )}

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
