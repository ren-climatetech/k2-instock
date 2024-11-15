import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const WarehouseDetails = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState({
    name: "",
    address: "",
    contactName: "",
    contactPosition: "", 
    contactPhone: "", 
    contactEmail: "",
  });

  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/warehouses/${id}`);
      setWarehouse({
        name: response.data.warehouse_name,
        address: response.data.address,
        contactName: response.data.contact_name,
        contactPosition: response.data.contact_position,
        contactPhone: response.data.contact_phone,
        contactEmail: response.data.contact_email,
      });
    } catch (error) {
      console.error("Error fetching warehouse details:", error);
    }
  };

  useEffect(() => {
    getWarehouse();
  }, [id]);

  return (
    <div>
      <div>
        <h1>{warehouse.warehouse_name}</h1>
      </div>
      <section className="warehouse-details">
        <div>
          <h3>WAREHOUSE ADDRESS:</h3>
          <p>{warehouse.address}</p>
        </div>
        <div>
          <div>
            <h3>CONTACT NAME:</h3>
            <p>{warehouse.contactName}</p>
            <p>{warehouse.contactPosition}</p>
          </div>
          <div>
            <h3>CONTACT INFORMATION:</h3>
            <p>{warehouse.contactPhone}</p>
            <p>{warehouse.contactEmail} </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WarehouseDetails;
