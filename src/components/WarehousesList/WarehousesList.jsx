import { Link } from "react-router-dom";
import "./WarehousesList.scss";
import DeleteFromListButton from "../Buttons/DeleteFromListButton.js/DeleteFromListButton";
import EditFromListButton from "../Buttons/EditFromListButton/EditFromListButton";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const WarehousesList = ({ warehouses, setWarehouses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const openModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouse(null);
  };

  const handleDelete = async () => {
    if (selectedWarehouse) {
      try {
        const response = await axios.delete(
          `${baseUrl}/api/warehouses/${selectedWarehouse.id}`
        );

        if (response.status === 204) {
          // remove the deleted warehouse from the state
          setWarehouses((prevWarehouses) =>
            prevWarehouses.filter(
              (warehouse) => warehouse.id !== selectedWarehouse.id
            )
          );
          closeModal();
          toast.success(
            `${selectedWarehouse.warehouse_name} with ID ${selectedWarehouse.id} was successfully deleted.`
          );
        } else {
          toast.error(
            `${selectedWarehouse.warehouse_name} with ID ${selectedWarehouse.id} couldn't be deleted.`
          );
        }
      } catch (error) {
        toast.error(
          `${selectedWarehouse.warehouse_name} with ID ${selectedWarehouse.id} couldn't be deleted. ${error.response?.data?.message}`
        );
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <ul className="warehouses__list">
        {warehouses.map(
          ({
            id,
            warehouse_name,
            address,
            city,
            contact_email,
            contact_phone,
          }) => (
            <li key={id} className="warehouses__item">
              <div className="warehouses__info-link">
                <div className="warehouses__content">
                  <span className="warehouses__label">Warehouse</span>
                  <Link
                    to={`/warehouse/${id}`}
                    className="warehouses__warehouse"
                  >
                    {warehouse_name}
                    <img
                      src={chevronIcon}
                      alt="arrow icon"
                      className="warehouses__warehouse-icon"
                    />
                  </Link>
                </div>
                <div className="warehouses__content warehouses__content-address">
                  <span className="warehouses__label">Address</span>
                  <p className="warehouses__address">{address}</p>
                </div>
                <div className="warehouses__content">
                  <span className="warehouses__label">City</span>
                  <p>{city}</p>
                </div>
                <div className="warehouses__content warehouses__content-contact">
                  <span className="warehouses__label">Contact Info</span>
                  <p>{contact_phone}</p>
                  <p>{contact_email}</p>
                </div>
              </div>
              <div className="action-buttons">
                <DeleteFromListButton
                  onClick={() => openModal({ id, warehouse_name })}
                />
                <EditFromListButton path={`/warehouse/${id}/edit`} />
              </div>
            </li>
          )
        )}
      </ul>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          itemName={selectedWarehouse?.warehouse_name}
          category={"warehouse"}
        />
      )}
    </>
  );
};

export default WarehousesList;
