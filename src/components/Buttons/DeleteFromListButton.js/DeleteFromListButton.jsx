import "./DeleteFromListButton.scss";
import deleteIcon from "../../../assets/icons/delete_outline-24px.svg"

const DeleteFromListButton = ({onClick}) => {
  return (
    <button onClick={onClick} className="delete-button">
          <img src={deleteIcon} alt="delete icon" />
    </button>
  );
};

export default DeleteFromListButton;
