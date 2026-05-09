import { Reveal } from "./Reveal";
import "../styles/Sections.css";
import logo from "/src/assets/logo.png";

const WHATSAPP_LINK = "https://chat.whatsapp.com/ILrD9Lkbajv809fVfwj5lD";

const REQUIREMENTS = [
  ["K/D", "1.5+"],
  ["Rank", "Legendary"],
  ["Active", "Daily"],
  ["Age", "16+"],
  ["Clan Wars", "Required"],
];

export default function Join() {
  return (
    <section className="de-section de-section-join" id="join">
      <div className="de-join-inner">
        <Reveal>
          <div className="de-join-skull">
            <img src={logo} alt="DarkEmpire Logo" />
          </div>
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
            {REQUIREMENTS.map(([key, val]) => (
              <div className="de-req-badge" key={key}>
                {key} <strong>{val}</strong>
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
  );
}
