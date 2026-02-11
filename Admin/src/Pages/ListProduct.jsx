import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaSearch, FaPen, FaPlus, FaRegEdit } from 'react-icons/fa';
import DescriptionEditor from "../Components/DescriptionEditor"; 

const ListProduct = ({ token, backendUrl, currency }) => {

    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // --- Edit Modal States ---
    const [showEditModal, setShowEditModal] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [showSize, setShowSize] = useState(false);

    const [editingProduct, setEditingProduct] = useState({
        id: "",
        name: "",
        brand: "",
        description: "",
        category: "Watch",
        subCategory: "Man",
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
        if (regularPrice > 0 && discountedPrice > 0 && regularPrice > discountedPrice) {
          const discountValue = ((regularPrice - discountedPrice) / regularPrice) * 100;
          setDiscount(Math.round(discountValue));
        } else {
          setDiscount(0);
        }
    }, [editingProduct.price, editingProduct.offerPrice]);

    const fetchList = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
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
    }

    const removeProduct = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

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
    
          const response = await axios.post(`${backendUrl}/api/product/update`, formData, { headers: { token } });
    
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

    const filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='w-full p-4 bg-white rounded-lg shadow-sm'>

            <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
                <p className='text-xl font-bold text-gray-700'>ALL Products List</p>
                <div className='relative w-full sm:w-80'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className='w-full border rounded py-2 px-4 pl-10 focus:outline-none focus:border-blue-500'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className='absolute left-3 top-2.5 text-gray-400' />
                </div>
            </div>

            <div className='flex flex-col border rounded-sm overflow-hidden'>
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-100 font-bold text-sm border-b'>
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span className='text-center'>Action</span>
                </div>

                {isLoading ? (
                     <div className='text-center py-10 text-gray-500'>Loading products...</div>
                ) : filteredList.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border-b hover:bg-gray-50 text-sm'>
                        <img className='w-12 h-12 object-cover rounded border' src={item.image[0]} alt={item.name} />
                        <p className='truncate font-medium'>{item.name}</p>
                        <p className='text-gray-500'>{item.category}</p>
                        <p className='font-semibold'>{currency}{item.price}</p>
                        <p className='text-center'>{item.quantity}</p>
                        <div className='flex justify-center gap-3 text-lg'>
                            <button onClick={() => handleEditClick(item)} className='text-blue-500 hover:bg-blue-50 p-1 rounded'><FaPen size={14} /></button>
                            <button onClick={() => removeProduct(item._id)} className='text-red-500 hover:bg-red-50 p-1 rounded'><FaTrash size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Edit Modal --- */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-scroll scrollbar-hide">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Edit Product</h2>
                        
                        <form onSubmit={submitEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Images */}
                            <div className="col-span-2">
                                <p className="text-sm font-bold mb-2">Images (Click to Change)</p>
                                <div className="flex gap-2 flex-wrap">
                                    {editingProduct.image.map((img, index) => (
                                        <label key={index} className="cursor-pointer relative group w-20 h-20 border rounded overflow-hidden">
                                            <img src={editingProduct.newImages[index] ? URL.createObjectURL(editingProduct.newImages[index]) : img} className="w-full h-full object-cover" alt="" />
                                            <input type="file" hidden onChange={(e) => handleImageUpload(e, index)} />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><FaRegEdit className="text-white" /></div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Name & Brand */}
                            <div><label className="block text-sm font-bold mb-1">Product Name</label><input type="text" name="name" value={editingProduct.name} onChange={handleEditChange} className="w-full border p-2 rounded" required /></div>
                            <div><label className="block text-sm font-bold mb-1">Brand</label><input type="text" name="brand" value={editingProduct.brand} onChange={handleEditChange} className="w-full border p-2 rounded" /></div>

                            {/* Description */}
                            <div className="col-span-2"><label className="block text-sm font-bold mb-1">Description</label><DescriptionEditor value={editingProduct.description} onChange={handleDescriptionChange} /></div>

                            {/* Category & SubCategory */}
                            <div>
                                <label className="block text-sm font-bold mb-1">Category</label>
                                <select name="category" value={editingProduct.category} onChange={handleEditChange} className="w-full border p-2 rounded">
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
                                <label className="block text-sm font-bold mb-1">Sub Category</label>
                                <select name="subCategory" value={editingProduct.subCategory} onChange={handleEditChange} className="w-full border p-2 rounded">
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            {/* Pricing */}
                            <div><label className="block text-sm font-bold mb-1">Regular Price</label><input type="number" name="price" value={editingProduct.price} onChange={handleEditChange} className="w-full border p-2 rounded" required /></div>
                            <div className="relative">
                                <label className="block text-sm font-bold mb-1">Offer Price</label>
                                <input type="number" name="offerPrice" value={editingProduct.offerPrice} onChange={handleEditChange} className="w-full border p-2 rounded" />
                                {discount > 0 && <span className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 rounded">{discount}% OFF</span>}
                            </div>

                            {/* Quantity & Bestseller */}
                            <div><label className="block text-sm font-bold mb-1">Quantity</label><input type="number" name="quantity" value={editingProduct.quantity} onChange={handleEditChange} className="w-full border p-2 rounded" required /></div>
                            <div className="flex items-center gap-2 mt-6">
                                <input type="checkbox" name="bestseller" checked={editingProduct.bestseller} onChange={handleEditChange} className="w-4 h-4 cursor-pointer" />
                                <label className="font-bold cursor-pointer">Add to Bestseller</label>
                            </div>

                            {/* Sizes */}
                            <div className="col-span-2 border-t pt-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="font-bold text-sm">Has Sizes?</label>
                                    <input type="checkbox" checked={showSize} onChange={() => setShowSize(!showSize)} className="toggle toggle-sm" />
                                </div>
                                {showSize && (
                                    <div className="flex gap-2 flex-wrap">
                                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                                            <div key={size} onClick={() => handleSizeChange(size)} className={`px-3 py-1 cursor-pointer rounded border text-sm ${editingProduct.sizes.includes(size) ? "bg-orange-100 border-orange-500" : "bg-gray-100"}`}>
                                                {size}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t">
                                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#FFA24C] text-white rounded hover:bg-orange-500">Save Changes</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListProduct;