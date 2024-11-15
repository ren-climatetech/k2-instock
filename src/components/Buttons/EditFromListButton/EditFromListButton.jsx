import { Link } from "react-router-dom";
import "./EditFromListButton.scss";
import editIcon from "../../../assets/icons/edit-24px.svg"

const EditFromListButton = ({path}) => {
  return (
    <Link to={path} className="edit-link">
      <img src={editIcon} alt="edit icon"/>
    </Link>
  );
};

export default EditFromListButton;
