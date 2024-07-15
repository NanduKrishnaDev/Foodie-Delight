import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResponsive } from "../../hooks/useResponsive";
import { useRestaurantInput } from "../../hooks/useRestaurantInput";
import TextInput from "../../reusers/TextInput/TextInput";
import addIcon from "./../../assets/icons/add.png";
import editIcon from "./../../assets/icons/edit.png";
import Button from "../../reusers/Button/Button";
import restaurants, { restaurantPlaceHolder } from "../../Restaurants";
import {
  initialAdd,
  add,
  modify,
} from "./../../redux/restaurant/restaurantSlice";
import "./AddRestaurant.scss";

const AddRestaurant = () => {
  const { breakPoints } = useResponsive();
  const { state, dispatch } = useRestaurantInput();
  const navigate = useNavigate();
  const { resId } = useParams();
  const restaurantsList = useSelector((state) => state.restaurants);
  const reduxDispatch = useDispatch();

  const loadInitialValues = (res) => {
    Object.entries(state?.values).map(([field, value]) => {
      if (field !== "cuisines" && !!res[field]) {
        dispatch({
          type: "SET_VALUE",
          payload: { field: field, value: res[field] },
        });
      }
    });

    const cuisines = res?.cuisines?.join(", ");
    dispatch({
      type: "SET_VALUE",
      payload: { field: "cuisines", value: cuisines },
    });
  };

  useEffect(() => {
    if (restaurantsList?.length === 0) {
      reduxDispatch(initialAdd(restaurants));
    }
  }, [restaurantsList]);

  useEffect(() => {
    if (restaurantsList?.length !== 0 && !!resId) {
      let restaurant = restaurantsList?.filter(
        (res) => res?.id === resId * 1
      )[0];
      loadInitialValues(restaurant);
    }
    if (!resId) {
      dispatch({
        type: "RESET",
      });
    }
  }, [restaurantsList, resId]);

  const check = () => {
    let value = false;

    Object.entries(state?.values).map(([field, val]) => {
      if (!val) {
        dispatch({
          type: "SET_ERROR",
          payload: { field: field, value: `Enter a valid ${field}` },
        });
        value = true;
      }
    });
    return !value;
  };

  const modifyRes = () => {
    const checkValidations = Object.values(state?.errors).every(
      (value) => value.trim() === ""
    );

    const checkEmpty = check();

    if (checkValidations && checkEmpty) {
      const restaurant = {
        ...restaurantsList?.filter((res) => res?.id === resId * 1)[0],
      };
      Object.entries(state?.values).map(([field, value]) => {
        if (field !== "cuisines") restaurant[field] = value;
      });

      const cuisines = state.values.cuisines
        .split(",")
        .filter((cuisine) => cuisine !== "");

      restaurant.cuisines = cuisines;
      reduxDispatch(modify({ id: resId, restaurant }));
      navigate("/");
      toast.success("Restaurant modified successfully!", {
        position: "top-right",
      });
    }
  };

  const addRes = () => {
    const checkValidations = Object.values(state?.errors).every(
      (value) => value.trim() === ""
    );

    const checkEmpty = check();

    if (checkValidations && checkEmpty) {
      const restaurant = restaurantPlaceHolder;

      Object.entries(state?.values).map(([field, value]) => {
        if (field !== "cuisines") restaurant[field] = value;
      });

      const cuisines = state.values.cuisines
        .split(",")
        .filter((cuisine) => cuisine !== "");

      restaurant.id = restaurantsList.length + 1;
      restaurant.cuisines = cuisines;
      reduxDispatch(add(restaurant));
      navigate("/");
      toast.success("Restaurant added successfully!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="add-wrapper">
      <div
        className={`${breakPoints.md ? "add-container-md" : ""} ${
          breakPoints.lg ? "add-container-lg" : ""
        } add-container`}
      >
        <div className="add-title">Add Restaurant and feed the hungry!</div>
        <div className="add-card">
          <div className="add-card-input-wrapper">
            <div className="add-card-input-sub-wrapper">
              <TextInput
                label="name"
                text={state?.values?.name}
                error={state?.errors?.name}
                dispatch={dispatch}
                field="name"
                placeholder="McDonalds"
              />
            </div>
            <div className="add-card-input-sub-wrapper">
              <TextInput
                label="location URL"
                text={state?.values?.locationUrl}
                error={state?.errors?.locationUrl}
                dispatch={dispatch}
                field="locationUrl"
                placeholder="Google maps URL"
              />
            </div>
            <div className="add-card-input-sub-wrapper">
              <TextInput
                label="rating"
                text={state?.values?.rating}
                error={state?.errors?.rating}
                dispatch={dispatch}
                field="rating"
                placeholder="4.5"
              />
            </div>
            <div className="add-card-input-sub-wrapper">
              <TextInput
                label="cuisines"
                text={state?.values?.cuisines}
                error={state?.errors?.cuisines}
                dispatch={dispatch}
                field="cuisines"
                placeholder="Continental, Healthy Food, North Indian"
              />
            </div>
            <div className="add-card-input-sub-wrapper-alone">
              <TextInput
                label="description"
                textArea
                text={state?.values?.description}
                error={state?.errors?.description}
                dispatch={dispatch}
                field="description"
                placeholder="Enter description within 250 chars"
              />
            </div>
          </div>
        </div>
        <div className="details-button-wrapper">
          {resId ? (
            <Button icon={editIcon} onClick={modifyRes} label="Modify" green />
          ) : (
            <Button icon={addIcon} onClick={addRes} label="Add" green />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
