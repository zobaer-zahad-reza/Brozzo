import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaUpload } from "react-icons/fa";

const SliderAdmin = ({ token, backendUrl }) => {
    const [images, setImages] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        "Watch", "Fashion", "Beauty & Personal Care", "Health & Household",
        "Home & Kitchen", "Electronics", "Toys & Games", "Baby Products",
        "Pet Supplies", "Arts, Crafts & Sewing", "Office Products",
        "Sports & Outdoors", "Automotive Accessories",
    ];

    const fetchSliders = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/slider/list`);
            if (response.data.success) {
                setImages(response.data.sliders);
            }
        } catch (error) {
            console.error("Error fetching sliders", error);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, [backendUrl]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!imageFile) return toast.error("Please select an image");

        const formData = new FormData();
        formData.append("image", imageFile);
        const finalLink = selectedCategory ? `/collection?category=${selectedCategory}` : "";
        formData.append("link", finalLink);

        try {
            const response = await axios.post(`${backendUrl}/api/slider/add`, formData, {
                headers: { token },
            });
            if (response.data.success) {
                toast.success("Slider Added");
                setImageFile(null);
                setSelectedCategory("");
                fetchSliders();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeSlider = async (id) => {
        try {
            const response = await axios.post(`${backendUrl}/api/slider/remove`, { id }, { headers: { token } });
            if (response.data.success) {
                toast.success("Slider Removed");
                fetchSliders();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-10 border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Manage Hero Sliders</h2>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="mb-10 p-5 border rounded-xl bg-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Slide Image</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {imageFile ? (
                                        <p className="text-sm text-orange-500 font-medium">{imageFile.name}</p>
                                    ) : (
                                        <>
                                            <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                                            <p className="text-sm text-gray-500">Click to upload image</p>
                                        </>
                                    )}
                                </div>
                                <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Target Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-600 focus:ring-2 focus:ring-orange-500 outline-none bg-white h-[85px]"
                        >
                            <option value="">Choose Category (Optional) </option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="mt-6 flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-200">
                    <FaUpload /> Add New Slide
                </button>
            </form>

            {/* slider list */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((item, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-xl border-2 border-transparent hover:border-orange-500 transition-all">
                        <img src={item.image} alt="slider" className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all p-2">
                            <p className="text-white text-[10px] mb-2 text-center">{item.link || "No Link"}</p>
                            <button
                                onClick={() => removeSlider(item._id)}
                                className="bg-white text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            >
                                <FaTrash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SliderAdmin;