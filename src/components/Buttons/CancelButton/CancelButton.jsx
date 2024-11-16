import "./CancelButton.scss";

const CancelButton = ({onClick}) => {
    return (
        <button className="cancel-button" onClick={onClick}>
            Cancel
        </button>
    )
}

export default CancelButton