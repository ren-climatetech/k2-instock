import { Link } from "react-router-dom";
import "./Header.scss";
import inStockLogo from "../../assets/logo/InStock-Logo.svg";

function Header({ currPage }) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={inStockLogo} alt="In stock Logo" />
      </Link>

      <div className="nav">
        <Link to="/warehouses" className="nav__warehouses">
          Warehouses
        </Link>
        <Link to="/inventory" className="nav__inventory">
          Inventory
        </Link>
      </div>
    </header>
  );
}

export default Header;
