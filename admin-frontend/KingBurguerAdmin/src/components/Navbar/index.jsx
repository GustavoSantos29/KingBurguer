import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">
              <span className="icon">🏠</span>
              <span className="label">Lista de lanches</span>
            </Link>
          </li>
          <li>
            <Link to="/menu">
              <span className="icon">🍕</span>
              <span className="label">Cardápio</span>
            </Link>
          </li>
          <li>
            <Link to="/metrics">
              <span className="icon">📊</span>
              <span className="label">Métricas</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <span className="icon">📊</span>
              <span className="label">Login</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="overlay"></div>
    </>
  );
}
