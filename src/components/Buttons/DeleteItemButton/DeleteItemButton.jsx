import "./DeleteItemButton.scss";


const DeleteItemButton = ({onClick}) => {
  return (
    <button onClick={onClick} className="delete">
         Delete
    </button>
  );
};

export default DeleteItemButton;
