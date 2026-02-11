import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, Upload, Palette } from 'lucide-react';

const CategoryCarouselAdmin = ({ backendUrl, token }) => {
    const [image, setImage] = useState(false);
    const [name, setName] = useState("");
    const [bgColor, setBgColor] = useState("#c88b083a"); 
    const [list, setList] = useState([]);
    

    // const availableCategories = [
    //     "Grocery", "Home", "Patio & Garden", "Fashion", "Tech", 
    //     "Baby", "Toys", "Health", "Pets", "Beauty", "Accessories"
    // ];

    const availableCategories = [
    "Watch", "Fashion", "Beauty & Personal Care", "Health & Household", 
    "Home & Kitchen", "Electronics", "Toys & Games", "Baby Products", 
    "Pet Supplies", "Arts, Crafts & Sewing", "Office Products", 
    "Sports & Outdoors", "Automotive Accessories",
  ];

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/category/list');
            if (response.data.success) {
                setList(response.data.categories);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!name) return toast.error("Please select a category name");

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("image", image);
            formData.append("bgColor", bgColor); 

            const response = await axios.post(backendUrl + '/api/category/add', formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setImage(false);
                setBgColor("#c88b083a");
                fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeCategory = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/category/remove', { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="p-4 md:p-8 w-full bg-gray-50 ">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Home Carousel</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Add Category Form */}
                <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 max-w-md h-fit">
                    <p className="text-lg font-semibold mb-4 border-b pb-2">Add New Slide</p>
                    
                    <div className="mb-5">
                        <p className="mb-2 font-medium text-gray-600">Step 1: Upload Icon/Image</p>
                        <label htmlFor="category-image" className="cursor-pointer">
                            <div className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-all">
                                {image ? <img src={URL.createObjectURL(image)} className="object-contain h-full w-full" alt="" /> : <Upload className="text-gray-400" size={30} />}
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="category-image" hidden />
                        </label>
                    </div>

                    <div className="mb-5">
                        <p className="mb-2 font-medium text-gray-600">Step 2: Select Category Name</p>
                        <select 
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                            className="w-full px-3 py-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                            required
                        >
                            <option value="">-- Choose Category --</option>
                            {availableCategories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <p className="mb-2 font-medium text-gray-600 flex items-center gap-2">
                            <Palette size={18} /> Step 3: Card Background (Optional)
                        </p>
                        <div className="flex items-center gap-4 p-2 border rounded-lg">
                            <input 
                                type="color" 
                                value={bgColor} 
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-10 h-10 cursor-pointer border-none bg-transparent"
                            />
                            <span className="text-sm font-mono text-gray-500 uppercase">{bgColor}</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                        PUBLISH TO HOME
                    </button>
                </form>

                {/* Preview/List Section */}
                <div className="flex-[2]">
                    <p className="text-lg font-semibold mb-4">Live Preview on Homepage</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {list.map((item) => (
                            <div key={item._id} className="relative group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">

                                <div 
                                    className="w-full aspect-square rounded-lg flex items-center justify-center mb-3 p-3 transition-transform group-hover:scale-105"
                                    style={{ backgroundColor: item.bgColor || '#f3f4f6' }}
                                >
                                    <img className="w-full h-full object-contain mix-blend-multiply" src={item.image} alt="" />
                                </div>
                                <p className="font-bold text-gray-700">{item.name}</p>
                                
                                <button 
                                    onClick={() => removeCategory(item._id)} 
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-all hover:bg-red-600"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    {list.length === 0 && <p className="text-gray-400 italic text-center py-10">No categories added to carousel yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default CategoryCarouselAdmin;