import { useResponsive } from "../../hooks/useResponsive";
import "./MenuCard.scss";

const MenuCard = ({ menu }) => {
  const baseUrl =
    "https://res.cloudinary.com/ddu2xft2h/image/upload/t_Banner 16:9/";

  const { breakPoints } = useResponsive();

  return (
    <div
      className={`${
        breakPoints.xs ? "menu-card-wrapper-sm" : ""
      } menu-card-wrapper`}
    >
      <div className="menu-card-content-wrapper" data-testid="wrapper">
        <div className="menu-card-name">{menu?.name}</div>
        <div className="menu-card-price">₹{menu?.price}</div>
        <div className="menu-card-description">{menu?.description}</div>
      </div>
      <img src={`${baseUrl}${menu?.cloudinaryUrl}`} className="card-image" />
    </div>
  );
};

export default MenuCard;
