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
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import RelatedProducts from "../Components/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, currency, addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.image[0]);

        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        } else {
          setSize("Free Size");
        }
      }
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-sm animate-pulse">
        Loading Product...
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !size) {
      toast.error("Please select a size or variation");
      return;
    }
    const selectedSize = size || "Free Size";
    addToCart(product._id, selectedSize, quantity);
    toast.success(`${product.name} added to bag!`);
  };

  // আপডেট করা Buy Now লজিক (লগইন ছাড়াই Place Order এ যাবে)
  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !size) {
      toast.error("Please select a size or variation");
      return;
    }

    const selectedSize = size || "Free Size";
    const buyNowItem = {
      ...product,
      size: selectedSize,
      quantity: quantity,
    };

    // সরাসরি Place Order পেজে পাঠিয়ে দিচ্ছি
    navigate("/place-order", { state: { buyNowItem } });
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "8801737912273";
    const productUrl = window.location.href;
    let message = `Hello Brozzo,\n\nI would like to order this product:\n*${product.name}*\n`;

    if (size) message += `Size: ${size}\n`;
    message += `Quantity: ${quantity}\nPrice: ${product.offerPrice > 0 ? product.offerPrice : product.price} Tk\n\nLink: ${productUrl}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-black min-h-screen py-8 md:py-12 px-4 md:px-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto pt-20">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#FF4955] mb-8 flex items-center gap-2 transition-all group font-medium"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Images */}
          <div className="flex flex-col gap-5">
            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#111113] border border-zinc-800 relative shadow-2xl">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.image.map((imgSrc, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(imgSrc)}
                  className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border cursor-pointer transition-all ${
                    mainImage === imgSrc
                      ? "border-[#FF4955] scale-95 shadow-[0_0_15px_rgba(255,73,85,0.2)]"
                      : "border-zinc-800 opacity-50 hover:opacity-100"
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

          {/* Details */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="bg-[#FF4955]/10 text-[#FF4955] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[2px] uppercase border border-[#FF4955]/20">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-white mt-5 uppercase">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-5">
              <h2 className="text-3xl font-black text-white">
                {currency}
                {product.offerPrice > 0 ? product.offerPrice : product.price}
              </h2>
              {product.offerPrice > 0 && (
                <span className="text-lg text-zinc-600 line-through">
                  {currency}
                  {product.price}
                </span>
              )}
            </div>

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <p className="font-bold text-zinc-400 uppercase text-xs tracking-widest">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`px-5 py-2.5 border rounded-md font-bold text-sm transition-all ${
                        item === size
                          ? "border-[#FF4955] bg-[#FF4955]/10 text-[#FF4955]"
                          : "border-zinc-800 text-zinc-400"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-5 w-full">
              {/* Quantity */}
              <div className="flex items-center justify-between border border-zinc-800 rounded-md bg-[#18181b] p-1 h-12 w-32">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 text-zinc-500 hover:text-white"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 text-zinc-500 hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-3 w-full mt-2">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#18181b] border border-zinc-800 text-white px-6 py-3 rounded-md font-bold hover:bg-zinc-800 transition-all uppercase text-xs tracking-widest"
                  >
                    <ShoppingCart size={16} /> Add to Bag
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#FF4955] text-white px-6 py-3 rounded-md font-bold hover:bg-[#e63e49] transition-all uppercase text-xs tracking-widest"
                  >
                    Buy Now
                  </button>
                </div>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-md font-bold hover:bg-[#20bd5a] transition-all uppercase text-xs tracking-widest"
                >
                  <FaWhatsapp size={20} /> Order via WhatsApp
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Badge
                icon={<Truck size={20} />}
                title="Fast Delivery"
                desc="BD Wide"
              />
              <Badge
                icon={<ShieldCheck size={20} />}
                title="Secure Pay"
                desc="COD Available"
              />
              <Badge
                icon={<RefreshCw size={20} />}
                title="Easy Return"
                desc="7 Days Policy"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-20 border border-zinc-900 rounded-2xl overflow-hidden bg-[#121215]">
          <div className="flex border-b border-zinc-900 px-8 py-4">
            <span className="text-[#FF4955] font-bold uppercase tracking-widest text-xs">
              Description
            </span>
          </div>
          <div className="p-8 quill-content">
            <div
              className="max-w-4xl mx-auto break-words"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>

        <RelatedProducts
          currentCategory={product.category}
          currentProductId={product._id}
        />
      </div>

      <style>{`
        .quill-content { color: #a1a1aa; line-height: 1.8; font-size: 15px; }
        .quill-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
        .quill-content strong { color: #fff; }
      `}</style>
    </div>
  );
};

const Badge = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-xl border border-zinc-800">
    <div className="text-[#FF4955] shrink-0">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-white uppercase">{title}</p>
      <p className="text-[10px] text-zinc-500">{desc}</p>
    </div>
  </div>
);

export default ProductDetails;
