import React from "react";
import MarqueeAdmin from "../../Components/MarqueeAdmin";
import SliderAdmin from "../../Components/SliderAdmin";
import CategoryCarouselAdmin from "../../Components/CategoryCarouselAdmin";
import PromoBentoGridAdmin from "../../Components/PromoBentoGridAdmin";

const HomePageE = ({ token, backendUrl }) => {
  return (
    <div className="w-full">

      <MarqueeAdmin token={token} backendUrl={backendUrl} />
      
      <SliderAdmin token={token} backendUrl={backendUrl} />

      <CategoryCarouselAdmin token={token} backendUrl={backendUrl} />

      <PromoBentoGridAdmin token={token} backendUrl={backendUrl} />

    </div>
  );
};

export default HomePageE;