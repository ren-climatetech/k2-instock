import DeleteItemButton from "../Buttons/DeleteItemButton/DeleteItemButton";
import CancelButton from "../Buttons/CancelButton/CancelButton";
import "./DeleteModal.scss";
import CloseButton from "../Buttons/CloseButton/CloseButton";

const DeleteModal = ({ isOpen, onClose, onDelete, itemName, category }) => {
  if (!isOpen) return null;

  function toPlural(word) {
    if (word.endsWith('y')) {
      return word.slice(0, -1) + 'ies';
    } else if (word.endsWith('s')) {
      return word + 'es';
    } else {
      return word + 's';
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
        <CloseButton onClick={onClose} />
        <h2 className="modal__title">{`Delete ${itemName} ${category}?`}</h2>
        <p className="modal__text">{`Please confirm that you’d like to delete the ${itemName} from the list of ${toPlural(category)}. You won’t be able to undo this action.`}</p>
       </div>
        <div className="modal__buttons-container">
          <DeleteItemButton onClick={onDelete} />
          <CancelButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
