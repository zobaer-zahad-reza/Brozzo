import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import router from "./Routes/Router";
import { RouterProvider } from "react-router-dom";
import './Utility/i18n';
import ShopContextProvider from "./Context/ShopContext";



createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
