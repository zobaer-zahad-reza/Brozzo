import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHashtag } from 'react-icons/fa';
import { Box, Truck, ArrowLeft, RefreshCw } from 'lucide-react';

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrderData = async () => {
        try {
            if (!token) return null;

            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });

            if (response.data.success) {
                let allOrdersItem = [];

                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['orderId'] = order._id; 
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className="bg-black min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans text-gray-200">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-zinc-900 pb-6">
                    <div className="inline-flex items-center gap-3">
                        <p className="text-zinc-500 text-lg md:text-2xl uppercase tracking-[3px]">
                            My <span className="text-white font-black">Orders</span>
                        </p>
                        <div className="hidden sm:block w-12 h-[2px] bg-[#FF4955]"></div>
                    </div>
                    
                </div>

                <div className="flex flex-col gap-5">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-24 gap-4">
                            <div className="w-10 h-10 border-2 border-[#FF4955] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[10px] font-black uppercase tracking-[3px] text-zinc-600">Retrieving History...</p>
                        </div>
                    ) : orderData.length > 0 ? (
                        orderData.map((item, index) => (
                            <div key={index} className="bg-[#111113] rounded-2xl p-5 border border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-zinc-700 transition-all duration-300 group">
                                
                                {/* Image & Product Info */}
                                <div className="flex items-center gap-5 sm:gap-8">
                                    <div className="relative shrink-0">
                                        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                                            <img 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                src={item.image[0]} 
                                                alt={item.name} 
                                            />
                                        </div>
                                        <div className="absolute -top-2 -left-2 bg-[#FF4955] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-xl uppercase tracking-tighter">
                                            x{item.quantity}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#FF4955] bg-[#FF4955]/10 px-2 py-0.5 rounded border border-[#FF4955]/20">
                                                ID: {item.orderId.slice(-8).toUpperCase()}
                                            </span>
                                        </div>

                                        <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#FF4955] transition-colors">
                                            {item.name}
                                        </h3>
                                        
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs">
                                            <p className="font-black text-white">{currency}{item.price}</p>
                                            
                                            {item.size && (
                                                <p className="text-zinc-500 font-bold uppercase">Size: <span className="text-zinc-300">{item.size}</span></p>
                                            )}
                                            
                                            <span className="hidden sm:inline text-zinc-800">|</span>
                                            <p className="text-zinc-500">{new Date(item.date).toDateString()}</p>
                                        </div>

                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-[9px] uppercase font-black text-zinc-600 tracking-widest">Payment:</span>
                                            <span className="text-[9px] font-black px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase tracking-tighter">
                                                {item.paymentMethod}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Action */}
                                <div className="flex items-center justify-between md:justify-end md:gap-10 border-t md:border-t-0 border-zinc-900 pt-4 md:pt-0">
                                    
                                    {/* Order Status */}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-[#FF4955] animate-pulse'}`}></div>
                                        <p className="text-xs font-black uppercase tracking-[1px] text-white">
                                            {item.status}
                                        </p>
                                    </div>

                                    {/* Track Button */}
                                    <button 
                                        onClick={loadOrderData} 
                                        className="flex items-center gap-2 bg-[#18181b] border border-zinc-800 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-95 shadow-lg shadow-black/20"
                                    >
                                        <Truck size={14} className="text-[#FF4955]" />
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 bg-[#111113] border border-zinc-800 rounded-full flex items-center justify-center mb-8 shadow-2xl">
                                <Box size={40} className="text-zinc-700" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest">No Orders Yet</h3>
                            <p className="text-zinc-500 mt-3 max-w-xs mx-auto text-sm">
                                Your order history is currently empty. Explore our collection to find your next favorite piece.
                            </p>

                            <Link to="/collection" className="mt-10">
                                <button className="px-10 py-4 bg-[#FF4955] text-white font-black uppercase text-xs tracking-[3px] rounded-xl hover:bg-[#e63e49] transition-all shadow-xl shadow-[#ff49552a] flex items-center gap-3 active:scale-95">
                                    Browse Collection
                                    <ArrowLeft className="rotate-180" size={16} />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;