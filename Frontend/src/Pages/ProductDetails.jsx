import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Truck, ShieldCheck, RefreshCw, Minus, Plus, ArrowLeft } from "lucide-react";
import RelatedProducts from "../Components/RelatedProducts";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, currency, addToCart } = useContext(ShopContext);
    
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [size, setSize] = useState("");

    useEffect(() => {
        const foundProduct = products.find((item) => item._id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setMainImage(foundProduct.image[0]);
        }
        window.scrollTo(0, 0);
    }, [id, products]);

    const handleAddToCart = () => {
        if (!product) return;
        if (product.sizes && product.sizes.length > 0 && !size) {
            toast.error("Please select a size");
            return;
        }
        const selectedSize = size || "Standard";
        for (let i = 0; i < quantity; i++) {
            addToCart(product._id, selectedSize);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            if (product.sizes && product.sizes.length > 0 && !size) {
                toast.error("Please select a size");
                return;
            }
            navigate('/place-order', {
                state: {
                    buyNowItem: { ...product, quantity: quantity, size: size || "Standard" }
                }
            });
        }
    };

    if (!product) {
        return <div className="h-screen flex items-center justify-center text-xl"><span className="loading loading-spinner text-warning"></span></div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-6 md:py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-4 md:p-8">

                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-orange-500 mb-6 flex items-center gap-2 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Shopping
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    {/* Image Section */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full aspect-square  rounded-2xl overflow-hidden border border-gray-100 relative group">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        {/* Thumbnails */}
                        {product.image && product.image.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {product.image.map((imgSrc, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setMainImage(imgSrc)}
                                        className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                                            mainImage === imgSrc
                                                ? 'border-orange-500 ring-2 ring-orange-100'
                                                : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                {product.category}
                            </span>
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                {currency}{product.offerPrice ? product.offerPrice : product.price}
                            </h2>
                            {product.offerPrice && (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg text-gray-400 line-through">
                                        {currency}{product.price}
                                    </span>
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                        {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="space-y-3">
                                <p className="font-semibold text-gray-700">Select Size</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((item, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => setSize(item)}
                                            className={`py-2 px-6 border rounded-lg font-medium transition-all ${item === size ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-400'}`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <hr className="border-gray-100" />

                        {/* Action Section */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:text-orange-500 transition-colors"><Minus size={18} /></button>
                                <span className="w-10 text-center font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:text-orange-500 transition-colors"><Plus size={18} /></button>
                            </div>

                            <div className="flex flex-1 gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition active:scale-95"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition active:scale-95 shadow-lg shadow-orange-100"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <Badge icon={<Truck size={18}/>} title="Free Delivery" desc="Over {currency}200" />
                            <Badge icon={<ShieldCheck size={18}/>} title="Secure" desc="100% Protected" />
                            <Badge icon={<RefreshCw size={18}/>} title="Easy Return" desc="30 Day Policy" />
                        </div>
                    </div>
                </div>

                {/* Description Tab Section */}
                <div className="mt-12 md:mt-16 border rounded-2xl overflow-hidden">
                    <div className="flex bg-gray-50 border-b">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'description' ? 'bg-white border-t-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Description
                        </button>

                        {/* reveiws */}
                        {/* <button
                            onClick={() => setActiveTab('reviews')}
                            className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'reviews' ? 'bg-white border-t-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Reviews
                        </button> */}
                    </div>

                    <div className="p-6 md:p-10">
                        {activeTab === 'description' ? (
                            <div 
                                className="max-w-none text-gray-600 leading-relaxed break-words overflow-hidden prose prose-orange"
                                dangerouslySetInnerHTML={{ __html: product.description }} 
                            />
                        ) : (
                            <div className="text-center py-10 text-gray-500 italic">
                                Customer reviews functionality coming soon.
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <RelatedProducts
                currentCategory={product.category}
                currentProductId={product._id}
            />
        </div>
    );
};

// Helper Component for Badges
const Badge = ({ icon, title, desc }) => (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="text-orange-500">{icon}</div>
        <div>
            <p className="text-[11px] font-bold text-gray-900 leading-none">{title}</p>
            <p className="text-[10px] text-gray-500 mt-1">{desc}</p>
        </div>
    </div>
);

export default ProductDetails;