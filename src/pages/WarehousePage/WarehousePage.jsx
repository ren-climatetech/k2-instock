import TextButton from "../../components/Buttons/AddButton/AddButton";
import Search from "../../components/Search/Search";
import "./WarehousePage.scss";

function WarehousePage() {
  return (
    <section>
      <div className="layout warehouses__container">
        <div className="warehouses__heading-and_buttons">
        <h1 className="warehouses__title">Warehouses</h1>
        <div className="warehouses__buttons">
        <Search />
        <TextButton text="+ Add New Warehouse" />
        </div>
        </div>
      </div>
    </section>
  )
}

export default WarehousePage
