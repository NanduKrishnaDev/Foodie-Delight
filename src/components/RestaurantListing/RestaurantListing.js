import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "../../hooks/useResponsive";
import RestaurantCard from "./../RestaurantCard/RestaurantCard";
import Loading from "../../reusers/Loading/Loading";
import restaurants from "./../../Restaurants";
import { initialAdd } from "./../../redux/restaurant/restaurantSlice";
import "./RestaurantListing.scss";

const RestaurantListing = () => {
  const { breakPoints } = useResponsive();

  const restaurantsList = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantsList.length === 0) {
      // Adding a set time out of 1 second to mock the API fetch effect
      setTimeout(() => {
        dispatch(initialAdd(restaurants));
      }, 1000);
    }
  }, []);

  if (restaurantsList.length === 0) return <Loading />;
  else {
    return (
      <div
        className={`${breakPoints.md ? "list-wrapper-md" : ""} list-wrapper`}
      >
        {restaurantsList.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    );
  }
};

export default RestaurantListing;
