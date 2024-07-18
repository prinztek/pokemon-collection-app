import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
      <nav>
        <Link to="/" className="logo">Pokemon Collect</Link>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
  );
};

export default Navigation;
