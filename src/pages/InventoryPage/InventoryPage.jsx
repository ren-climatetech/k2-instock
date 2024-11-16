import { useEffect, useState } from "react";
import AddLinkButton from "../../components/Buttons/AddLinkButton/AddLinkButton";
import Search from "../../components/Search/Search";
import InventoryListHeader from "../../components/InventoryListHeader/InventoryListHeader";
import "./InventoryPage.scss";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";

// Use the base url from environment variables
const BASE_URL = import.meta.env.VITE_API_URL;

function InventoryPage() {
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

  return (
    <section>
      <div className="layout inventories__container">
        {/* Inventory title and buttons */}
        <div className="inventories__heading-and_buttons">
          <h1 className="inventories__title">Inventory</h1>
          <div className="inventories__buttons">
            <Search />
            <AddLinkButton text="+ Add New Inventory" path="/inventories/add" />
          </div>
        </div>
        {/* Inventory List Header */}
        <InventoryListHeader />
        <InventoryList inventories={inventories} />
      </div>
    </section>
  );
}

export default InventoryPage;
