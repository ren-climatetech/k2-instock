import { Link } from "react-router-dom";
import axios from "axios"
import "./InventoryList.scss";
import DeleteFromListButton from "../Buttons/DeleteFromListButton.js/DeleteFromListButton";
import EditFromListButton from "../Buttons/EditFromListButton/EditFromListButton";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
// Use the base url from environment variables
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const InventoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [inventories, setInventories] = useState([]);

  async function getInventories() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/inventories`);
      console.log(data);
      setInventories(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getInventories();
  }, []);

  const openModal = (warehouse) => {
    setSelectedInventory(warehouse);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventory(null);
  };
  const handleDelete = async () => {
    if (selectedInventory) {
      try {
        const response = await axios.delete(
          `${BASE_URL}/api/inventories/${selectedInventory.id}`
        );

        if (response.status === 204) {
          getInventories();
          closeModal();
          toast.success(
            `${selectedInventory.item_name} with ID ${selectedInventory.id} was successfully deleted.`
          );
        } else {
          toast.error(
            `${selectedInventory.item_name} with ID ${selectedInventory.id} couldn't be deleted.`
          );
        }
      } catch (error) {
        toast.error(
          `${selectedInventory.item_name} with ID ${selectedInventory.id} couldn't be deleted. ${error.response?.data?.message}`
        );
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
    <ul className="inventories__list">
      {inventories.map(
        ({
          id,
          warehouse_name,
          item_name,
          description,
          category,
          status,
          quantity,
        }) => {
          return (
            <li key={id} className="inventories__item">
              <div className="inventories__info-link">
                <div className="inventories__content inventories__content-item">
                  <span className="inventories__label">Inventory Item</span>
                  <Link
                    to={`/inventories/${id}`}
                    className="inventories__inventory"
                  >
                    {item_name}
                    <img
                      src={chevronIcon}
                      alt="arrow icon"
                      className="inventories__inventory-icon"
                    />
                  </Link>
                </div>
                <div className="inventories__content inventories__content-category">
                  <span className="inventories__label">Category</span>
                  <p className="inventories__address">{category}</p>
                </div>
                <div className="inventories__content inventories__content-status">
                  <span className="inventories__label">Status</span>
                  <p
                    className={`inventories__content ${
                      status.toLowerCase() === "in stock"
                        ? "inventories__content in-stock"
                        : "inventories__content out-of-stock"
                    }`}
                  >
                    {status}
                  </p>
                </div>
                <div className="inventories__content inventories__content-quantity">
                  <span className="inventories__label">QTY</span>
                  <p>{quantity}</p>
                </div>
                <div className="inventories__content inventories__content-name">
                  <span className="inventories__label">Warehouse</span>
                  <p>{warehouse_name}</p>
                </div>
              </div>
              <div className="action-buttons">
                <DeleteFromListButton  onClick={() => openModal({ id, item_name })}/>
                <EditFromListButton path={`/inventories/${id}/edit`} />
              </div>
            </li>
          );
        }
      )}
    </ul>
     {isModalOpen && (
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
        itemName={selectedInventory?.item_name}
        category={"inventory"}
      />
    )}
    </>
  );
};

export default InventoryList;
