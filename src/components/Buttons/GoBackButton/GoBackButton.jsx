import React from "react";
import { Link } from "react-router-dom";
import ArrowBack from "../../../assets/icons/arrow_back-24px.svg"
import "../GoBackButton/GoBackButton.scss"

const GoBackButton = ({path}) => {
  
    return (
      <Link to={path} className="go-back-button">
      <img src={ ArrowBack } alt="go back icon" />
    </Link>
  );
};

export default GoBackButton;
