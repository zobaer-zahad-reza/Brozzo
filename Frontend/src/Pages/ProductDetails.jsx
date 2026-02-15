import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  ArrowLeft,
  Star,
} from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency, addToCart } = useContext(ShopContext);

  // --- STATIC DEMO DATA FOR BROZZO ---
  const demoProduct = {
    _id: "1",
    name: "Midnight Chronograph XL",
    category: "Watches",
    price: 150,
    offerPrice: 120,
    description:
      "<p>The Midnight Chronograph XL is a masterpiece of dark elegance. Featuring a matte black finish, sapphire crystal glass, and a premium leather strap, it's designed for those who command the night.</p><ul><li>Matte Black Stainless Steel</li><li>Genuine Italian Leather</li><li>Quartz Movement</li></ul>",
    image: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
  };

  const [product, setProduct] = useState(demoProduct);
  const [mainImage, setMainImage] = useState(demoProduct.image[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [size, setSize] = useState("");

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes && product.sizes.length > 0 && !size) {
      toast.error("Please select a size");
      return;
    }
    toast.success("Added to Cart!");
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !size) {
      toast.error("Please select a size");
      return;
    }
    navigate("/place-order");
  };

  return (
    <div className="bg-black min-h-screen py-8 md:py-12 px-4 md:px-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#FF4955] mb-8 flex items-center gap-2 transition-all group font-medium"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image Section */}
          <div className="flex flex-col gap-5">
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#111113] border border-zinc-800 relative shadow-2xl">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.image.map((imgSrc, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(imgSrc)}
                  className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    mainImage === imgSrc
                      ? "border-[#FF4955] scale-95 shadow-[0_0_15px_rgba(255,73,85,0.3)]"
                      : "border-zinc-800 opacity-50 hover:opacity-100 hover:border-zinc-600"
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="bg-[#FF4955]/10 text-[#FF4955] px-4 py-1.5 rounded-full text-xs font-black tracking-[2px] uppercase border border-[#FF4955]/20">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mt-5 leading-tight tracking-tight uppercase">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-5">
              <h2 className="text-4xl font-black text-white uppercase">
                {currency || "$"}
                {product.offerPrice || product.price}
              </h2>
              {product.offerPrice && (
                <div className="flex items-center gap-3">
                  <span className="text-xl text-zinc-600 line-through decoration-zinc-700">
                    {currency || "$"}
                    {product.price}
                  </span>
                  <span className="bg-white text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase">
                    -
                    {Math.round(
                      ((product.price - product.offerPrice) / product.price) *
                        100,
                    )}
                    %
                  </span>
                </div>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div className="space-y-4">
                <p className="font-bold text-white uppercase text-xs tracking-widest">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`h-12 w-16 border-2 rounded-xl font-black transition-all duration-300 active:scale-90 ${
                        item === size
                          ? "border-[#FF4955] bg-[#FF4955] text-white"
                          : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="h-[1px] bg-zinc-900 w-full" />

            {/* Action Section (Updated Button Container) */}
            <div className="flex flex-col gap-5 w-full">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border-2 border-zinc-800 rounded-2xl bg-[#111113] p-1 h-14 w-full sm:w-40">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="text-center font-black text-xl text-white select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Main Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full h-auto sm:h-14">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-zinc-800 text-white px-6 py-4 sm:py-0 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] uppercase text-xs tracking-widest"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#FF4955] text-white px-6 py-4 sm:py-0 rounded-2xl font-bold hover:bg-[#e63e49] transition-all active:scale-[0.98] uppercase text-xs tracking-widest shadow-lg shadow-[#ff49551c]"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Badge
                icon={<Truck size={20} />}
                title="Fast Delivery"
                desc="2-3 Days"
              />
              <Badge
                icon={<ShieldCheck size={20} />}
                title="Secure Pay"
                desc="100% SSL"
              />
              <Badge
                icon={<RefreshCw size={20} />}
                title="Easy Return"
                desc="7 Days"
              />
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="mt-20 border border-zinc-900 rounded-[32px] overflow-hidden bg-[#111113]">
          <div className="flex border-b border-zinc-900 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-10 py-5 text-xs font-black uppercase tracking-[3px] transition-all whitespace-nowrap ${
                activeTab === "description"
                  ? "bg-black text-[#FF4955]"
                  : "text-zinc-600 hover:text-zinc-300"
              }`}
            >
              Description
            </button>
          </div>
          <div className="p-8 md:p-12">
            <div
              className="max-w-4xl mx-auto text-zinc-400 leading-relaxed prose prose-invert prose-red"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 p-4 bg-[#111113] rounded-2xl border border-zinc-900">
    <div className="text-[#FF4955] shrink-0">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-white uppercase tracking-wider">
        {title}
      </p>
      <p className="text-[10px] text-zinc-600 mt-1">{desc}</p>
    </div>
  </div>
);

export default ProductDetails;
