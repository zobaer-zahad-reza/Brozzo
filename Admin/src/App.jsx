import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./Pages/AddProduct";
import Orders from "./Pages/Orders";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
import ListProduct from "./Pages/ListProduct";
import HomePageE from "./Pages/SubPages/HomePageE";
import OurTeamPageE from "./Pages/SubPages/OurTeamPageE";
import FooterInfo from "./Pages/SubPages/FooterInfo";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {token === "" ? (
        <Login setToken={setToken} backendUrl={backendUrl} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route
                  path="/list"
                  element={
                    <ListProduct token={token} backendUrl={backendUrl} />
                  }
                />
                <Route
                  path="/orders"
                  element={<Orders token={token} backendUrl={backendUrl} />}
                />
                <Route
                  path="/edit-home-page"
                  element={<HomePageE token={token} backendUrl={backendUrl} />}
                />
                <Route path="/edit-team" element={<OurTeamPageE token={token} backendUrl={backendUrl} />} />
                {/* <Route path="/edit-footer" element={<FooterInfo token={token} backendUrl={backendUrl} />} /> */}
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
