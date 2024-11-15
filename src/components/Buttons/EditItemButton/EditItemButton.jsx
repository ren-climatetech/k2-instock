import { Link } from "react-router-dom";
import "./EditItemButton.scss";
import editIcon from "../../../assets/icons/edit-white.svg"

const EditItemButton = ({path}) => {
  return (
    <Link to={path} className="edit-button">
          <img src={editIcon} alt="edit icon" />
          <span className="edit-button__text">Edit</span>
    </Link>
  );
};

export default EditItemButton;