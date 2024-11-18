import { useState, useEffect } from "react";
import AddLinkButton from "../../components/Buttons/AddLinkButton/AddLinkButton";
import Search from "../../components/Search/Search";
import InventoryListHeader from "../../components/InventoryListHeader/InventoryListHeader";
import "./InventoryPage.scss";
import InventoryList from "../../components/InventoryList/InventoryList";
import axios from "axios";

// use the base URL from environment variables
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function InventoryPage() {
  const [query, setQuery] = useState("");
  const [inventories, setInventories] = useState([]);
  const [filteredInventories, setFilteredInventories] = useState([]);

  // get all inventories from the server
  const fetchInventories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/inventories`);
      setInventories(data);
      setFilteredInventories(data);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  // filter inventories based on search query
  useEffect(() => {
    const filtered = inventories.filter(
      ({
        item_name,
        category,
        warehouse_name,
        description,
        status,
        quantity,
      }) =>
        item_name.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase()) ||
        warehouse_name.toLowerCase().includes(query.toLowerCase()) ||
        description.toLowerCase().includes(query.toLowerCase()) ||
        status.toLowerCase().includes(query.toLowerCase()) ||
        quantity.toString().includes(query)
    );
    setFilteredInventories(filtered);
  }, [query, inventories]);

  return (
    <section>
      <div className="layout inventories__container">
        {/* Inventory title and buttons */}
        <div className="inventories__heading-and_buttons">
          <h1 className="inventories__header">Inventory</h1>
          <div className="inventories__buttons">
            <Search onSearch={setQuery} /> 
            <AddLinkButton text="+ Add New Item" path="/inventories/add" />
          </div>
        </div>
        <InventoryListHeader />
        {/* Pass filtered inventories to InventoryList */}
        <InventoryList
          inventories={filteredInventories}
          setInventories={setInventories}
        />
      </div>
    </section>
  );
}

export default InventoryPage;
