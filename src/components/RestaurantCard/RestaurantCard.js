import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hooks/useResponsive";
import starIcon from "./../../assets/icons/star.png";
import "./RestaurantCard.scss";

const RestaurantCard = ({ restaurant }) => {
  const { breakPoints } = useResponsive();
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`restaurant/${restaurant.id}`);
  };

  const baseUrl =
    "https://res.cloudinary.com/ddu2xft2h/image/upload/t_Banner 16:9/";

  const cuisineString = restaurant?.cuisines.join(", ");
  return (
    <div
      className={`${breakPoints.sm ? "card-container-md" : ""} card-container`}
      onClick={goToDetails}
    >
      <img
        src={`${baseUrl}${restaurant?.cloudinaryUrl}`}
        className="card-image"
        alt={`${restaurant?.name} image`}
      />
      <div className="card-content">
        <div className="card-title">{restaurant?.name}</div>
        <div className="card-subtitle">{cuisineString}</div>
        <div className="card-bottom">
          <div className="card-rating">
            <img src={starIcon} alt="rating star" />
            <div className="card-rating-number">{restaurant?.rating}</div>
          </div>
          <div>{restaurant?.deliveryTime} MINS</div>
          <div>{restaurant?.lowestPrice} FOR TWO</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
