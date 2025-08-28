// React Router Dom

import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// Styles

import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <h2>
        <Link to="/" className="logo">League Of Memories</Link>
      </h2>

     <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/add-memory"} className="nav-btn">Adicionar Memória</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
