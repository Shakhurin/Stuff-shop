import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Home } from "./pages/Home/home";
import { SingleProduct } from "./pages/SingleProduct/singleProduct";
import { Profile } from "./pages/Profile/profile";
import { CategoryPage } from "./pages/CategoryPage/categoryPage";
import { Cart } from "./pages/Cart/cart";
import { Favourites } from "./pages/Favourites/favourites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/categories/:id",
        element: <CategoryPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favourite",
        element: <Favourites />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
