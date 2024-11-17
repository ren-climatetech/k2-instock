import "./EditInventoryItemPage.scss";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton/SaveButton";
import axios from "axios";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import { useParams } from "react-router-dom";
import arrowDropDown from "../../assets/icons/arrow_drop_down-24px.svg";
import React, { useState, useEffect } from "react";

function EditInventoryItemPage() {
  const { itemId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stockStatus, setStockStatus] = useState("");

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
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
        setItemDetails(itemData);
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
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const handleStockChange = (event) => {
    setStockStatus(event.target.value);
  };

  const handleWarehouseChange = (event) => {
    const warehouseName = event.target.value;
    setSelectedWarehouse(warehouseName);
  };

  const onClose = () => {
    console.log("Cancel button clicked");

    setSelectedCategory("");
    setStockStatus("");
    setSelectedWarehouse("");
  };

  const onSave = async () => {
    const itemName = document.querySelector("input[type='text']").value;
    const description = document.querySelector(
      "textarea[name='description']"
    ).value;

    const itemData = {
      itemName,
      description,
      category: selectedCategory,
      stockStatus: form.status,
      warehouse: selectedWarehouse,
    };

    // Validate required fields
    if (
      !itemName ||
      !description ||
      !selectedCategory ||
      !stockStatus ||
      !selectedWarehouse
    ) {
      console.error("Please fill in all fields.");
      return;
    }

    try {
      // Send data to backend
      const response = await axios.put(
        "http://localhost:8080/api/inventories",
        itemData
      );

      if (response.status === 201) {
        console.log("Item saved successfully:", response.data);
        setSelectedCategory("");
        setStockStatus("");
        setSelectedWarehouse("");
        document.querySelector("input[type='text']").value = "";
        document.querySelector("textarea[name='description']").value = "";
      } else {
        console.error("Failed to save item:", response.status);
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <>
      <form className="editinventory">
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
                type="text"
                value={itemDetails?.item_name || ""}
                onChange={(e) =>
                  setItemDetails({ ...itemDetails, item_name: e.target.value })
                }
              />
            </div>

            <div className="editinventory__description">
              <h3>Description</h3>
              <textarea
                className="editinventory__entry"
                name="description"
                value={itemDetails?.description || ""}
                onChange={(e) =>
                  setItemDetails({
                    ...itemDetails,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="editinventory__category">
              <h3>Category</h3>
              <select
                className="editinventory__entry-selection"
                name="category"
                id="category"
                value={selectedCategory || ""}
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
                    name="stockStatus"
                    value="In Stock"
                    checked={form.status === "In Stock"}
                    onChange={handleChange}
                    // checked={stockStatus === "In Stock"}
                    // onChange={handleStockChange}
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
                    name="stockStatus"
                    value="Out of Stock"
                    checked={form.status === "Out of Stock"}
                    onChange={handleChange}
                    // checked={stockStatus === "Out of Stock"}
                    // onChange={handleStockChange}
                  ></input>
                  <label
                    className="editinventory__status-label"
                    htmlFor="status-outofstock"
                  >
                    Out of Stock
                  </label>
                </div>

                
                {form.status === "In Stock" && (
                  
                    <div className="editinventory__quantity">
                      <h3>Quantity</h3>
                      
                      <input
                        className={`add-inventory__form-wrapper-availability_input ${
                          errors.quantity ? "error" : ""
                        }`}
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        placeholder="0"
                        onChange={handleChange}
                        min="1"
                      />
                      {errors.quantity && (
                        <span className="add-inventory__form-wrapper-availability_input__error">
                          <img
                            src={ErrorImage}
                            alt="error icon"
                            className="error-icon"
                          />
                          {errors.quantity}
                        </span>
                      )}
                    </div>
                  
                )}
              </div>
            </div>

            <div className="editinventory__warehouse">
              <h3>Warehouse</h3>
              <select
                className="editinventory__entry-selection"
                name="warehouse"
                id="warehouse"
                value={selectedWarehouse || ""}
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
          <SaveButton onClick={onSave} />
        </div>
      </form>
    </>
  );
}

export default EditInventoryItemPage;
