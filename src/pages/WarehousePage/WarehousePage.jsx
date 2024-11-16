
import Search from "../../components/Search/Search";
import WarehouseListHeader from "../../components/WarehouseListHeader/WarehouseListHeader";
import "./WarehousePage.scss";

import WarehousesList from "../../components/WarehousesList/WarehousesList";
import AddLinkButton from "../../components/Buttons/AddLinkButton/AddLinkButton";


function WarehousePage() {

  return (
    <section>
      <div className="layout warehouses__container">
        {/* Warehouse title and buttons */}
        <div className="warehouses__heading-and_buttons">
        <h1 className="warehouses__title">Warehouses</h1>
        <div className="warehouses__buttons">
        <Search />
        <AddLinkButton text="+ Add New Warehouse" path="/warehouse/add" />
        </div>
        </div>
        {/* Warehouse LIst Header */}
        <WarehouseListHeader />
        <WarehousesList />
      </div>
    </section>
  )
}

export default WarehousePage
