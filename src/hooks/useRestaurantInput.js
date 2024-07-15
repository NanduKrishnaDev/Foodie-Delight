import { useReducer } from "react";

export const useRestaurantInput = () => {
  // Initial state
  const initialState = {
    values: {
      name: "",
      description: "",
      locationUrl: "",
      rating: "",
      cuisines: "",
    },
    errors: {
      name: "",
      description: "",
      locationUrl: "",
      rating: "",
      cuisines: "",
    },
  };

  // Reducer function
  const reducer = (state, action) => {
    switch (action.type) {
      case `SET_VALUE`:
        return {
          ...state,
          values: {
            ...state.values,
            [action.payload.field]: action.payload.value,
          },
        };
      case "SET_ERROR":
        return {
          ...state,
          errors: {
            ...state.errors,
            [action.payload.field]: action.payload.value,
          },
        };
      case "RESET":
        return initialState;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
