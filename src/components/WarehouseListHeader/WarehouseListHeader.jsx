import "./WarehouseListHeader.scss";
import sortIcon from "../../assets/icons/sort-icon-default.svg";

const WarehouseListHeader = () => {
  return (
    <div className="warehouses-header">

      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">
          Warehouse
          <img src={sortIcon} alt="sort icon" />
        </p>
      </div>
      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">Address</p>
        <img src={sortIcon} alt="sort icon" />
      </div>
      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">Contact name</p>

        <img src={sortIcon} alt="sort icon" />
      </div>
      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">contact information</p>
        <img src={sortIcon} alt="sort icon" />
      </div>

      <div>
        <p>actions</p>
      </div>
    </div>
  );
};

export default WarehouseListHeader;
