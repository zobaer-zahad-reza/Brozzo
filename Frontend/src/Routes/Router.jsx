import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import PrivacyPolicy from "../Pages/PrivacyPolicy";

const Home = lazy(() => import("../Pages/Home"));
const Contact = lazy(() => import("../Pages/Contact"));
const Blog = lazy(() => import("../Pages/Blog"));
const Collection = lazy(() => import("../Pages/Collection"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));
const ProductDetails = lazy(() => import("../Pages/ProductDetails"));
const Login = lazy(() => import("../Pages/Login"));
const Cart = lazy(() => import("../Pages/Cart"));
const SignUp = lazy(() => import("../Pages/SignUp"));
const ForgotPassword = lazy(() => import("../Pages/ForgotPass"));
const Profile = lazy(() => import("../Pages/Profile"));
const PlaceOrder = lazy(() => import("../Pages/PlaceOrder"));
const Orders = lazy(() => import("../Pages/Orders"));
const ResetPassword = lazy(() => import("../Pages/ResetPassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/product/:name/:id",
        element: <ProductDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/place-order",
        element: <PlaceOrder />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
