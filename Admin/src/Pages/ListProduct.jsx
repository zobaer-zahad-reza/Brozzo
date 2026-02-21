import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaSearch, FaPen, FaRegEdit } from "react-icons/fa";
import DescriptionEditor from "../Components/DescriptionEditor";

const ListProduct = ({ token, backendUrl, currency }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Edit Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [showSize, setShowSize] = useState(false);

  const [editingProduct, setEditingProduct] = useState({
    id: "",
    name: "",
    brand: "",
    description: "",
    category: "Watch",
    subCategory: "Men",
    watchGrade: "Original",
    price: "",
    offerPrice: "",
    quantity: "",
    sizes: [],
    bestseller: false,
    image: [],
    newImages: {},
  });

  useEffect(() => {
    const regularPrice = parseFloat(editingProduct.price);
    const discountedPrice = parseFloat(editingProduct.offerPrice);
    if (
      regularPrice > 0 &&
      discountedPrice > 0 &&
      regularPrice > discountedPrice
    ) {
      const discountValue =
        ((regularPrice - discountedPrice) / regularPrice) * 100;
      setDiscount(Math.round(discountValue));
    } else {
      setDiscount(0);
    }
  }, [editingProduct.price, editingProduct.offerPrice]);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingProduct({
      id: item._id,
      name: item.name,
      brand: item.brand || "",
      description: item.description,
      category: item.category,
      subCategory: item.subCategory,
      watchGrade: item.watchGrade || "Original",
      price: item.price,
      offerPrice: item.offerPrice || "",
      quantity: item.quantity,
      sizes: item.sizes || [],
      bestseller: item.bestseller,
      image: item.image || [],
      newImages: {},
    });
    setShowSize(item.sizes && item.sizes.length > 0);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setEditingProduct((prev) => ({ ...prev, description: value }));
  };

  const handleSizeChange = (size) => {
    setEditingProduct((prev) => {
      const currentSizes = prev.sizes;
      return currentSizes.includes(size)
        ? { ...prev, sizes: currentSizes.filter((s) => s !== size) }
        : { ...prev, sizes: [...currentSizes, size] };
    });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setEditingProduct((prev) => ({
        ...prev,
        newImages: { ...prev.newImages, [index]: file },
      }));
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", editingProduct.id);
      formData.append("name", editingProduct.name);
      formData.append("brand", editingProduct.brand);
      formData.append("description", editingProduct.description);
      formData.append("category", editingProduct.category);
      formData.append("subCategory", editingProduct.subCategory);
      formData.append("price", editingProduct.price);
      formData.append("offerPrice", editingProduct.offerPrice);
      formData.append("quantity", editingProduct.quantity);
      formData.append("bestseller", editingProduct.bestseller);
      formData.append("sizes", JSON.stringify(editingProduct.sizes));

      if (editingProduct.category === "Watch") {
        formData.append("watchGrade", editingProduct.watchGrade);
      }

      const imageIndexes = Object.keys(editingProduct.newImages);
      formData.append("imageIndexes", JSON.stringify(imageIndexes));
      imageIndexes.forEach((index) => {
        formData.append("image", editingProduct.newImages[index]);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        setShowEditModal(false);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full text-gray-200">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-white uppercase tracking-widest">
          All Products List
        </h2>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-[#18181b] border border-zinc-800 rounded-md py-2.5 px-4 pl-10 focus:outline-none focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] text-white transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3.5 text-zinc-500" size={14} />
        </div>
      </div>

      {/* Product Table */}
      <div className="flex flex-col border border-zinc-800 bg-[#121215] rounded-md overflow-hidden shadow-lg">
        
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1.5fr_1fr_1fr_1fr] items-center py-3 px-4 bg-zinc-900 border-b border-zinc-800 text-xs font-bold text-zinc-400 uppercase tracking-wider">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="text-center">Action</span>
        </div>

        {/* Table Body */}
        {isLoading ? (
          <div className="text-center py-10 text-zinc-500 animate-pulse">
            Loading products...
          </div>
        ) : filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1.5fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border-b border-zinc-800 hover:bg-[#18181b] transition-colors text-sm"
            >
              <img
                className="w-12 h-12 object-cover rounded-md border border-zinc-700 bg-black"
                src={item.image[0]}
                alt={item.name}
              />
              <p className="truncate font-medium text-white">{item.name}</p>
              <p className="text-zinc-400 text-xs">{item.category}</p>
              <p className="font-semibold text-gray-300">
                {currency}
                {item.offerPrice > 0 ? item.offerPrice : item.price}
              </p>
              <p className="text-center text-zinc-400">{item.quantity}</p>
              
              {/* Actions */}
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-2 rounded transition-colors"
                  title="Edit"
                >
                  <FaPen size={14} />
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-900/20 p-2 rounded transition-colors"
                  title="Delete"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-zinc-500">
            No products found matching your search.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] overflow-y-auto p-4">
          <div className="bg-[#121215] border border-zinc-800 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-4xl my-auto">
            
            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">
                Edit Product
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-zinc-500 hover:text-[#FF4955] transition-colors font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitEdit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Images */}
              <div className="col-span-1 md:col-span-2">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Images (Click to Change)
                </p>
                <div className="flex gap-3 flex-wrap">
                  {editingProduct.image.map((img, index) => (
                    <label
                      key={index}
                      className="cursor-pointer relative group w-20 h-20 border border-zinc-700 rounded-md overflow-hidden bg-[#18181b] hover:border-[#FF4955] transition-colors"
                    >
                      <img
                        src={
                          editingProduct.newImages[index]
                            ? URL.createObjectURL(editingProduct.newImages[index])
                            : img
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleImageUpload(e, index)}
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaRegEdit className="text-white" size={20} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name & Brand */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleEditChange}
                  className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] outline-none transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Brand (Optional)
                </label>
                <input
                  type="text"
                  name="brand"
                  value={editingProduct.brand}
                  onChange={handleEditChange}
                  className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] outline-none transition-colors text-sm"
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Description
                </label>
                <div className="border border-zinc-800 rounded-md overflow-hidden bg-[#18181b]">
                   <DescriptionEditor
                     value={editingProduct.description}
                     onChange={handleDescriptionChange}
                   />
                </div>
              </div>

              {/* Category & SubCategory */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={editingProduct.category}
                  onChange={handleEditChange}
                  className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] outline-none transition-colors text-sm"
                >
                  <option value="Watch">Watch</option>
                  <option value="Men Accesoric">Men Accesoric</option>
                  <option value="Sun Glasses">Sun Glasses</option>
                  <option value="Tech Accesoric">Tech Accesoric</option>
                  <option value="Men Cloths">Men Cloths</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Sub Category
                </label>
                <input
                    type="text"
                    name="subCategory"
                    value={editingProduct.subCategory}
                    onChange={handleEditChange}
                    className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] outline-none transition-colors text-sm"
                    placeholder="e.g. Wallets, Shirts"
                />
              </div>

              {/* Pricing */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Regular Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  min={0}
                  value={editingProduct.price}
                  onChange={handleEditChange}
                  className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] outline-none transition-colors text-sm"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Offer Price (৳)
                </label>
                <input
                  type="number"
                  name="offerPrice"
                  min={0}
                  value={editingProduct.offerPrice}
                  onChange={handleEditChange}
                  className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] outline-none transition-colors text-sm"
                />
                {discount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#FF4955] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {/* Quantity & Bestseller */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  min={0}
                  value={editingProduct.quantity}
                  onChange={handleEditChange}
                  className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] outline-none transition-colors text-sm"
                  required
                />
              </div>
              <div className="flex items-center gap-3 mt-8">
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={editingProduct.bestseller}
                  onChange={handleEditChange}
                  className="w-5 h-5 cursor-pointer accent-[#FF4955] bg-[#18181b] border-zinc-800 rounded"
                />
                <label className="text-sm font-bold text-gray-300 cursor-pointer">
                  Add to Bestseller
                </label>
              </div>

              {/* Sizes */}
              <div className="col-span-1 md:col-span-2 border-t border-zinc-800 pt-5 mt-2">
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={showSize}
                    onChange={() => setShowSize(!showSize)}
                    className="w-4 h-4 cursor-pointer accent-[#FF4955]"
                  />
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Has Sizes / Variations?
                  </label>
                </div>
                
                {showSize && (
                  <div className="flex gap-2 flex-wrap">
                    {["S", "M", "L", "XL", "XXL", "Free Size"].map((size) => (
                      <div
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-4 py-1.5 cursor-pointer rounded-md border text-sm transition-all ${
                          editingProduct.sizes.includes(size)
                            ? "bg-[#FF4955]/10 border-[#FF4955] text-[#FF4955] font-bold shadow-sm shadow-[#FF4955]/20"
                            : "bg-[#18181b] border-zinc-800 text-gray-400 hover:border-zinc-600"
                        }`}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4 pt-6 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 bg-zinc-800 text-gray-300 text-sm font-bold rounded-md hover:bg-zinc-700 transition-colors uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FF4955] text-white text-sm font-bold rounded-md hover:bg-[#e03e49] active:scale-95 transition-all shadow-lg shadow-[#FF4955]/20 uppercase tracking-wider"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;