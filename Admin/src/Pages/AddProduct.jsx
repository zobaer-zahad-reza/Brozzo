import React, { useState, useEffect } from "react";
import { Upload, Loader2 } from "lucide-react"; // Loader icon আনা হয়েছে
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import DescriptionEditor from "../Components/DescriptionEditor";

const AddProduct = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [quantity, setQuantity] = useState(1); // নতুন Quantity স্টেট

  const [category, setCategory] = useState("Watch"); 
  const [subCategory, setSubCategory] = useState("No Subcategory");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  
  const [loading, setLoading] = useState(false); // আপলোড লোডিং স্টেট

  const categoryData = [
    { name: "Watch", subCategories: [] },
    {
      name: "Men Accesoric",
      subCategories: ["Wallets", "Belts", "Caps", "Chain", "Ring"],
    },
    { name: "Sun Glasses", subCategories: [] },
    {
      name: "Tech Accesoric",
      subCategories: ["Headphones", "Chargers", "Cases"],
    },
    { name: "Men Cloths", subCategories: ["T-Shirts", "Shirts", "Pants"] },
  ];

  const selectedCategoryObj = categoryData.find((cat) => cat.name === category);
  const availableSubCategories = selectedCategoryObj ? selectedCategoryObj.subCategories : [];

  useEffect(() => {
    if (availableSubCategories.length > 0) {
      setSubCategory(availableSubCategories[0]);
    } else {
      setSubCategory("No Subcategory");
    }
  }, [category]); 

  const preventMinus = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '+') {
        e.preventDefault();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // আপলোড শুরু হলে লোডিং ট্রু হবে
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      formData.append("quantity", quantity); // Quantity যোগ করা হলো
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setQuantity(1);
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false); // আপলোড শেষ হলে (সফল বা ব্যর্থ যাই হোক) লোডিং ফলস হবে
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4 text-gray-200 no-spinner mb-10">
      <div className="w-full pb-3 border-b border-zinc-800 mb-2">
         <h2 className="text-xl font-bold text-white uppercase tracking-widest">Add New Product</h2>
      </div>

      {/* Image Upload Section */}
      <div>
        <p className="mb-2 font-medium text-gray-400 text-sm">Upload Image</p>
        <div className="flex gap-3">
          {[
            { id: "image1", state: image1, setter: setImage1 },
            { id: "image2", state: image2, setter: setImage2 },
            { id: "image3", state: image3, setter: setImage3 },
            { id: "image4", state: image4, setter: setImage4 },
          ].map((imgData) => (
            <label key={imgData.id} htmlFor={imgData.id}>
              <div className="w-20 h-20 border border-dashed border-zinc-700 flex items-center justify-center cursor-pointer bg-[#18181b] rounded-md hover:border-[#FF4955] transition-colors">
                {imgData.state ? (
                  <img className="w-full h-full object-cover rounded-md" src={URL.createObjectURL(imgData.state)} alt="" />
                ) : (
                  <Upload className="text-zinc-500" size={24} />
                )}
              </div>
              <input onChange={(e) => imgData.setter(e.target.files[0])} type="file" id={imgData.id} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2 font-medium text-gray-400 text-sm">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] text-white placeholder-zinc-600 transition-all"
          type="text"
          placeholder="Type product name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2 font-medium text-gray-400 text-sm">Product Description</p>
        <div className="border border-zinc-800 rounded-md overflow-hidden bg-[#18181b]">
           <DescriptionEditor value={description} onChange={setDescription} />
        </div>
      </div>

      {/* Category, SubCategory, Price & Quantity */}
      <div className="flex flex-wrap gap-4 w-full pt-2">
        <div className="flex-1 min-w-[200px] max-w-[240px]">
          <p className="mb-2 font-medium text-gray-400 text-sm">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white cursor-pointer transition-all"
          >
            {categoryData.map((cat) => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px] max-w-[240px]">
          <p className="mb-2 font-medium text-gray-400 text-sm">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={availableSubCategories.length === 0}
          >
            {availableSubCategories.length > 0 ? (
              availableSubCategories.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))
            ) : (
              <option value="No Subcategory">No Subcategory</option>
            )}
          </select>
        </div>

        <div className="w-[120px]">
          <p className="mb-2 font-medium text-gray-400 text-sm">Regular Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white placeholder-zinc-600 transition-all"
            type="number"
            min={0}
            onKeyDown={preventMinus}
            placeholder="1000"
            required
          />
        </div>

        <div className="w-[120px]">
          <p className="mb-2 font-medium text-gray-400 text-sm">Offer Price</p>
          <input
            onChange={(e) => setOfferPrice(e.target.value)}
            value={offerPrice}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white placeholder-zinc-600 transition-all"
            type="number"
            min={0}
            onKeyDown={preventMinus}
            placeholder="800"
          />
        </div>

        {/* Quantity Field */}
        <div className="w-[100px]">
          <p className="mb-2 font-medium text-gray-400 text-sm">Quantity</p>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white placeholder-zinc-600 transition-all"
            type="number"
            min={1}
            onKeyDown={preventMinus}
            placeholder="10"
            required
          />
        </div>
      </div>

      {/* Product Sizes */}
      <div className="pt-2">
        <p className="mb-2 font-medium text-gray-400 text-sm">Product Sizes / Variations</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL", "Free Size"].map((size) => (
            <div
              key={size}
              onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size])}
              className={`px-4 py-1.5 cursor-pointer border rounded-md transition-all text-sm ${
                sizes.includes(size)
                  ? "bg-[#FF4955]/10 border-[#FF4955] text-[#FF4955] font-bold shadow-sm shadow-[#FF4955]/20"
                  : "bg-[#18181b] border-zinc-800 text-gray-400 hover:border-zinc-500"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 items-center mt-4">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-5 h-5 cursor-pointer accent-[#FF4955] bg-[#18181b] border-zinc-800 rounded"
        />
        <label className="cursor-pointer text-gray-300 font-medium select-none" htmlFor="bestseller">Add to Bestseller List</label>
      </div>

      {/* Loading functionality added to button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-48 py-3 mt-6 bg-[#FF4955] text-white font-bold rounded-md hover:bg-[#e03e49] active:scale-95 transition-all uppercase tracking-widest text-sm shadow-lg shadow-[#FF4955]/20 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Uploading...
          </>
        ) : (
          "Add Product"
        )}
      </button>

      <style>{`
        .no-spinner input::-webkit-outer-spin-button,
        .no-spinner input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </form>
  );
};

export default AddProduct;