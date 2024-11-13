import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
import inStockLogo from "../../assets/logo/InStock-Logo.svg";
function Header() {
  // This gets the current url
  const location = useLocation();

  return (
    <header className="header section">
      <div className="layout header-container">
        <Link to="/">
          <img src={inStockLogo} alt="Instock Logo" />
        </Link>
        <nav className="header-nav-links">
          <NavLink
            to="/warehouses"
            className={({ isActive }) =>
              // Make the link active when either at the / path or /warehouses path
              isActive || location.pathname === "/"
                ? "header-container__link header-container__link--active"
                : "header-container__link"
            }
          >
            Warehouses
          </NavLink>
          <NavLink
            to="/inventories"
            className={({ isActive }) =>
              isActive
                ? "header-container__link header-container__link--active"
                : "header-container__link"
            }
          >
            Inventory
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
export default Header;
