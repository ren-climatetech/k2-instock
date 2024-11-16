import DeleteItemButton from "../Buttons/DeleteItemButton/DeleteItemButton";
import CancelButton from "../Buttons/CancelButton/CancelButton";
import "./DeleteModal.scss";
import CloseButton from "../Buttons/CloseButton/CloseButton";

const DeleteModal = ({ isOpen, onClose, onDelete, itemName, category }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <CloseButton onClick={onClose} />
        <h2>{`Delete ${itemName} ${category}`}</h2>
        <p>{`Please confirm that you’d like to delete the ${itemName} from the list of ${category}. You won’t be able to undo this action.`}</p>
        <div className="modal__buttons-container">
          <DeleteItemButton onClick={onDelete} />
          <CancelButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
