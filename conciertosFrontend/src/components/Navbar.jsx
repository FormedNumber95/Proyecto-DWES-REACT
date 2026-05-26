import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const rol = localStorage.getItem("rol");

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-menu">
          
          {(rol === "ADMIN" || rol === "PROMOTOR") && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/conciertos")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/conciertos">Conciertos</Link>
            </li>
          )}

          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/conciertosCliente")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/conciertosCliente">Conciertos</Link>
            </li>
          )}

          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/historial")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/historial">Historial de Compras</Link>
            </li>
          )}          
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;