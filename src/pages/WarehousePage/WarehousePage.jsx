import { useState, useEffect } from "react";
import Search from "../../components/Search/Search";
import WarehouseListHeader from "../../components/WarehouseListHeader/WarehouseListHeader";
import "./WarehousePage.scss";
import WarehousesList from "../../components/WarehousesList/WarehousesList";
import AddLinkButton from "../../components/Buttons/AddLinkButton/AddLinkButton";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function WarehousePage() {
  const [query, setQuery] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);

  // get warehouses from the server
  async function fetchWarehouses() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/warehouses`);
      setWarehouses(data);
      setFilteredWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  }

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    // filter warehouses based on query
    const filtered = warehouses.filter(
      ({ warehouse_name, address, city, contact_email, contact_phone }) =>
        warehouse_name.toLowerCase().includes(query.toLowerCase()) ||
        address.toLowerCase().includes(query.toLowerCase()) ||
        city.toLowerCase().includes(query.toLowerCase()) ||
        contact_email.toLowerCase().includes(query.toLowerCase()) ||
        contact_phone.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWarehouses(filtered);
  }, [query, warehouses]);

  return (
    <section>
      <div className="layout warehouses__container">
        {/* Warehouse title and buttons */}
        <div className="warehouses__heading-and_buttons">
          <h1 className="warehouses__title">Warehouses</h1>
          <div className="warehouses__buttons">
            <Search onSearch={setQuery} />
            <AddLinkButton text="+ Add New Warehouse" path="/warehouse/add" />
          </div>
        </div>
        {/* Warehouse List Header */}
        <WarehouseListHeader />
        {/* Pass the filtered warehouses to the list */}
        <WarehousesList
          warehouses={filteredWarehouses}
          setWarehouses={setWarehouses}
        />
      </div>
    </section>
  );
}

export default WarehousePage;
