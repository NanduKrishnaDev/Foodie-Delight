import { useState } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigate } from "react-router-dom";
import deliveryIcon from "./../../assets/icons/delivery.png";
import deliveryHoverIcon from "./../../assets/icons/delivery-hover.png";
import addIcon from "./../../assets/icons/add.png";
import cartIcon from "./../../assets/icons/shopping-cart.png";
import searchIcon from "./../../assets/icons/loupe.png";
import "./Header.scss";

const Header = () => {
  const { breakPoints } = useResponsive();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(deliveryIcon);

  const goToListing = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div
          onMouseEnter={() => {
            setLogo(deliveryHoverIcon);
          }}
          onMouseLeave={() => {
            setLogo(deliveryIcon);
          }}
          onClick={goToListing}
        >
          <img
            src={logo}
            alt="logo"
            className={`${breakPoints.md ? "logo-md" : ""} logo`}
          />
        </div>
        <div
          className={`${breakPoints.sm ? "header-right-sm" : ""} header-right`}
          onClick={() => navigate("restaurant/add")}
        >
          <div
            className={`${
              breakPoints.md ? "header-items-md" : ""
            } header-items`}
          >
            <img src={addIcon} alt="icon" />
            <div>Add</div>
          </div>
          <div
            className={`${
              breakPoints.md ? "header-items-md" : ""
            } header-items`}
          >
            <img src={cartIcon} alt="icon" />
            <div>Cart</div>
          </div>
          <div
            className={`${
              breakPoints.md ? "header-items-md" : ""
            } header-items`}
          >
            <img src={searchIcon} alt="icon" />
            <div>Search</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
