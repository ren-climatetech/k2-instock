import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditItemButton from "../../components/Buttons/EditItemButton/EditItemButton";
import "./InventoryItemPage.scss";
import axios from "axios";
import GoBackButton from "../../components/Buttons/GoBackButton/GoBackButton";

// Use the base url from environment variables
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function InventoryItemPage() {
  const { itemId } = useParams();
  const [inventoryItem, setInventoryItem] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getSingleInventoryItem() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/inventories/${itemId}`);
      console.log(data);
      setInventoryItem(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSingleInventoryItem();
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!inventoryItem) {
    return <div>Item not found.</div>;
  }

  return (
    <section>
      <div className="layout inventories__container">
        {/* Inventory title and buttons */}
        <div className="inventories__heading-and-buttons">
          <div className="inventories__title-and-arrow">
            <GoBackButton path="/inventories" />
            <h1 className="inventories__title">{inventoryItem.item_name}</h1>
          </div>

          <div className="inventories__buttons">
            {/* gotta edit this path!!!!!!!!!!! */}
            <EditItemButton path="/inventories/:itemId/edit" />
          </div>
        </div>
        <div className="item-info">
          <div className="item-info-left">left section</div>
          <div className="item-info-divider"></div> {/* Add this line */}
          <div className="item-info-right">right section</div>
        </div>
      </div>
    </section>
  );
}

export default InventoryItemPage;
