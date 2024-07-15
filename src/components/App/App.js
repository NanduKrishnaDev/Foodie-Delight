import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import RestaurantListing from "../RestaurantListing/RestaurantListing";
import Loading from "../../reusers/Loading/Loading";
import NotFound from "../NotFound/NotFound";
import { useResponsive } from "../../hooks/useResponsive";
import { store } from "./../../redux/store";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const RestaurantDetails = lazy(() =>
  import("../RestaurantDetails/RestaurantDetails")
);
const AddRestaurant = lazy(() => import("../AddRestaurant/AddRestaurant"));

function App() {
  const { breakPoints } = useResponsive();

  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        <div className="app-container">
          <Header />
          <div
            className={`${
              breakPoints.md ? "content-container-md" : ""
            } content-container`}
          >
            <Outlet />
          </div>
        </div>
      </Suspense>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RestaurantListing />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantDetails />,
      },
      {
        path: "/restaurant/:resId/modify",
        element: <AddRestaurant />,
      },
      {
        path: "/restaurant/add",
        element: <AddRestaurant />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppProvider = () => <RouterProvider router={appRouter} />;

export default AppProvider;
