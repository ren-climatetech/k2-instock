import "./EditInventoryItemPage.scss";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton/SaveButton";
import axios from "axios";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function EditInventoryItemPage() {
  const { itemId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
    warehouse_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryResponse = await axios.get(
          `http://localhost:8080/api/inventories/${itemId}`
        );

        const itemData = inventoryResponse.data;
        setForm({
          item_name: itemData.item_name,
          description: itemData.description,
          category: itemData.category,
          status: itemData.status,
          quantity: itemData.quantity,
          warehouse_id: itemData.warehouse_id,
        });
        setSelectedCategory(itemData.category);
        setSelectedWarehouse(itemData.warehouse_name);
        setStockStatus(itemData.status);

        const allInventoriesResponse = await axios.get(
          "http://localhost:8080/api/inventories"
        );
        const allInventories = allInventoriesResponse.data;

        const uniqueCategories = [
          ...new Set(allInventories.map((item) => item.category)),
        ];
        const uniqueWarehouses = [
          ...new Set(allInventories.map((item) => item.warehouse_name)),
        ];

        setCategories(uniqueCategories);
        setWarehouses(uniqueWarehouses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemId]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.item_name.trim()) {
      newErrors.item_name = "Item name is invalid";
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is invalid";
    }
    if (!selectedCategory.trim()) {
      newErrors.category = "Category is invalid";
    }
    if (
      form.status === "In Stock" &&
      (!form.quantity || isNaN(form.quantity) || Number(form.quantity) <= 0)
    ) {
      newErrors.quantity = "Quantity is invalid";
    }
    if (!selectedWarehouse.trim()) {
      newErrors.warehouse_id = "Warehouse is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    setForm((prevForm) => ({
      ...prevForm,
      category: value,
    }));
  };

  const handleWarehouseChange = (event) => {
    const value = event.target.value;
    setSelectedWarehouse(value);
    setForm((prevForm) => ({
      ...prevForm,
      warehouse_id: value,
    }));
  };

  const handleStockChange = (event) => {
    const value = event.target.value;
    setStockStatus(value);
    setForm((prevForm) => ({
      ...prevForm,
      status: value,
    }));
  };

  const onClose = () => {
    setForm({
      item_name: "",
      description: "",
      category: "",
      status: "In Stock",
      quantity: "",
      warehouse_id: "",
    });
    setSelectedCategory("");
    setStockStatus("");
    setSelectedWarehouse("");
  };

  const onSave = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.error("Form validation failed");
      return;
    }

    const itemData = {
      item_name: form.item_name,
      description: form.description,
      category: selectedCategory,
      status: stockStatus,
      quantity: stockStatus === "In Stock" ? form.quantity : 0,
      warehouse_id: selectedWarehouse,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/inventories/${itemId}`,
        itemData
      );

      if (response.status === 200) {
        console.log("Item updated successfully:", response.data);
        alert("Item updated successfully!");
      } else {
        console.error("Failed to update item:", response.status);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="layout">
      <form className="editinventory" onSubmit={onSave}>
        <div className="editinventory__header">
          <img
            src={arrowBack}
            alt="arrow icon"
            className="editinventory__icon-arrow"
          />
          <h1>Edit Inventory Item</h1>
        </div>

        <div className="editinventory__container">
          <div className="editinventory__container-item">
            <h2 className="editinventory__header-details">Item Details</h2>
            <div className="editinventory__name">
              <h3>Item Name</h3>
              <input
                className="editinventory__entry"
                name="item_name"
                type="text"
                value={form.item_name}
                onChange={handleChange}
              />
            </div>
            <div className="editinventory__description">
              <h3>Description</h3>
              <textarea
                className="editinventory__entry"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="editinventory__category">
              <h3>Category</h3>
              <select
                className="editinventory__entry-selection"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="editinventory__container-item editinventory__container-border">
            <h2 className="editinventory__header-availability">
              Item Availability
            </h2>
            <div className="editinventory__status">
              <h3>Status</h3>
              <div className="editinventory__status-container">
                <div className="editinventory__status-selection">
                  <input
                    type="radio"
                    id="status-instock"
                    name="status"
                    value="In Stock"
                    checked={form.status === "In Stock"}
                    onChange={handleChange}
                  ></input>
                  <label
                    className="editinventory__status-label"
                    htmlFor="status-instock"
                  >
                    In Stock
                  </label>
                </div>
                <div className="editinventory__status-selection">
                  <input
                    type="radio"
                    id="status-outofstock"
                    name="status"
                    value="Out of Stock"
                    checked={form.status === "Out of Stock"}
                    onChange={handleChange}
                  ></input>
                  <label
                    className="editinventory__status-label"
                    htmlFor="status-outofstock"
                  >
                    Out of Stock
                  </label>
                </div>
              </div>
              {form.status === "In Stock" && (
                <div className="editinventory__quantity">
                  <h3>Quantity</h3>
                  <input
                    className="editinventory__entry"
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                  {errors.quantity && <span>{errors.quantity}</span>}
                </div>
              )}
            </div>
            <div className="editinventory__warehouse">
              <h3>Warehouse</h3>
              <select
                className="editinventory__entry-selection"
                name="warehouse"
                value={selectedWarehouse}
                onChange={handleWarehouseChange}
              >
                {warehouses.map((warehouse, index) => (
                  <option key={index} value={warehouse}>
                    {warehouse}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="modal__buttons-container">
          <CancelButton onClick={onClose} />
          <SaveButton type="submit" />
        </div>
      </form>
    </div>
  );
}

export default EditInventoryItemPage;
