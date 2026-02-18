import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import ShopContextProvider from "./Context/ShopContext";
import WhatsAppButton from "./Components/WhatsAppButton";

function App() {
  return (
    <ShopContextProvider>
      {/* min-h-screen & flex-col ensures Footer stays at bottom */}
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <ScrollToTop />
        <WhatsAppButton />

        <main className="flex-grow pt-28 md:pt-36 pb-20 w-full px-2 md:px-0">
          <Outlet />
        </main>

        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default App;
