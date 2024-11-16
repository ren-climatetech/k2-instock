import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditItemButton from "../Buttons/EditItemButton/EditItemButton";
import "../WarehouseDetails/WarehouseDetails.scss";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const WarehouseDetails = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState({
    warehouse_name: "",
    address: "",
    contact_name: "",
    contact_position: "", 
    contact_phone: "", 
    contact_email: "",
  });

  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/warehouses/${id}`);
      setWarehouse({
        warehouse_name: response.data.warehouse_name,
        address: response.data.address,
        contact_name: response.data.contact_name,
        contact_position: response.data.contact_position,
        contact_phone: response.data.contact_phone,
        contact_email: response.data.contact_email,
      });
    } catch (error) {
      console.error("Error fetching warehouse details:", error);
    }
  };

  useEffect(() => {
    getWarehouse();
  }, [id]);

  return (
    <section className="warehouse-details__container">
      <div>
        <h1>{warehouse.warehouse_name}</h1>
        <EditItemButton/>
      </div>
      <div className="warehouse-details">
        <div>
          <h3>WAREHOUSE ADDRESS:</h3>
          <p>{warehouse.address}</p>
        </div>
        <div>
          <h3>CONTACT NAME:</h3>
          <p>{warehouse.contact_name}</p>
          <p>{warehouse.contact_position}</p>
          <h3>CONTACT INFORMATION:</h3>
          <p>{warehouse.contact_phone}</p>
          <p>{warehouse.contact_email} </p>
        </div>
      </div>
    </section>
  );
};

export default WarehouseDetails;
