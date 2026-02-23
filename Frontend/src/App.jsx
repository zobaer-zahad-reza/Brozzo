import React, { Suspense } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import ShopContextProvider from "./Context/ShopContext";
import WhatsAppButton from "./Components/WhatsAppButton";
// import ReactGA from 'react-ga';

const LoadingScreen = () => (
  <div className="flex justify-center items-center h-[60vh] w-full">
    <div className="w-12 h-12 border-4 border-[#FF4955] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  // ReactGA.initialize('UA-000000-01');
  
  const navigation = useNavigation();

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

        <main className="flex-grow pt-28 md:pt-28 pb-20 w-full px-2 md:px-0">
          {navigation.state === "loading" ? (
            <LoadingScreen />
          ) : (
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          )}
        </main>

        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default App;