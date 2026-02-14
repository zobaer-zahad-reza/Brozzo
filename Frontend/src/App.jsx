import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import SocialSideNav from "./Components/SocialSideNav";
import ShopContextProvider from "./Context/ShopContext";
import WhatsAppButton from "./Components/WhatsAppButton";

function App() {
  return (
    <ShopContextProvider>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <ScrollToTop />
        {/* <SocialSideNav /> */}

        <WhatsAppButton />

        <div className="min-h-screen pt-32">
          <Outlet />
        </div>

        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default App;
