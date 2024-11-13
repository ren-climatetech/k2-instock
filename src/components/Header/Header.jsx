import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import inStockLogo from "../../assets/logo/InStock-Logo.svg";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={inStockLogo} alt="Instock Logo" />
      </Link>
      <div className="header-container">
        <NavLink
          to="/warehouses"
          className={({ isActive }) =>
            isActive
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
      </div>
    </header>
  );
}

export default Header;
