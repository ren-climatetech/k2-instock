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

import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import "../../pages/WarehouseItemPage/WarehouseItemPage.scss";

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
        <div>
          <div className="warehouse-info">
            {/* Left section */}
            <div className="warehouse-info-left">
              <div className="warehouse-info-left__address">
                <p className="item-info__title">WAREHOUSE ADDRESS:</p>
                <div className="warehouse-info__address">
                  <p>{warehouseItem.address},&nbsp;</p>
                  <p>
                    {warehouseItem.city} , {warehouseItem.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="warehouse-info-divider"></div>
            {/* Right section */}
            <div className="warehouse-info-right">
              <div className="item-info__warehouse">
                <p className="item-info__title">CONTACT NAME:</p>
                <p>{warehouseItem.contact_name}</p>
                <p>{warehouseItem.contact_position}</p>
              </div>
              <div className="item-info__warehouse">
                <p className="item-info__title">CONTACT INFORMATION:</p>
                <p>{warehouseItem.contact_phone}</p>
                <p>{warehouseItem.contact_email}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Inventory List Header */}
        <InventorySingleWarehouseHeader />
        <InventorySingleWarehouse warehhouseId={itemId} />
      </div>
      <div className="layout warehouse-item__container">
        <WarehouseDetails />
      </div>
    </section>
  );
}

export default WarehouseItemPage;
