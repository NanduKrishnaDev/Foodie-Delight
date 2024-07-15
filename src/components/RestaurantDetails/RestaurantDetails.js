import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useResponsive } from "../../hooks/useResponsive";
import { initialAdd, remove } from "./../../redux/restaurant/restaurantSlice";
import restaurants from "./../../Restaurants";
import MenuCard from "../MenuCard/MenuCard";
import starIcon from "./../../assets/icons/star.png";
import deleteIcon from "./../../assets/icons/delete.png";
import editIcon from "./../../assets/icons/edit.png";
import locationIcon from "./../../assets/icons/location-pin.png";
import Button from "../../reusers/Button/Button";
import Loading from "../../reusers/Loading/Loading";
import "./RestaurantDetails.scss";

const RestaurantDetails = () => {
  const { breakPoints } = useResponsive();
  const restaurantsList = useSelector((state) => state.restaurants);
  const { resId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    if (restaurantsList.length === 0) {
      // Adding a set time out of 1 second to mock the API fetch effect
      setTimeout(() => {
        dispatch(initialAdd(restaurants));
      }, 1000);
    }
  }, [restaurantsList]);

  useEffect(() => {
    if (restaurantsList.length !== 0) {
      const restaurant = restaurantsList?.filter(
        (res) => res.id === parseInt(resId, 10)
      );
      if (restaurant?.length === 0) navigate("/");
      setRestaurant(restaurant[0]);
    }
  }, [restaurantsList, resId]);

  const cuisineString = restaurant?.cuisines?.join("  ,  ");

  const deleteRes = () => {
    dispatch(remove(restaurant?.id));
    navigate("/");
    toast.success("Restaurant deleted successfully!", {
      position: "top-right",
    });
  };

  const modifyRes = () => {
    navigate(`/restaurant/${restaurant.id}/modify`);
  };

  if (restaurantsList.length === 0) return <Loading />;
  else {
    return (
      <div className="details-wrapper">
        <div
          className={`${
            breakPoints.md ? "details-container-md" : ""
          } details-container`}
        >
          <div className="details-title">{restaurant?.name}</div>
          <div className="details-card">
            <div className="details-card-location">
              <img
                src={locationIcon}
                alt="navigation"
                onClick={() => window.open(restaurant?.locationUrl)}
              />
              <div className="details-card-time">
                Reaches your destination within {restaurant?.deliveryTime} mins!
              </div>
            </div>
            <div className="details-card-rating-wrapper">
              <div className="card-rating">
                <img src={starIcon} alt="icon" />
                <div className="card-rating-number">{restaurant?.rating}</div>
              </div>
              <div className="details-card-cost">
                ₹{restaurant?.lowestPrice} FOR TWO
              </div>
            </div>
            <div className="details-card-description">
              {restaurant?.description}
            </div>
            <div className="details-card-cuisines">{cuisineString}</div>
            <div className="details-button-wrapper">
              <Button icon={deleteIcon} onClick={deleteRes} label="Delete" />
              <div className="details-button-filler"></div>
              <Button
                icon={editIcon}
                onClick={modifyRes}
                label="Modify"
                green
              />
            </div>
          </div>
          <div
            className={`${
              breakPoints.xs ? "details-menu-listing-xs" : ""
            } details-menu-listing`}
          >
            Menu Listing
          </div>
          <div className="menu-listing-wrapper">
            {restaurant?.menu?.map((menu) => (
              <MenuCard menu={menu} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default RestaurantDetails;
