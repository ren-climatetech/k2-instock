import "../AddSubmitButton/AddSubmitButton.scss";

const AddSubmitButton= ({ text }) => {
  return <button type="submit" className="add-submit-button">{text}</button>;
};

export default AddSubmitButton;