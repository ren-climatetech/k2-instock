import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AddInventoryForm/AddInventoryForm.scss";
import { useNavigate } from "react-router-dom";
import AddButton from "../Buttons/AddButton/AddButton";
import CancelButton from "../Buttons/CancelButton/CancelButton";
import ErrorImage from "../../assets/icons/error-24px.svg"
import ArrowIcon from "../../assets/icons/arrow_drop_down-24px.svg"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AddInventoryForm = ({ onInventoryAdded }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
    warehouse_id: "",
  });

  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([
    "Electronics",
    "Furniture",
    "Clothing",
    "Food",
  ]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/warehouses`);
        setWarehouses(response.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.item_name.trim()) {
      newErrors.item_name = "Item name is invalid";
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is invalid";
    }
    if (!form.category.trim()) {
      newErrors.category = "Category is invalid";
    }
    if (
      form.status === "In Stock" &&
      (!form.quantity ||
        isNaN(form.quantity) ||
        !Number.isFinite(Number(form.quantity)))
    ) {
      newErrors.quantity = "Quantity is invalid";
    }
    if (!form.warehouse_id.trim()) {
      newErrors.warehouse_id = "Warehouse is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(`${BASE_URL}/api/inventories`, form);
        if (response.status === 201) {
          console.log("Inventory item created successfully");
          onInventoryAdded(response.data);
          navigate("/inventories");
        } else {
          console.log("Error creating inventory item");
        }
      } catch (error) {
        console.error("Error creating inventory item:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({
      item_name: "",
      description: "",
      category: "",
      status: "In Stock",
      quantity: "",
      warehouse_id: "",
    });
    navigate("/inventories");
  };

  return (
    <form className="add-inventory__form" onSubmit={handleSubmit}>
      <div className="add-inventory__form-details">
        <h2 className="add-inventory__form-details_title">
          Item Details
        </h2>
        <label className="add-inventory__form-details_label">
          Item Name
        </label>
        <input
          className={`add-inventory__form-details_input ${
            errors.item_name ? "error" : ""
          }`}
          type="text"
          name="item_name"
          value={form.item_name}
          placeholder="Item Name"
          onChange={handleChange}
        />
        {errors.item_name && (
          <span className="add-inventory__form-details_input__error"><img src={ErrorImage} alt="error icon" className="error-icon"/>
            {errors.item_name}
          </span>
        )}
        <label className="add-inventory__form-details_label">
          Description
        </label>
        <input
          className={`add-inventory__form-details_input ${
            errors.description ? "error" : ""
          }`}
          type="text"
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
        />
        {errors.description && (
          <span className="add-inventory__form-details_input__error"><img src={ErrorImage} alt="error icon" className="error-icon"/>
            {errors.description}
          </span>
        )}
        <label className="add-inventory__form-details_label">
          Category
        </label>
        <div className="add-inventory__dropdown-container">
          <select
            className={`add-inventory__form-details_input ${
              errors.category ? "error" : ""
            }`}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <img
            src={ArrowIcon}
            alt="dropdown arrow"
            className="add-inventory__dropdown-icon"
          />
        </div>
        {errors.category && (
          <span className="add-inventory__form-details_input__error"><img src={ErrorImage} alt="error icon" className="error-icon"/>
            {errors.category}
          </span>
        )}
      </div>
      <div className="add-inventory__form-availability">  
        <h2 className="add-inventory__form-availability_title">
          Item Availability
        </h2>
        <label className="add-inventory__form-availability_label">
          Status
        </label>
        <div className="add-inventory__form-availability_status-radio-group">
          {" "}
          <label>
            {" "}
            <input
              className="add-inventory__form-availability_input"
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
              className="add-inventory__form-availability_input"
              type="radio"
              name="status"
              value="Out of Stock"
              checked={form.status === "Out of Stock"}
              onChange={handleChange}
            />{" "}
            Out of Stock{" "}
          </label>{" "}
        </div>
        {form.status === "In Stock" && (
          <>
            <label className="add-inventory__form-availability_label">
              Quantity
            </label>
            <input
              className={`add-inventory__form-availability_input ${
                errors.quantity ? "error" : ""
              }`}
              type="number"
              name="quantity"
              value={form.quantity}
              placeholder="Quantity"
              onChange={handleChange}
            />
            {errors.quantity && (
              <span className="add-inventory__form-availability_input__error"><img src={ErrorImage} alt="error icon" className="error-icon"/>
                {errors.quantity}
              </span>
            )}
          </>
        )}
        <label className="add-inventory__form-availability_label">
          Warehouse
        </label>
        <div className="add-inventory__dropdown-container">
          <select
            className={`add-inventory__form-availability_input ${
              errors.item_name ? "error" : ""
            }`}
            name="warehouse_id"
            value={form.warehouse_id}
            onChange={handleChange}
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.warehouse_name}
              </option>
            ))}
          </select>
          <img
            src={ArrowIcon}
            alt="dropdown arrow"
            className="add-inventory__dropdown-icon"
          />
        </div>  
        {errors.warehouse_id && (
          <span className="add-inventory__form-availability_input__error"><img src={ErrorImage} alt="error icon" className="error-icon"/>
            {errors.warehouse_id}
          </span>
        )}
      </div>
      
      <div className="add-inventory__form-buttons">
        <CancelButton onClick={handleCancel} />
        <AddButton text="+Add Inventory" path="/inventory/add" />
      </div>
    </form>
  );
};

export default AddInventoryForm;
