import React from "react";
import AddWarehouseForm from "../../components/AddWarehouseForm/AddWarehouseForm";
import GoBackButton from "../../components/Buttons/GoBackButton/GoBackButton";
import "../AddWarehousePage/AddWarehousePage.scss";

function AddWarehousePage() {
  return (
    <section className="layout">
      <div className="add-warehouse__wrapper">
        <div className="add-warehouse__wrapper-header">
          <GoBackButton/>
          <h1 className="add-warehouse_wrapper-header-title">Add New Warehouse</h1>
        </div>
        <AddWarehouseForm />
      </div>
    </section>
  );
}

export default AddWarehousePage;
