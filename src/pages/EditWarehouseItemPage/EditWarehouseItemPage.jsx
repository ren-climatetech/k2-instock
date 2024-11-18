import "./EditWarehouseItemPage.scss";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton/SaveButton";
import axios from "axios";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function EditWarehouseItemPage() {
  const { itemId } = useParams();
  console.log("Received itemId:", itemId);
  const [warehouse_name, setWarehouseName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contact_name, setContactName] = useState("");
  const [contact_position, setPosition] = useState("");
  const [contact_phone, setPhone] = useState("");
  const [contact_email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/warehouses/${itemId}`
        );
        const warehouseData = response.data;

        setWarehouseName(warehouseData.warehouse_name);
        setAddress(warehouseData.address);
        setCity(warehouseData.city);
        setCountry(warehouseData.country);
        setContactName(warehouseData.contact_name);
        setPosition(warehouseData.contact_position);
        setPhone(warehouseData.contact_phone);
        setEmail(warehouseData.contact_email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWarehouseData();
  }, [itemId]);

  const onClose = () => {
    console.log("Cancel button clicked");
    navigate("/warehouses");

    // Reset form fields
    setWarehouseName("");
    setAddress("");
    setCity("");
    setCountry("");
    setContactName("");
    setPosition("");
    setPhone("");
    setEmail("");
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log(event);

    // Collect form data
    const warehouseData = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    };

    // Validate required fields
    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      console.error("Please fill in all fields.");
      return;
    }

    const editWarehouse = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/warehouses/${itemId}`,
          warehouseData
        );

        console.log(response);

        if (response.status === 200) {
          console.log("Warehouse saved successfully:", response.data);

          onClose();
        } else {
          console.error("Failed to save warehouse:", response.status);
        }
      } catch (error) {
        console.error("Error saving warehouse:", error);
      }
    };
    editWarehouse();
  };

  return (
    <div className="layout">
      <form className="editwarehouse" onSubmit={onSave}>
        <div className="editwarehouse__header">
          <img
            src={arrowBack}
            alt="arrow icon"
            className="editwarehouse__icon-arrow"
          />
          <h1>Edit Warehouse</h1>
        </div>

        <div className="editwarehouse__container">
          <div className="editwarehouse__container-item">
            <h2 className="editwarehouse__header-details">Warehouse Details</h2>
            <div className="editwarehouse__name">
              <h3>Warehouse Name</h3>
              <input
                className="editwarehouse__entry"
                type="text"
                value={warehouse_name}
                onChange={(e) => setWarehouseName(e.target.value)}
              ></input>
            </div>
            <div className="editwarehouse__street">
              <h3>Street Address</h3>
              <input
                className="editwarehouse__entry"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
            <div className="editwarehouse__city">
              <h3>City</h3>
              <input
                className="editwarehouse__entry"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>

            <div className="editwarehouse__country">
              <h3>Country</h3>
              <input
                className="editwarehouse__entry"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="editcontact__container-item">
            <h2 className="editcontact__header-details">Contact Details</h2>
            <div className="editcontact__name">
              <h3>Contact Name</h3>
              <input
                className="editcontact__entry"
                type="text"
                value={contact_name}
                onChange={(e) => setContactName(e.target.value)}
              ></input>
            </div>
            <div className="editcontact__position">
              <h3>Position</h3>
              <input
                className="editcontact__entry"
                type="text"
                value={contact_position}
                onChange={(e) => setContactPosition(e.target.value)}
              ></input>
            </div>
            <div className="editcontact__phone">
              <h3>Phone</h3>
              <input
                className="editcontact__entry"
                type="text"
                value={contact_phone}
                onChange={(e) => setContactPhone(e.target.value)}
              ></input>
            </div>
            <div className="editcontact__email">
              <h3>Email</h3>
              <input
                className="editcontact__entry"
                type="text"
                value={contact_email}
                onChange={(e) => setContactEmail(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="modal__buttons-container">
          <CancelButton onClick={onClose} />
          <SaveButton />
        </div>
      </form>
    </div>
  );
}

export default EditWarehouseItemPage;
