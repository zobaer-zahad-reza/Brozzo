import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Upload, Palette, LayoutGrid } from 'lucide-react';

const PromoBentoGridAdmin = ({ backendUrl, token }) => {
    const [image, setImage] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [bgColor, setBgColor] = useState("#3E3E3E");
    const [position, setPosition] = useState(1);
    const [list, setList] = useState([]);

    const categories = [
        "Watch", "Fashion", "Beauty & Personal Care", "Health & Household", 
        "Home & Kitchen", "Electronics", "Toys & Games", "Baby Products", 
        "Pet Supplies", "Arts, Crafts & Sewing", "Office Products", 
        "Sports & Outdoors", "Automotive Accessories",
    ];

    const fetchBentoData = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/bento/list');
            if (res.data.success) setList(res.data.data);
        } catch (error) {
            console.error("Error fetching bento data", error);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (!category) {
            toast.error("Please select a target category!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("position", position);
            formData.append("title", title);
            formData.append("category", category);
            formData.append("bgColor", bgColor);
            if (image) formData.append("image", image);

            const response = await axios.post(backendUrl + '/api/bento/update', formData, { headers: { token } });
            
            if (response.data.success) {
                toast.success(`Grid Position ${position} Updated!`);
                setImage(false);
                setTitle("");
                setCategory("");
                fetchBentoData();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) { 
            toast.error(error.message); 
        }
    };

    useEffect(() => { fetchBentoData(); }, []);

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center gap-2 mb-6">
                <LayoutGrid className="text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-800">Manage Promo Bento Grid</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Admin Form */}
                <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-xl shadow-md max-w-2xl border flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Position Selector */}
                        <div>
                            <p className="mb-2 font-semibold text-gray-700">Select Position (1-5)</p>
                            <select 
                                value={position} 
                                onChange={(e)=>setPosition(e.target.value)} 
                                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            >
                                <option value="1">1 - Main Large Left</option>
                                <option value="2">2 - Middle Top</option>
                                <option value="3">3 - Middle Bottom Left</option>
                                <option value="4">4 - Middle Bottom Right</option>
                                <option value="5">5 - Right Vertical</option>
                            </select>
                        </div>

                        {/* Background Color Picker */}
                        <div>
                            <p className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <Palette size={18} /> Background Color
                            </p>
                            <div className="flex items-center gap-3 p-2 border rounded-lg bg-gray-50">
                                <input 
                                    type="color" 
                                    value={bgColor} 
                                    onChange={(e)=>setBgColor(e.target.value)} 
                                    className="w-12 h-10 border-none bg-transparent cursor-pointer" 
                                />
                                <span className="font-mono text-sm uppercase text-gray-600">{bgColor}</span>
                            </div>
                        </div>
                    </div>

                    {/* Title Input */}
                    <div className="mt-6">
                        <p className="mb-2 font-semibold text-gray-700">Title (Use &lt;br/&gt; for line break)</p>
                        <input 
                            value={title} 
                            onChange={(e)=>setTitle(e.target.value)} 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-200 outline-none" 
                            placeholder="e.g. FASHION <br/> deals" 
                            required 
                        />
                    </div>

                    {/* Target Category Select */}
                    <div className="mt-6">
                        <p className="mb-2 font-semibold text-gray-700">Target Category (for shop link)</p>
                        <select 
                            value={category} 
                            onChange={(e)=>setCategory(e.target.value)} 
                            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-orange-200 outline-none appearance-none"
                            required
                        >
                            <option value="">-- Choose a Category --</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-400 mt-1">This will filter products in the collection page.</p>
                    </div>

                    {/* Image Upload */}
                    <div className="mt-6">
                        <p className="mb-2 font-semibold text-gray-700">Upload Transparent Image</p>
                        <label className="cursor-pointer inline-block">
                            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-all group">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} className="w-full h-full object-contain" alt="preview" />
                                ) : (
                                    <Upload className="text-gray-400 group-hover:text-orange-500 transition-colors" size={32} />
                                )}
                            </div>
                            <input type="file" onChange={(e)=>setImage(e.target.files[0])} hidden />
                        </label>
                    </div>

                    <button className="mt-8 w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-all transform active:scale-[0.98] shadow-lg">
                        UPDATE BENTO GRID BOX
                    </button>
                </form>

                {/* Live Preview List */}
                <div className="flex-1 bg-white p-6 rounded-xl border shadow-sm h-fit">
                    <h3 className="font-bold text-gray-800 mb-4">Active Grid Status</h3>
                    <div className="space-y-3">
                        {list.length > 0 ? list.sort((a,b)=> a.position - b.position).map((item) => (
                            <div key={item._id} className="flex items-center gap-4 p-3 border rounded-lg">
                                <div className="w-12 h-12 rounded flex-shrink-0" style={{backgroundColor: item.bgColor}}>
                                    <img src={item.image} className="w-full h-full object-contain p-1" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-orange-600">Position {item.position}</p>
                                    <p className="text-sm font-semibold truncate" dangerouslySetInnerHTML={{__html: item.title}}></p>
                                    <p className="text-[10px] text-gray-500 uppercase">{item.category}</p>
                                </div>
                            </div>
                        )) : <p className="text-gray-400 text-sm italic">No data published yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoBentoGridAdmin;