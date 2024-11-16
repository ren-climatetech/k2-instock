import "./EditInventoryItemPage.scss";
import axios from "axios";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import React, { useState, useEffect } from "react";

function EditInventoryItemPage() {
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stockStatus, setStockStatus] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  console.log("testing");
  console.log("testing");

  useEffect(() => {
    console.log("test");
    const fetchData = async () => {
      selectedCategories;
      try {
        const inventoryResponse = await axios.get(
          "http://localhost:8080/api/inventories"
        );

        console.log(inventoryResponse.data);

        setCategories(inventoryResponse.data);

        // const warehouseResponse = await axios.get("/api/warehouses");
        // setWarehouses(warehouseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // if (categories.length < 1) {
  //   return <div>loading</div>;
  // }

  const handleCategoryChange = (event) => {
    // setSelectedCategory(event.target.value);
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const handleStockChange = (event) => {
    setStockStatus(event.target.value);
  };

  const handleWarehouseChange = (event) => {
    const warehouseId = event.target.value;
    setSelectedWarehouse(warehouseId);
  };

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
        {/* <textarea name="description" value="text-description">
          {" "}
        </textarea> */}
        <h3>Category</h3>
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {Array.from(
            new Set(categories.map((category) => category.category))
          ).map((uniqueCategory, index) => (
            <option key={index} value={uniqueCategory}>
              {uniqueCategory}
            </option>
          ))}
          {/* {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))} */}
        </select>
        <h2>Item Availability</h2>
        <h3>Status</h3>
        <input
          type="radio"
          id="status-instock"
          name="stockStatus"
          value="In Stock"
        ></input>
        <label htmlFor="status-instock">In Stock</label>
        <input
          type="radio"
          id="status-outofstock"
          name="stockStatus"
          value="Out of Stock"
        ></input>
        <label htmlFor="status-outofstock">Out of Stock</label>
        <h3>Warehouse</h3>
        <select
          name="warehouse"
          id="warehouse"
          value={selectedCategory}
          onChange={handleWarehouseChange}
        >
          {/* {warehouses.map((warehouse) => (
            <option key={warehouse.warehouse} value={warehouse.warehouse}>
              {warehouse.warehouse}
            </option>
          ))} */}
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
