import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import GoBackButton from "../Buttons/GoBackButton/GoBackButton";
import EditItemButton from "../Buttons/EditItemButton/EditItemButton";
import "../WarehouseDetails/WarehouseDetails.scss";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const WarehouseDetails = () => {
  const { itemId } = useParams();
  const [warehouse, setWarehouse] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/warehouses/${itemId}`);
      setWarehouse({
        warehouse_name: response.data.warehouse_name,
        address: response.data.address,
        city: response.data.city,
        country: response.data.country,
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
  }, [itemId]);

  return (
    <section className="warehouse-details">
      <div className="warehouse-details__header">
        <div className="warehouse-details__header-wrapper">
          <GoBackButton path={"/warehouses"} />
          <h1 className="warehouse-details__header-wrapper_title">
            {warehouse.warehouse_name}
          </h1>
        </div>
        <EditItemButton path={"/warehouse/:itemId/edit"} />
      </div>
      <div className="warehouse-details_details">
        <div className="warehouse-details_details__address">
          <h3 className="warehouse-details_details__address-subtitle">
            WAREHOUSE ADDRESS:
          </h3>
          <div className="warehouse-details_details__address_wrapper">
            <p className="warehouse-details_details__address_wrapper-output">
              {warehouse.address}, 
            </p>
            <div className="warehouse-details_details__address_wrapper_wrapper1">
              <p className="warehouse-details_details__address_wrapper_wrapper1-output"> 
                {warehouse.city}, 
              </p>
              <p className="warehouse-details_details__address_wrapper_wrapper1-output">
              {warehouse.country}
              </p>
            </div>
          </div>
        </div>
        <div className="warehouse-details_details__contact">
          <div className="warehouse-details_details__contact_name">
            <h3 className="warehouse-details_details__contact_name-subtitle">
              CONTACT NAME:
            </h3>
            <p className="warehouse-details_details__contact_name-output">
              {warehouse.contact_name}
            </p>
            <p className="warehouse-details_details__contact_name-output">
              {warehouse.contact_position}
            </p>
          </div>
          <div className="warehouse-details_details__contact_info">
            <h3 className="warehouse-details_details__contact_info-subtitle">
              CONTACT INFORMATION:
            </h3>
            <p className="warehouse-details_details__contact_info-output">
              {warehouse.contact_phone}
            </p>
            <p className="warehouse-details_details__contact_info-output">
              {warehouse.contact_email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseDetails;
