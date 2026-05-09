import "../styles/Sections.css";

export default function Footer() {
  return (
    <footer className="de-footer">
      <div className="de-footer-logo">
        <img
          src="/src/assets/logo.png"
          alt="logo"
          className="de-footer-logo-img"
        />
        DarkEmpire
      </div>
      <p className="de-footer-tagline">
        Call of Duty Mobile · We Don't Play. We Dominate.
      </p>
    </footer>
  );
}
