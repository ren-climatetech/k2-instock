import "./InventorySingleWarehouseHeader.scss";
import sortIcon from "../../assets/icons/sort-icon-default.svg";

const InventorySingleWarehouseHeader = () => {
  return (
    <div className="inventories-header">
      <div className="inventories-header__name-container">
        <p className="inventories-header__name">
          Inventory Item
          <img src={sortIcon} alt="sort icon" />
        </p>
      </div>
      <div className="inventories-header__name-container">
        <p className="inventories-header__name">Category</p>
        <img src={sortIcon} alt="sort icon" />
      </div>
      <div className="inventories-header__name-container">
        <p className="inventories-header__name">Status</p>

        <img src={sortIcon} alt="sort icon" />
      </div>
      <div className="inventories-header__name-container">
        <p className="inventories-header__name">Quantity</p>
        <img src={sortIcon} alt="sort icon" />
      </div>

      <div>
        <p>actions</p>
      </div>
    </div>
  );
};

export default InventorySingleWarehouseHeader;
