import "../css/Header.css";
import logo from "../assets/user.svg";

export default function Header() {
  return (
    <div className="header-container">
      <section className="header-navbar">
        <img src={logo} className="logo" />
        <p>Calculator - Nuttasit New</p>
      </section>
    </div>
  );
}
