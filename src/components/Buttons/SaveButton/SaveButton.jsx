import "./SaveButton.scss";

const SaveButton = ({onClick}) => {
    return (
        <button className="save-button" onClick={onClick}>
            Save
        </button>
    )
}

export default SaveButton