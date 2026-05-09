import "../styles/Sections.css";
import logo from "/src/assets/logo.png";

export default function Footer() {
  return (
    <footer className="de-footer">
      <div className="de-footer-logo">
        <img src={logo} alt="logo" className="de-footer-logo-img" />
        DarkEmpire
      </div>
      <p className="de-footer-tagline">
        Call of Duty Mobile · We Don't Play. We Dominate.
      </p>
    </footer>
  );
}
