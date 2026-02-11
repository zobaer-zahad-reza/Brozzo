import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import PrivacyNotice from "../Components/PrivacyNotice";
import Contact from "../Pages/Contact";
import Blog from "../Pages/Blog";
import Collection from "../Pages/Collection";
import AboutUs from "../Pages/AboutUs";
import OurTeam from "../Pages/OurTeam";
import ErrorPage from "../Pages/ErrorPage";
import ProductDetails from "../Pages/ProductDetails";
import Login from "../Pages/Login";
import Cart from "../Pages/Cart";
import SignUp from "../Pages/SignUp";
import ForgotPassword from "../Pages/ForgotPass";
import Profile from "../Pages/Profile";
import PlaceOrder from "../Pages/PlaceOrder";
import Orders from "../Pages/Orders";


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
        path:'/privacy-notice',
        // element: <PrivacyNotice />
      },
      {
        path:'/contact',
        // element: <Contact />
      },
      {
        path:'/collection',
        // element: <Collection />
      },
      {
        path:'/about-us',
        // element: <AboutUs />
      },
      {
        path:'/product/:id',
        // element: <ProductDetails />
      },
      {
        path:'/login',
        // element: <Login />
      },
      {
        path:'/cart',
        // element: <Cart />
      },
      {
        path:'/signup',
        // element: <SignUp />
      },
      {
        path:'/forgot-password',
        // element: <ForgotPassword />
      },
      {
        path:'/profile',
        // element: <Profile />
      },
      {
        path:"/place-order",
        // element: <PlaceOrder />
      },
      {
        path: "/orders",
        // element: <Orders />
      }
    ]
  }
]);

export default router;
