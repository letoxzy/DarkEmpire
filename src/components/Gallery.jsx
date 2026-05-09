import { useState } from "react";
import { Reveal } from "./Reveal";
import "../styles/Sections.css";
import img1 from "/src/assets/Clanwaar.png";
import img2 from "/src/assets/TopScores.png";
import img3 from "/src/assets/RankedHighlights.png";
import img4 from "/src/assets/kill.png";
// import img5 from "/src/assets/gallery5.jpg";

const GALLERY = [
  { image: { img1 }, label: "Clan War Victory" },
  { image: { img2 }, label: "Top Score Gameplay" },
  { image: { img3 }, label: "Ranked Highlights" },
  { image: { img4 }, label: "Kill Streak" },
  { image: { img5 }, label: "Clan Lineup" },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
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
          {GALLERY.map((g, i) => (
            <Reveal key={g.label} delay={`de-d${Math.min(i + 1, 5)}`}>
              <div
                className="de-gallery-item"
                onClick={() => setSelected(g)}
                style={{ cursor: "pointer" }}
              >
                <img src={g.image} alt={g.label} className="de-gallery-img" />
                <div className="de-gallery-overlay">
                  <span className="de-gallery-zoom">🔍</span>
                  <p className="de-gallery-label">{g.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div className="de-lightbox-overlay" onClick={() => setSelected(null)}>
          <div className="de-lightbox" onClick={(e) => e.stopPropagation()}>
            <button
              className="de-lightbox-close"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img
              src={selected.image}
              alt={selected.label}
              className="de-lightbox-img"
            />
            <div className="de-lightbox-caption">{selected.label}</div>
          </div>
        </div>
      )}
    </section>
  );
}
