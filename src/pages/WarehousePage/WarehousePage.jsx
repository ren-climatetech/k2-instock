import AddButton from "../../components/Buttons/AddButton/AddButton";
import Search from "../../components/Search/Search";
import WarehouseListHeader from "../../components/WarehouseListHeader/WarehouseListHeader";
import "./WarehousePage.scss";

function WarehousePage() {
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
      </div>
     
    </section>
  )
}

export default WarehousePage
