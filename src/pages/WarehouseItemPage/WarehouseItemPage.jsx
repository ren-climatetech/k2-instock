import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import InventorySingleWarehouseHeader from "../../components/InventorySingleWarehouseHeader/InventorySingleWarehouseHeader";
import InventorySingleWarehouse from "../../components/InventorySingleWarehouse/InventorySingleWarehouse";

// Use the base url from environment variables
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";

function WarehouseItemPage() {
  const { itemId } = useParams();
  const [warehouseItem, setWarehouseItem] = useState(null);

  async function getSingleWarehouseItem() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/warehouses/${itemId}`);
      setWarehouseItem(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSingleWarehouseItem();
  }, [itemId]);

  if (!warehouseItem) {
    return <div>Inventory not found.</div>;
  }

  return (
    <section>
      <div className="layout inventories__container">
        {/* Inventory title and buttons */}
        <WarehouseDetails />
        {/* Inventory List Header */}
        <InventorySingleWarehouseHeader />
        <InventorySingleWarehouse warehhouseId={itemId} />
      </div>
    </section>
  );
}

export default WarehouseItemPage;
