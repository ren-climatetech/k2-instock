import { Link } from "react-router-dom";
import "./AddLinkButton.scss";

const AddLinkButton= ({ text, path }) => {
  return <Link to={path} className="add-link">{text}</Link>;
};

export default AddLinkButton;
