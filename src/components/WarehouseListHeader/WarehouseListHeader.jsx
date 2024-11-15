import "./WarehouseListHeader.scss";

const WarehouseListHeader = () => {
  return (
    <div className="warehouses-header">
      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">Warehouse</p>
      </div>
      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">Address</p>
      </div>
      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">Contact name</p>
      </div>
      <div className="warehouses-header__name-container">
        <p className="warehouses-header__name">contact information</p>
      </div>
      <div>
        <p>actions</p>
      </div>
    </div>
  );
};

export default WarehouseListHeader;
