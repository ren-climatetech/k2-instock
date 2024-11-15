import { Link } from "react-router-dom";
import "./WarehousesList.scss";
import DeleteFromListButton from "../Buttons/DeleteFromListButton.js/DeleteFromListButton";
import EditFromListButton from "../Buttons/EditFromListButton/EditFromListButton";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg"

const WarehousesList = ({ warehouses }) => {
  return (
    <ul className="warehouses__list">
      {warehouses.map(
        ({
          id,
          warehouse_name,
          address,
          city,
          contact_email,
          contact_phone,
        }) => {
          return (
            <li key={id} className="warehouses__item">
                  <div className="warehouses__info-link">
                <div className="warehouses__content">
                  <span className="warehouses__label">Warehouse</span>
                  <Link to={`/warehouse/${id}`} className="warehouses__warehouse">
                    {warehouse_name}
                    <img
                      src={chevronIcon}
                      alt="arrow icon"
                      className="warehouses__warehouse-icon"
                    />
                  </Link>
                </div>
                <div className="warehouses__content warehouses__content-address">
                  <span className="warehouses__label">address</span>
                  <p className="warehouses__address">{address}</p>
                </div>
                <div className="warehouses__content">
                  <span className="warehouses__label">contact name</span>
                  <p> {city}</p>
                </div>
                <div className="warehouses__content warehouses__content-contact">
                  <span className="warehouses__label">contact information</span>
                  <p>{contact_phone}</p>
                  <p>{contact_email}</p>
                </div>
              </div>
              <div className="action-buttons">
                <DeleteFromListButton />
                <EditFromListButton path="/warehouse/:itemId/edit"/>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default WarehousesList;
