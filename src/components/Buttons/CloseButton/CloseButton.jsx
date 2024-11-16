import "./CloseButton.scss";
import closeicon from "../../../assets/icons/close-24px.svg"

const CloseButton = ({onClick}) => {
    return (
        <button onClick={onClick} className="close-button">
            <img src={closeicon} alt="close icon"/>
        </button>
    )
}

export default CloseButton;