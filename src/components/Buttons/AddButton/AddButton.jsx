import { Link } from "react-router-dom";
import "./AddButton.scss";

const AddButton= ({ text, path }) => {
  return <Link to={path} className="add-link">{text}</Link>;
};

export default AddButton;
