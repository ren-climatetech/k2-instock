import React from "react";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import "../../pages/WarehouseItemPage/WarehouseItemPage.scss"

function WarehouseItemPage() {
  return (
    <div className="layout warehouse-item__container">
      <WarehouseDetails />
    </div>
  );
}

export default WarehouseItemPage;
