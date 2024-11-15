import { useEffect, useState } from "react";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import Search from "../../components/Search/Search";
import WarehouseListHeader from "../../components/WarehouseListHeader/WarehouseListHeader";
import "./WarehousePage.scss";
import axios from "axios";
import WarehousesList from "../../components/WarehousesList/WarehousesList";

function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);

  async function getWarehouses() {
     try {
       const {data}= await axios.get("http://localhost:8080/api/warehouses");
       console.log(data);
       setWarehouses(data);
     } catch (error) {
       console.error(error);
     }
  }
  
  useEffect(() => {
    getWarehouses()
  }, [])

  return (
    <section>
      <div className="layout warehouses__container">
        {/* Warehouse title and buttons */}
        <div className="warehouses__heading-and_buttons">
        <h1 className="warehouses__title">Warehouses</h1>
        <div className="warehouses__buttons">
        <Search />
        <AddButton text="+ Add New Warehouse" path="/warehouse/add" />
        </div>
        </div>
        {/* Warehouse LIst Header */}
        <WarehouseListHeader />
        <WarehousesList warehouses={warehouses}/>
      </div>
     
    </section>
  )
}

export default WarehousePage
