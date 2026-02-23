import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaUpload, FaSpinner } from "react-icons/fa";

const SliderAdmin = ({ token, backendUrl }) => {
    const [images, setImages] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isUploading, setIsUploading] = useState(false); // FIXED: Added uploading state

    // Updated Brozzo Categories
    const categories = [
        "Watch",
        "Men Accesoric",
        "Sun Glasses",
        "Tech Accesoric",
        "Men Cloths"
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

        setIsUploading(true); // FIXED: Start loading

        const formData = new FormData();
        formData.append("image", imageFile);
        
        // Link generation based on selected category
        const finalLink = selectedCategory ? `/collection?category=${encodeURIComponent(selectedCategory)}` : "";
        formData.append("link", finalLink);

        try {
            const response = await axios.post(`${backendUrl}/api/slider/add`, formData, {
                headers: { token },
            });
            if (response.data.success) {
                toast.success("Slider Added Successfully");
                setImageFile(null);
                setSelectedCategory("");
                fetchSliders();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsUploading(false); // FIXED: Stop loading regardless of success or failure
        }
    };

    const removeSlider = async (id) => {
        if (!window.confirm("Are you sure you want to remove this slide?")) return;
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
        <div className="bg-[#121215] p-6 md:p-8 rounded-lg shadow-xl mt-6 border border-zinc-800 text-gray-200">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 border-b border-zinc-800 pb-3">
                Manage Hero Sliders
            </h2>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="mb-10 p-5 md:p-6 border border-zinc-800 rounded-md bg-[#18181b] shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    {/* Image Upload Area */}
                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                            Upload Slide Image
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-36 border border-zinc-700 border-dashed rounded-md cursor-pointer bg-[#121215] hover:border-[#FF4955] transition-all overflow-hidden group">
                                {imageFile ? (
                                    <img 
                                        src={URL.createObjectURL(imageFile)} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover group-hover:opacity-50 transition-opacity"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FaUpload className="w-8 h-8 mb-3 text-zinc-600 group-hover:text-[#FF4955] transition-colors" />
                                        <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">Click to upload image</p>
                                    </div>
                                )}
                                <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>

                    {/* Category Selector */}
                    <div className="flex flex-col h-full">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                            Target Link (Optional)
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-[#121215] border border-zinc-800 text-white p-3.5 rounded-md focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none transition-colors text-sm cursor-pointer"
                        >
                            <option value="" className="text-zinc-500">No Link (Default)</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <p className="text-[10px] text-zinc-500 mt-2">
                            If a category is selected, clicking the slider will redirect users to that category page.
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isUploading}
                    className={`mt-8 flex items-center justify-center gap-2 bg-[#FF4955] text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest text-sm w-full md:w-auto transition-all shadow-lg shadow-[#FF4955]/20 ${
                        isUploading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#e03e49] active:scale-95"
                    }`}
                >
                    {isUploading ? (
                        <>
                            <FaSpinner className="animate-spin" size={16} /> Uploading...
                        </>
                    ) : (
                        <>
                            <FaUpload size={14} /> Add New Slide
                        </>
                    )}
                </button>
            </form>

            {/* Slider List Grid */}
            <div>
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
                    Current Sliders ({images.length})
                </h3>
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {images.map((item, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-md border border-zinc-800 hover:border-[#FF4955] transition-colors bg-[#18181b]">
                                <img src={item.image} alt={`Slide ${index + 1}`} className="w-full h-40 object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                                
                                {/* Hover Overlay Controls */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
                                    {item.link && (
                                        <span className="bg-black/80 text-[#FF4955] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#FF4955]/30">
                                            {item.link.split('=')[1] ? decodeURIComponent(item.link.split('=')[1]) : 'Linked'}
                                        </span>
                                    )}
                                    <button
                                        onClick={() => removeSlider(item._id)}
                                        className="bg-zinc-900 border border-zinc-700 text-[#FF4955] p-3 rounded-full hover:bg-[#FF4955] hover:text-white transition-colors shadow-xl"
                                        title="Delete Slider"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-[#18181b] border border-zinc-800 rounded-md">
                        <p className="text-zinc-500 font-medium">No sliders found. Add one above.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SliderAdmin;