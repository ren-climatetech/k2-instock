import React from "react";
import AddInventoryForm from "../../components/AddInventoryForm/AddInventoryForm";
import GoBackButton from "../../components/Buttons/GoBackButton/GoBackButton";
import "../AddInventoryPage/AddInventoryPage.scss"

function AddInventoryPage() {
  return (
    <section className="layout">
      <div className="add-inventory__wrapper">
        <div className="add-inventory__wrapper-header">
          <GoBackButton path="/inventories" />
          <h1 className="add-inventory_wrapper-header-title">
            Add New Inventory Item
          </h1>
        </div>
        <AddInventoryForm />
      </div>
    </section>
  );
}

export default AddInventoryPage;
