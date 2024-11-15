import React, { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const AddWarehouseForm = () => {
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
        const response = await axios.post(`${BASE_URL}/warehouses`, form);
        if (response.status === 201) {
          console.log("Warehouse created successfully");
        } else {
          console.log("Error creating warehouse");
        }
      } catch (error) {
        console.error("Error creating warehouse:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Warehouse Name:</label>{" "}
        <input
          type="text"
          name="warehouse_name"
          value={form.warehouse_name}
          onChange={handleChange}
        />{" "}
        {errors.warehouse_name && <span>{errors.warehouse_name}</span>}{" "}
      </div>
      <div>
        <label>Address:</label>{" "}
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && <span>{errors.address}</span>}{" "}
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        {errors.city && <span>{errors.city}</span>}{" "}
      </div>
      <div>
        <label>Country:</label>{" "}
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
        />
        {errors.country && <span>{errors.country}</span>}{" "}
      </div>
      <div>
        <label>Contact Name:</label>{" "}
        <input
          type="text"
          name="contact_name"
          value={form.contact_name}
          onChange={handleChange}
        />
        {errors.contact_name && <span>{errors.contact_name}</span>}{" "}
      </div>
      <div>
        <label>Contact Position:</label>{" "}
        <input
          type="text"
          name="contact_position"
          value={form.contact_position}
          onChange={handleChange}
        />
        {errors.contact_position && <span>{errors.contact_position}</span>}{" "}
      </div>
      <div>
        <label>Contact Phone:</label>{" "}
        <input
          type="text"
          name="contact_phone"
          value={form.contact_phone}
          onChange={handleChange}
        />
        {errors.contact_phone && <span>{errors.contact_phone}</span>}{" "}
      </div>
      <div>
        <label>Contact Email:</label>{" "}
        <input
          type="text"
          name="contact_email"
          value={form.contact_email}
          onChange={handleChange}
        />
        {errors.contact_email && <span>{errors.contact_email}</span>}{" "}
      </div>
      <button type="submit">Add Warehouse</button>{" "}
    </form>
  );
};

export default AddWarehouseForm;
