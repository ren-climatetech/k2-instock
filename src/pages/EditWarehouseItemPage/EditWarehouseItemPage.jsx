import "./EditWarehouseItemPage.scss";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton/SaveButton";
import axios from "axios";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import React from "react";

function EditWarehouseItemPage() {
  return (
    <>
      <form>
        <div className="editwarehouse__header">
          <img
            src={arrowBack}
            alt="arrow icon"
            className="editinventory__icon-arrow"
          />
          <h1>Edit Warehouse</h1>
        </div>

        <div>
          <h2 className="editwarehouse__header-details">Warehouse Details</h2>
          <div className="editwarehouse__name">
            <h3>Warehouse Name</h3>
            <input className="editwarehouse__entry" type="text"></input>
          </div>
          <div className="editwarehouse__street">
            <h3>Street Address</h3>
            <input className="editwarehouse__entry" type="text"></input>
          </div>
          <div className="editwarehouse__city">
            <h3>City</h3>
            <input className="editwarehouse__entry" type="text"></input>
          </div>
          <div className="editwarehouse__city">
            <h3>City</h3>
            <input className="editwarehouse__entry" type="text"></input>
          </div>
          <div className="editwarehouse__country">
            <h3>Country</h3>
            <input className="editwarehouse__entry" type="text"></input>
          </div>
        </div>

        <div>
          <h2 className="editcontact__header-details">Contact Details</h2>
          <div className="editcontact__name">
            <h3>Warehouse Name</h3>
            <input className="editcontact__entry" type="text"></input>
          </div>
          <div className="editcontact__street">
            <h3>Street Address</h3>
            <input className="editcontact__entry" type="text"></input>
          </div>
          <div className="editcontact__city">
            <h3>City</h3>
            <input className="editcontact__entry" type="text"></input>
          </div>
          <div className="editcontact__city">
            <h3>City</h3>
            <input className="editcontact__entry" type="text"></input>
          </div>
          <div className="editcontact__country">
            <h3>Country</h3>
            <input className="editcontact__entry" type="text"></input>
          </div>
        </div>
        



      </form>
    </>
  );
}

export default EditWarehouseItemPage;
