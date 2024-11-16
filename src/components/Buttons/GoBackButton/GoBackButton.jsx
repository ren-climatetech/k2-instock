import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../../assets/icons/arrow_back-24px.svg"
import "../GoBackButton/GoBackButton.scss"

const GoBackButton = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate("/warehouses"); // Redirect to the homepage
    };
  
    return (
      <button className="go-back-button" onClick={handleGoBack}>
        <img src={ArrowBack} alt="Arrow Go Back" />
      </button>
    );
  };

export default GoBackButton;
