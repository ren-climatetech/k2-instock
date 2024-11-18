import "./EditInventoryItemPage.scss";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import React, { useState, useEffect } from "react";

function EditInventoryItemPage() {
  //   const [categories, setCategories] = useState([]);
  //   const [warehouses, setWarehouses] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState("");
  //   const [stockStatus, setStockStatus] = useState("");
  //   const [selectedWarehouse, setSelectedWarehouse] = useState("");

  //   console.log("testing");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const inventoryResponse = await fetch("/api/inventories");
  //         const inventoryData = await inventoryResponse.json();

  //         console.log("inventoryData");
  //         setCategories(inventoryData);

  //         const warehouseResponse = await fetch("/api/warehouses");
  //         const warehouseData = await warehouseResponse.json();
  //         setWarehouses(warehouseData);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   const handleCategoryChange = (event) => {
  //     setSelectedCategory(event.target.value);
  //   };

  //   const handleStockChange = (event) => {
  //     setStockStatus(event.target.value);
  //   };

  //   const handleWarehouseChange = (event) => {
  //     const warehouseId = event.target.value;
  //     setSelectedWarehouse(warehouseId);
  //   };

  return (
    <>
      <form>
        <div>
          <img
            src={chevronIcon}
            alt="arrow icon"
            className="editinventory_icon-chevron"
          />
          <h1>Edit Inventory Item</h1>
        </div>

        <h2>Item Details</h2>

        <h3>Item Name</h3>
        <input type="text"></input>
        <h3>Description</h3>
        <textarea name="comments"> </textarea>
        <h3>Category</h3>
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <h2>Item Availability</h2>
        <h3>Status</h3>
        <input
          type="radio"
          id="status-instock"
          name="stockStatus"
          value="In Stock"
        ></input>
        <label for="status-instock">In Stock</label>
        <input
          type="radio"
          id="status-outofstock"
          name="stockStatus"
          value="Out of Stock"
        ></input>
        <label for="status-outofstock">Out of Stock</label>
        <h3>Warehouse</h3>
        <select
          name="warehouse"
          id="warehouse"
          value={selectedCategory}
          onChange={handleWarehouseChange}
        >
          {warehouses.map((warehouse) => (
            <option key={warehouse.warehouse} value={warehouse.warehouse}>
              {warehouse.warehouse}
            </option>
          ))}
        </select>
        {/* <div className="buttons-container">
          <CancelButton onClick={closeModal} />
          <DeleteItemButton onClick={deleteItem} />
        </div> */}
        {/* <div className="buttons-container">
          <CancelButton onClick={closeModal} />
          <SaveItemButton onClick={saveItem} />
        </div> */}
      </form>
    </>
  );
}

export default EditInventoryItemPage;
