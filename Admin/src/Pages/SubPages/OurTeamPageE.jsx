import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUploadCloud, FiUser, FiBriefcase, FiType } from "react-icons/fi";
import { MdOutlineColorLens } from "react-icons/md";
import TeamList from '../../Components/TeamList';
import DescriptionEditor from '../../Components/DescriptionEditor';

const OurTeamPageE = ({ token, backendUrl }) => {
    const [image, setImage] = useState(false);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState(""); 
    const [bgColour, setBgColour] = useState("#ffffff");
    const [isReverse, setIsReverse] = useState(false);
    const [isLeadership, setIsLeadership] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) return toast.error("Please upload an image");
        
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("role", role);
            formData.append("bgColour", bgColour);
            formData.append("isReverse", isReverse);
            formData.append("isLeadership", isLeadership);
            formData.append("image", image);
            
            // Backend expectation: Array of messages
            formData.append("message", JSON.stringify([message]));

            const response = await axios.post(`${backendUrl}/api/team/add`, formData, { headers: { token } });

            if (response.data.success) {
                toast.success("Team Member Added!");
                // Clear Form
                setName(""); 
                setRole(""); 
                setMessage(""); 
                setImage(false);
                setIsLeadership(false);
                setBgColour("#ffffff");
                setIsReverse(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto'>
                <h2 className='text-2xl font-black text-gray-800 uppercase tracking-tight'>Team Management</h2>

                <div className='mb-4'>
                    <p className='mb-3 font-bold text-gray-700'>Profile Photo</p>
                    <label htmlFor="image" className="cursor-pointer">
                        {!image ? (
                            <div className="w-32 h-44 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50 hover:bg-orange-50 hover:border-[#FEA24C] transition-all group">
                                <FiUploadCloud className="text-3xl text-gray-400 group-hover:text-[#FEA24C]" />
                                <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">Upload</span>
                            </div>
                        ) : (
                            <img className='w-32 h-44 object-cover rounded-2xl shadow-md border-2 border-[#FEA24C]' src={URL.createObjectURL(image)} alt="Preview" />
                        )}
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='w-full'>
                        <p className='mb-2 font-bold text-gray-600 flex items-center gap-2'><FiUser className='text-[#FEA24C]' /> Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#FEA24C]' type="text" placeholder="Full Name" required />
                    </div>
                    <div className='w-full'>
                        <p className='mb-2 font-bold text-gray-600 flex items-center gap-2'><FiBriefcase className='text-[#FEA24C]' /> Role</p>
                        <input onChange={(e) => setRole(e.target.value)} value={role} className='w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#FEA24C]' type="text" placeholder="Designation" required />
                    </div>
                </div>

                <div className='flex flex-wrap items-center gap-8 my-4 p-5 bg-gray-50 rounded-xl w-full border border-gray-100 shadow-inner'>
                    <label className='flex items-center gap-3 cursor-pointer'>
                        <input type="checkbox" checked={isLeadership} onChange={() => setIsLeadership(!isLeadership)} className='w-5 h-5 accent-[#FEA24C]' />
                        <span className='font-bold text-gray-700'>Leadership Section?</span>
                    </label>
                    {isLeadership && (
                        <label className='flex items-center gap-3 cursor-pointer'>
                            <input type="checkbox" checked={isReverse} onChange={() => setIsReverse(!isReverse)} className='w-5 h-5 accent-[#FEA24C]' />
                            <span className='font-bold text-gray-700'>Reverse Layout?</span>
                        </label>
                    )}
                </div>

                {isLeadership && (
                    <div className='w-full space-y-6'>
                        <div>
                            <p className='mb-2 font-bold text-gray-600 flex items-center gap-2'><MdOutlineColorLens className='text-[#FEA24C]' /> Background</p>
                            <input type="color" value={bgColour} onChange={(e) => setBgColour(e.target.value)} className='w-24 h-12 cursor-pointer rounded-lg' />
                        </div>
                        <div className='w-full'>
                            <p className='mb-4 font-bold text-gray-600 flex items-center gap-2'><FiType className='text-[#FEA24C]' /> Message</p>
                            <DescriptionEditor value={message} onChange={setMessage} />
                        </div>
                    </div>
                )}

                <button type="submit" disabled={loading} className='w-full md:w-64 py-4 bg-black text-white font-black rounded-full hover:bg-[#FEA24C] transition-all uppercase tracking-widest text-xs mt-6'>
                    {loading ? "SAVING..." : "SAVE MEMBER"}
                </button>
            </form>

            <div className="mt-12 max-w-4xl mx-auto">
                <TeamList token={token} backendUrl={backendUrl} />
            </div>
        </div>
    );
};

export default OurTeamPageE;