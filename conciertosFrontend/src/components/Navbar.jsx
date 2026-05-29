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
              <Link to="/conciertos">Todos los Conciertos</Link>
            </li>
          )}
          {(rol === "ADMIN" || rol === "PROMOTOR") && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/tablaConciertosPasados")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/tablaConciertosPasados">Conciertos pasados</Link>
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
                location.pathname.startsWith("/historialEntradas")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/historialEntradas">Entradas compradas</Link>
            </li>
          )}
          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/tablaBilletes")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/tablaBilletes">Billetes comprados</Link>
            </li>
          )}
          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/comprarBillete")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/comprarBillete">Comprar billetes</Link>
            </li>
          )}
          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/conciertosFuturos")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/conciertosFuturos">Conciertos con entrada</Link>
            </li>
          )}
          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/historialProductos")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/historialProductos">Productos comprados</Link>
            </li>
          )}
          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/conciertosPasadosCliente")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/conciertosPasadosCliente">Conciertos pasados</Link>
            </li>
          )}
          {rol === "CLIENTE" && (
            <li
              className={`nav-item ${
                location.pathname.startsWith("/valoracionesUsuario")
                  ? "nav-item-active"
                  : ""
              }`}
            >
              <Link to="/valoracionesUsuario">Valoraciones realizadas</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
