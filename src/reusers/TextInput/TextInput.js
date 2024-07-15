import { useResponsive } from "../../hooks/useResponsive";
import "./TextInput.scss";

const TextInput = ({
  label,
  text,
  error,
  dispatch,
  field,
  textArea = false,
  placeholder,
}) => {
  const { breakPoints } = useResponsive();

  const ratingValidation = (value) => {
    const regex = /^([0-4](\.\d)?|5(\.0)?)$/;
    if (!regex.test(value)) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "rating", value: "Enter a valid rating" },
      });
    } else {
      dispatch({ type: "SET_ERROR", payload: { field: "rating", value: "" } });
    }
  };

  const validateLocationUrl = (url) => {
    try {
      new URL(url);
      dispatch({
        type: "SET_ERROR",
        payload: { field: "locationUrl", value: "" },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "locationUrl", value: "Enter a valid location URL" },
      });
    }
  };

  const handleChange = (event) => {
    dispatch({
      type: "SET_VALUE",
      payload: { field: field, value: event.target.value },
    });
    if (event.target.value.length === 0) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: field, value: `Enter a valid ${label}` },
      });
    } else {
      if (field === "rating") ratingValidation(event.target.value);
      else if (field === "locationUrl") validateLocationUrl(event.target.value);
      else
        dispatch({ type: "SET_ERROR", payload: { field: field, value: "" } });
    }
  };

  return (
    <div className="text-input-container">
      <label htmlFor="textInput" className="text-input-label">
        {label}
      </label>
      {textArea ? (
        <textarea
          rows={5}
          id="textArea"
          className={`text-area-field ${error ? "error" : ""} ${
            breakPoints.xsm ? "text-area-field-xsm" : ""
          }`}
          value={text}
          placeholder={placeholder}
          onChange={handleChange}
          maxLength={500}
          data-testid={label}
        />
      ) : (
        <input
          type="text"
          id="textInput"
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          className={`text-input-field ${error ? "error" : ""} ${
            breakPoints.xsm ? "text-input-field-xsm" : ""
          }`}
          maxLength={100}
          data-testid={label}
        />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TextInput;
