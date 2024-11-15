import { Link } from "react-router-dom";
import "./InventoryList.scss";
import DeleteFromListButton from "../Buttons/DeleteFromListButton.js/DeleteFromListButton";
import EditFromListButton from "../Buttons/EditFromListButton/EditFromListButton";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";

const InventoryList = ({ inventories }) => {
  return (
    <ul className="inventories__list">
      {inventories.map(
        ({
          id,
          warehouse_name,
          item_name,
          description,
          category,
          status,
          quantity,
        }) => {
          return (
            <li key={id} className="inventories__item">
              <div className="inventories__info-link">
                <div className="inventories__content">
                  <span className="inventories__label">Inventory Item</span>
                  <Link
                    to={`/inventories/${id}`}
                    className="inventories__inventory"
                  >
                    {item_name}
                    <img
                      src={chevronIcon}
                      alt="arrow icon"
                      className="inventories__inventory-icon"
                    />
                  </Link>
                </div>
                <div className="inventories__content inventories__content-category">
                  <span className="inventories__label">Category</span>
                  <p className="inventories__address">{category}</p>
                </div>
                <div className="inventories__content">
                  <span className="inventories__label">Status</span>
                  <span
                    className={`inventories__content ${
                      status.toLowerCase() === "in stock"
                        ? "inventories__content in-stock"
                        : "inventories__content out-of-stock"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <div className="inventories__content inventories__content-quantity">
                  <span className="inventories__label">Quantity</span>
                  <p>{quantity}</p>
                </div>
                <div className="inventories__content inventories__content-name">
                  <span className="inventories__label">Warehouse name</span>
                  <p>{warehouse_name}</p>
                </div>
              </div>
              <div className="action-buttons">
                <DeleteFromListButton />
                <EditFromListButton path="/warehouse/:itemId/edit" />
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default InventoryList;
