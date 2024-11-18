import "./EditInventoryItemPage.scss";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton/SaveButton";
import axios from "axios";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function EditInventoryItemPage() {
  const { itemId } = useParams();

  // State management
  const [allWarehouses, setAllWarehouses] = useState([]);
  const [warehouseId, setWarehouseId] = useState(0);
  const [categories, setCategories] = useState([
    "Electronics",
    "Furniture",
    "Clothing",
    "Food",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
    warehouse_id: "",
  });

  // Fetch all warehouses
  useEffect(() => {
    const getAllWarehouses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/warehouses");
        setAllWarehouses(res.data);
      } catch (error) {
        console.error("Error fetching all warehouses: ", error);
      }
    };
    getAllWarehouses();
  }, []);

  // Fetch inventory item
  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const inventoryResponse = await axios.get(
          `http://localhost:8080/api/inventories/${itemId}`
        );

        const itemData = inventoryResponse.data;

        const matchingWarehouse = allWarehouses.find(
          (warehouse) => warehouse.warehouse_name === itemData.warehouse_name
        );

        setWarehouseId(matchingWarehouse ? matchingWarehouse.id : null);

        setForm({
          item_name: itemData.item_name,
          description: itemData.description,
          category: itemData.category,
          status: itemData.status,
          quantity: itemData.quantity,
          warehouse_id: matchingWarehouse ? matchingWarehouse.id : "",
        });

        console.log(itemData);
        setSelectedCategory(itemData.category);
        setSelectedWarehouse(itemData.warehouse_name);
        // setStockStatus(itemData.status);
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };

    if (allWarehouses.length > 0) {
      fetchInventoryItem();
    }
  }, [itemId, allWarehouses]);

  // Update warehouses list for dropdown
  useEffect(() => {
    if (allWarehouses.length > 0) {
      setWarehouses(allWarehouses.map((warehouse) => warehouse.warehouse_name));
    }
  }, [allWarehouses]);

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
      (isNaN(form.quantity) || form.quantity <= 0)
    ) {
      newErrors.quantity = "Quantity must be a positive number.";
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
      [name]: name === "quantity" && isNaN(value) ? parseInt(value, 10) : value,
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

    const matchingWarehouse = allWarehouses.find(
      (warehouse) => warehouse.warehouse_name === value
    );
    if (matchingWarehouse) {
      setWarehouseId(matchingWarehouse.id);
      setForm((prevForm) => ({
        ...prevForm,
        warehouse_id: matchingWarehouse.id,
      }));
    }
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
    navigate("/inventories");
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
      status: form.status,
      quantity: form.status === "In Stock" ? parseInt(form.quantity) : 0,
      warehouse_id: warehouseId,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/inventories/${itemId}`,
        itemData
      );

      if (response.status === 200) {
        console.log("Item updated successfully:", response.data);
        alert("Item updated successfully!");
        navigate("/inventories");
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
          <Link to="/inventories" className="editinventory__icon-arrow">
            <img
              src={arrowBack}
              alt="arrow icon"
              className="editinventory__icon-arrow"
            />
          </Link>
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

              <div className="add-inventory__form-wrapper-availability_status-radio-group">
                {" "}
                <label>
                  {" "}
                  <input
                    className="add-inventory__form-wrapper-availability_status-radio-group_input1"
                    type="radio"
                    name="status"
                    value="In Stock"
                    checked={form.status === "In Stock"}
                    onChange={handleChange}
                  />{" "}
                  In Stock{" "}
                </label>{" "}
                <label>
                  {" "}
                  <input
                    className="add-inventory__form-wrapper-availability_status-radio-group_input1"
                    type="radio"
                    name="status"
                    value="Out of Stock"
                    checked={form.status === "Out Of Stock"}
                    onChange={handleChange}
                  />{" "}
                  Out of Stock{" "}
                </label>{" "}
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
