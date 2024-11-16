import React, { useState } from "react";
import axios from "axios";
import "../AddWarehouseForm/AddWarehouseForm.scss";
import { useNavigate } from "react-router-dom";
// import AddSubmitButton from "../Buttons/AddSubmitButton/AddSubmitButton";
import AddButton from "../Buttons/AddButton/AddButton";
import CancelButton from "../Buttons/CancelButton/CancelButton";
import ErrorImage from "../../assets/icons/error-24px.svg"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AddWarehouseForm = () => {
  const navigate = useNavigate(); //Initializing navigation
  const [form, setForm] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegEx =
      /^(\+?\d{1,2})?\s?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;

    if (!form.warehouse_name.trim()) {
      newErrors.warehouse_name = "Warehouse name is invalid";
    }
    if (!form.address.trim()) {
      newErrors.address = "Address is invalid";
    }
    if (!form.city.trim()) {
      newErrors.city = "City is invalid";
    }
    if (!form.country.trim()) {
      newErrors.country = "Country is invalid";
    }
    if (!form.contact_name.trim()) {
      newErrors.contact_name = "Contact name is invalid";
    }
    if (!form.contact_position.trim()) {
      newErrors.contact_position = "Contact position is invalid";
    }
    if (!form.contact_phone.trim() || !phoneRegEx.test(form.contact_phone)) {
      newErrors.contact_phone = "Phone is invalid";
    }
    if (!form.contact_email.trim() || !emailRegEx.test(form.contact_email)) {
      newErrors.contact_email = "Email is invalid";
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
        const response = await axios.post(`${BASE_URL}/api/warehouses`, form);
        if (response.status === 201) {
          console.log("Warehouse created successfully");
          navigate("/warehouses");
        } else {
          console.log("Error creating warehouse");
        }
      } catch (error) {
        console.error("Error creating warehouse:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      contact_name: "",
      contact_position: "",
      contact_phone: "",
      contact_email: "",
    });
    navigate("/warehouses");
  };

  return (
    <form className="add-warehouse__form" onSubmit={handleSubmit}>
      <div className="add-warehouse__form-wrapper">
        <div className="add-warehouse__form-wrapper_warehouse">
          <h2 className="add-warehouse__form-wrapper_warehouse-title">
            Warehouse Details
          </h2>
          <label className="add-warehouse__form-wrapper_warehouse-label">
            Warehouse Name
          </label>
          <input
            className={`add-warehouse__form-wrapper_warehouse-input ${
              errors.warehouse_name ? "error" : ""
            }`}
            type="text"
            name="warehouse_name"
            value={form.warehouse_name}
            placeholder="Warehouse Name"
            onChange={handleChange}
          />
          {errors.warehouse_name && (
            <span className="add-warehouse__form-wrapper_warehouse-input__error">
              <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.warehouse_name}
              </span>
              )}
          <label className="add-warehouse__form-wrapper_warehouse-label">
            Street Address
          </label>
          <input
            className={`add-warehouse__form-wrapper_warehouse-input ${
              errors.warehouse_name ? "error" : ""
            }`}
            type="text"
            name="address"
            value={form.address}
            placeholder="Street Address"
            onChange={handleChange}
          />
          {errors.address && (
            <span className="add-warehouse__form-wrapper_warehouse-input__error">
              <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.address}
              </span>
            )}
          <label className="add-warehouse__form-wrapper_warehouse-label">City</label>
          <input
            className={`add-warehouse__form-wrapper_warehouse-input ${
              errors.city ? "error" : ""
            }`}
            type="text"
            name="city"
            value={form.city}
            placeholder="City"
            onChange={handleChange}
          />
          {errors.city && (
            <span className="add-warehouse__form-wrapper_warehouse-input__error">
            <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.city}
              </span>
            )}
          <label className="add-warehouse__form-wrapper_warehouse-label">
            Country
          </label>
          <input
            className={`add-warehouse__form-wrapper_warehouse-input ${
              errors.country ? "error" : ""
            }`}
            type="text"
            name="country"
            value={form.country}
            placeholder="Country"
            onChange={handleChange}
          />
          {errors.country && (
            <span className="add-warehouse__form-wrapper_warehouse-input__error">
            <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.country}
              </span>
            )}
        </div>
        <div className="add-warehouse__form-wrapper_contact">
          <h2 className="add-warehouse__form-wrapper_contact-title">Contact Details</h2>
          <label className="add-warehouse__form-wrapper_contact-label">
            Contact Name
          </label>
          <input
            className={`add-warehouse__form-wrapper_warehouse-input ${
              errors.warehouse_name ? "error" : ""
            }`}
            type="text"
            name="contact_name"
            value={form.contact_name}
            placeholder="Contact Name"
            onChange={handleChange}
          />
          {errors.contact_name && (
            <span className="add-warehouse__form-wrapper_contact-input__error">
            <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.contact_name}
              </span>
            )}
          <label className="add-warehouse__form-wrapper_contact-label">
            Contact Position
          </label>
          <input
            className={`add-warehouse__form-wrapper_contact-input ${
              errors.warehouse_name ? "error" : ""
            }`}
            type="text"
            name="contact_position"
            value={form.contact_position}
            placeholder="Position"
            onChange={handleChange}
          />
          {errors.contact_position && (
            <span className="add-warehouse__form-wrapper_contact-input__error">
            <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.contact_position}
              </span>
            )}
          <label className="add-warehouse__form-wrapper_contact-label">
            Contact Phone
          </label>
          <input
            className={`add-warehouse__form-wrapper_contact-input ${
              errors.warehouse_name ? "error" : ""
            }`}
            type="text"
            name="contact_phone"
            value={form.contact_phone}
            placeholder="Phone Number"
            onChange={handleChange}
          />
          {errors.contact_phone && (
            <span className="add-warehouse__form-wrapper_contact-input__error">
            <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.contact_phone}
              </span>
              )}
          <label className="add-warehouse__form-wrapper_contact-label">
            Contact Email
          </label>
          <input
            className={`add-warehouse__form-wrapper_contact-input ${
              errors.warehouse_name ? "error" : ""
            }`}
            type="text"
            name="contact_email"
            value={form.contact_email}
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.contact_email &&(
            <span className="add-warehouse__form-wrapper_contact-input__error">
            <img src={ErrorImage} alt="error icon" className="error-icon" />
              {errors.contact_email}
              </span>
            )}
        </div>
      </div> 
      <div className="add-warehouse__form-buttons">
        <CancelButton onClick={handleCancel}/>
        <AddButton text="+Add Warehouse" path="/warehouse/add" />
      </div>
    </form>
  );
};

export default AddWarehouseForm;
