import React, { useState, useEffect } from "react";
import { Upload, Loader2, Plus, X } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import DescriptionEditor from "../Components/DescriptionEditor";

// Image compression utility function
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set max dimensions for reasonable file size in KB
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format with 0.8 quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            const newFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              {
                type: "image/webp",
                lastModified: Date.now(),
              },
            );
            resolve(newFile);
          },
          "image/webp",
          0.8,
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const AddProduct = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [category, setCategory] = useState("Watch");
  const [subCategory, setSubCategory] = useState("No Subcategory");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Color states
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  const [loading, setLoading] = useState(false);

  const categoryData = [
    { name: "All", subCategories: [] },
    { name: "Watch", subCategories: [] },
    {
      name: "Men Accessories",
      subCategories: ["Wallets", "Belts", "Caps", "Chain", "Ring"],
    },
    { name: "Sun Glasses", subCategories: [] },
    {
      name: "Tech Accessories",
      subCategories: ["Headphones", "Wireless Earbuds", "Speakers"],
    },
    { name: "Men Cloths", subCategories: ["T-Shirts", "Shirts", "Pants"] },
  ];

  const selectedCategoryObj = categoryData.find((cat) => cat.name === category);
  const availableSubCategories = selectedCategoryObj
    ? selectedCategoryObj.subCategories
    : [];

  useEffect(() => {
    if (availableSubCategories.length > 0) {
      setSubCategory(availableSubCategories[0]);
    } else {
      setSubCategory("No Subcategory");
    }
  }, [category]);

  const preventMinus = (e) => {
    if (e.key === "-" || e.key === "e" || e.key === "+") {
      e.preventDefault();
    }
  };

  const addColor = () => {
    if (!colorName.trim()) {
      toast.error("Color name লিখুন");
      return;
    }
    const isDuplicate = colors.some(
      (c) => c.name.toLowerCase() === colorName.trim().toLowerCase(),
    );
    if (isDuplicate) {
      toast.error("এই color ইতিমধ্যে আছে");
      return;
    }
    setColors((prev) => [...prev, { name: colorName.trim(), hex: colorHex }]);
    setColorName("");
    setColorHex("#000000");
  };

  const removeColor = (index) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedFile = await compressImage(file);
        setter(compressedFile);
      } catch (error) {
        toast.error("Image compression failed!");
        console.error(error);
      }
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colors", JSON.stringify(colors));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setBrand("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setQuantity(1);
        setSizes([]);
        setColors([]);
        setColorName("");
        setColorHex("#000000");
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
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-6 text-gray-200 no-spinner mb-10 px-4 sm:px-0"
    >
      <div className="w-full pb-3 border-b border-zinc-800">
        <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest">
          Add New Product
        </h2>
      </div>

      {/* Image Upload Section */}
      <div className="w-full">
        <div className="mb-3">
          <p className="font-medium text-gray-400 text-sm">Upload Image</p>
          <p className="text-[10px] sm:text-xs text-zinc-500 mt-1">
            Min: 3024px × 4032px | Max size: 2MB (Auto-compressed to WebP)
          </p>
        </div>
        <div className="grid grid-cols-4 sm:flex gap-3">
          {[
            { id: "image1", state: image1, setter: setImage1 },
            { id: "image2", state: image2, setter: setImage2 },
            { id: "image3", state: image3, setter: setImage3 },
            { id: "image4", state: image4, setter: setImage4 },
          ].map((imgData) => (
            <label
              key={imgData.id}
              htmlFor={imgData.id}
              className="w-full sm:w-20"
            >
              <div className="aspect-square sm:w-20 sm:h-20 border border-dashed border-zinc-700 flex items-center justify-center cursor-pointer bg-[#18181b] rounded-md hover:border-[#FF4955] transition-colors overflow-hidden">
                {imgData.state ? (
                  <img
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(imgData.state)}
                    alt=""
                  />
                ) : (
                  <Upload className="text-zinc-500" size={20} />
                )}
              </div>
              <input
                onChange={(e) => handleImageUpload(e, imgData.setter)}
                type="file"
                id={imgData.id}
                accept=".png, .jpg, .jpeg, .webp"
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name & Brand Name */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-[800px]">
        <div className="flex-1">
          <p className="mb-2 font-medium text-gray-400 text-sm">
            Product Name <span className="text-red-500">*</span>
          </p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white placeholder-zinc-600 transition-all text-sm"
            type="text"
            placeholder="Type product name"
            required
          />
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium text-gray-400 text-sm">
            Brand Name{" "}
            <span className="text-zinc-500 text-xs ml-1">(Optional)</span>
          </p>
          <input
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white placeholder-zinc-600 transition-all text-sm"
            type="text"
            placeholder="e.g. Rolex, Nike"
          />
        </div>
      </div>

      {/* Product Description */}
      <div className="w-full max-w-[800px] flex flex-col">
        <p className="mb-2 font-medium text-gray-400 text-sm">
          Product Description
        </p>
        <div className="border border-zinc-800 rounded-md bg-[#18181b] min-h-[250px] sm:min-h-[300px] flex flex-col editor-container overflow-hidden">
          <DescriptionEditor value={description} onChange={setDescription} />
        </div>
      </div>

      {/* Category, SubCategory, Price & Quantity */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 w-full max-w-[800px]">
        <div className="col-span-2 md:flex-1 md:min-w-[180px]">
          <p className="mb-2 font-medium text-gray-400 text-sm">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white text-sm cursor-pointer"
          >
            {categoryData.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 md:flex-1 md:min-w-[180px]">
          <p className="mb-2 font-medium text-gray-400 text-sm">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white text-sm cursor-pointer disabled:opacity-50"
            disabled={availableSubCategories.length === 0}
          >
            {availableSubCategories.length > 0 ? (
              availableSubCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))
            ) : (
              <option value="No Subcategory">No Subcategory</option>
            )}
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium text-gray-400 text-[13px] whitespace-nowrap">
            Regular Price
          </p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white text-sm"
            type="number"
            onKeyDown={preventMinus}
            placeholder="1000"
            required
          />
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium text-gray-400 text-[13px] whitespace-nowrap">
            Offer Price
          </p>
          <input
            onChange={(e) => setOfferPrice(e.target.value)}
            value={offerPrice}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white text-sm"
            type="number"
            onKeyDown={preventMinus}
            placeholder="800"
          />
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium text-gray-400 text-[13px] whitespace-nowrap">
            Quantity
          </p>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white text-sm"
            type="number"
            onKeyDown={preventMinus}
            placeholder="10"
            required
          />
        </div>
      </div>

      {/* Product Sizes */}
      <div className="w-full">
        <p className="mb-3 font-medium text-gray-400 text-sm">
          Product Sizes / Variations
        </p>
        <div className="flex gap-2.5 flex-wrap">
          {["S", "M", "L", "XL", "XXL", "Free Size"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size],
                )
              }
              className={`px-3 sm:px-4 py-2 cursor-pointer border rounded-md transition-all text-xs sm:text-sm ${
                sizes.includes(size)
                  ? "bg-[#FF4955]/10 border-[#FF4955] text-[#FF4955] font-bold"
                  : "bg-[#18181b] border-zinc-800 text-gray-400 hover:border-zinc-500"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* ===== COLOR SECTION ===== */}
      <div className="w-full max-w-[800px]">
        <p className="mb-3 font-medium text-gray-400 text-sm">
          Product Colors{" "}
          <span className="text-zinc-500 text-xs ml-1">(Optional)</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addColor())
            }
            placeholder="Color name (e.g. Red, Navy Blue)"
            className="flex-1 px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:outline-none focus:border-[#FF4955] text-white placeholder-zinc-600 text-sm"
          />
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
              className="color-picker-input"
              title="Pick color"
            />
            <button
              type="button"
              onClick={addColor}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#FF4955] text-white text-xs font-bold rounded-md hover:bg-[#e03e49] transition-all uppercase tracking-wider"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {colors.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#18181b] border border-zinc-800 rounded-full pl-1 pr-3 py-1 hover:border-zinc-600 transition-colors"
              >
                <span
                  className="w-6 h-6 rounded-full border border-zinc-700 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs text-gray-300 font-medium">
                  {color.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="ml-1 text-zinc-600 hover:text-[#FF4955] transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-600 italic">
            কোনো color add করা হয়নি — add করলে customer order এর সময় color
            select করতে পারবে।
          </p>
        )}
      </div>
      {/* ===== END COLOR SECTION ===== */}

      {/* Bestseller Checkbox */}
      <div className="flex gap-3 items-center">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-5 h-5 cursor-pointer accent-[#FF4955]"
        />
        <label
          className="cursor-pointer text-gray-300 text-sm font-medium select-none"
          htmlFor="bestseller"
        >
          Add to Bestseller List
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full sm:w-48 py-3.5 bg-[#FF4955] text-white font-bold rounded-md hover:bg-[#e03e49] active:scale-[0.98] transition-all uppercase tracking-widest text-xs sm:text-sm shadow-lg shadow-[#FF4955]/20 flex items-center justify-center gap-2 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
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
        .editor-container .ql-container {
          flex: 1;
          min-height: 200px;
        }
        @media (min-width: 640px) {
          .editor-container .ql-container {
            min-height: 250px;
          }
        }
        .editor-container .ql-toolbar {
          position: sticky;
          top: 0;
          z-index: 10;
          background-color: #18181b;
        }
        .color-picker-input {
          -webkit-appearance: none;
          width: 44px;
          height: 44px;
          border: 2px solid #3f3f46;
          border-radius: 8px;
          cursor: pointer;
          padding: 2px;
          background: #18181b;
        }
        .color-picker-input::-webkit-color-swatch-wrapper { padding: 0; }
        .color-picker-input::-webkit-color-swatch { border: none; border-radius: 5px; }
      `}</style>
    </form>
  );
};

export default AddProduct;
