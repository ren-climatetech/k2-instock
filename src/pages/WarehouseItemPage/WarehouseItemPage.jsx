import GoBackButton from "../../components/Buttons/GoBackButton/GoBackButton";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditItemButton from "../../components/Buttons/EditItemButton/EditItemButton";
import "./WarehouseItemPage.scss";
import axios from "axios";
import InventorySingleWarehouseHeader from "../../components/InventorySingleWarehouseHeader/InventorySingleWarehouseHeader";
import InventorySingleWarehouse from "../../components/InventorySingleWarehouse/InventorySingleWarehouse";

// Use the base url from environment variables
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function WarehouseItemPage() {
  const { itemId } = useParams();
  const [warehouseItem, setWarehouseItem] = useState(null);
  const [inventory, setInventory] = useState(null);

  async function getSingleWarehouseItem() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/warehouses/${itemId}`);
      setWarehouseItem(data);
    } catch (error) {
      console.error(error);
    }
  }

  // async function getInventoryOfWarehouse() {
  //   try {
  //     const { data } = await axios.get(
  //       `${BASE_URL}/api/warehouses/${itemId}/inventories`
  //     );
  //     console.log(data);
  //     setInventory(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    getSingleWarehouseItem();
    // getInventoryOfWarehouse();
  }, [itemId]);

  if (!warehouseItem) {
    return <div>Inventory not found.</div>;
  }

  return (
    <section>
      <div className="layout inventories__container">
        {/* Inventory title and buttons */}
        <div className="inventories__heading-and-buttons">
          <div className="inventories__title-and-arrow">
            <GoBackButton path="/warehouses" />
            <h1 className="inventories__title">
              {warehouseItem.warehouse_name}
            </h1>
          </div>

          <div className="inventories__buttons">
            <EditItemButton path={`/warehouse/${warehouseItem.id}/edit`} />
          </div>
        </div>
        <div className="item-info">hello</div>
        {/* Inventory List Header */}
        <InventorySingleWarehouseHeader />
        <InventorySingleWarehouse warehhouseId={itemId} />
      </div>
    </section>
  );
}

export default WarehouseItemPage;
