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
          <Link
            to="/warehouses"
            className={
              location.pathname.includes("warehouse")
                ? "header-container__link header-container__link--active"
                : "header-container__link"
            }
          >
            Warehouses
          </Link>
          <Link
            to="/inventories"
            className={
              location.pathname.includes("inventories")
                ? "header-container__link header-container__link--active"
                : "header-container__link"
            }
          >
            Inventory
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Header;
