import React, { useState } from "react";
import { Upload } from "lucide-react";
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
  
  const [category, setCategory] = useState("Fashion"); 
  const [subCategory, setSubCategory] = useState("Men");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
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
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      
      {/* Image Upload Section */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 rounded hover:bg-gray-100 transition">
              {image1 ? <img className="w-full h-full object-cover rounded" src={URL.createObjectURL(image1)} alt="" /> : <Upload className="text-gray-400" />}
            </div>
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 rounded hover:bg-gray-100 transition">
              {image2 ? <img className="w-full h-full object-cover rounded" src={URL.createObjectURL(image2)} alt="" /> : <Upload className="text-gray-400" />}
            </div>
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 rounded hover:bg-gray-100 transition">
              {image3 ? <img className="w-full h-full object-cover rounded" src={URL.createObjectURL(image3)} alt="" /> : <Upload className="text-gray-400" />}
            </div>
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 rounded hover:bg-gray-100 transition">
              {image4 ? <img className="w-full h-full object-cover rounded" src={URL.createObjectURL(image4)} alt="" /> : <Upload className="text-gray-400" />}
            </div>
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-medium text-gray-700">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-400" type="text" placeholder="Type product name" required />
      </div>

      {/* Product Description Editor */}
      <div className="w-full max-w-[500px]">
        <p className="mb-2 font-medium text-gray-700">Product Description</p>
        <DescriptionEditor value={description} onChange={setDescription} />
      </div>

      {/* Category, SubCategory & Prices */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 pt-4 sm:pt-0">
        <div>
          <p className="mb-2 font-medium text-gray-700">Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
            <option value="Fashion">Fashion</option>
            <option value="Watch">Watch</option>
            <option value="Electronics">Electronics</option>
            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            <option value="Health & Household">Health & Household</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Baby Products">Baby Products</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Arts, Crafts & Sewing">Arts, Crafts & Sewing</option>
            <option value="Office Products">Office Products</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Automotive Accessories">Automotive Accessories</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium text-gray-700">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Men & Women">Men & Women</option>
            <option value="Everyone">Everyone</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium text-gray-700">Regular Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 border border-gray-300 rounded" type="number" placeholder="100" required />
        </div>

        <div>
          <p className="mb-2 font-medium text-gray-700">Offer Price</p>
          <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice} className="w-full px-3 py-2 border border-gray-300 rounded" type="number" placeholder="80" />
        </div>
      </div>

      {/* Product Sizes */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size])} className={`px-3 py-1 cursor-pointer bg-gray-100 border rounded transition-colors ${sizes.includes(size) ? "bg-orange-200 border-orange-500 font-bold" : ""}`}>
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" className="cursor-pointer" />
        <label className="cursor-pointer text-gray-700" htmlFor="bestseller">Add to Bestseller</label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-28 py-3 mt-4 bg-[#FFA24C] text-white font-bold rounded hover:bg-orange-500 active:bg-orange-600 transition">ADD</button>
    </form>
  );
};

export default AddProduct;