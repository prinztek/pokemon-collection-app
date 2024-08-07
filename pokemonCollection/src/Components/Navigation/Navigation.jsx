import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" className="logo">
        Pokemon Collect
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/pokemon-game">Play a Game</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
