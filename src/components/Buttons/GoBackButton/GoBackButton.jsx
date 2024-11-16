import { Link } from "react-router-dom";
import "./GoBackButton.scss";
import arrowBack from "../../../assets/icons/arrow_back-24px.svg";

const GoBackButton = ({ path }) => {
  return (
    <Link to={path} className="go-back-button">
      <img src={arrowBack} alt="go back icon" />
    </Link>
  );
};

export default GoBackButton;
