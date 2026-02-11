import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBoxOpen, FaTruck, FaHashtag } from 'react-icons/fa';

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
                        // প্রতিটি আইটেমের সাথে অর্ডারের মেইন আইডি এবং অন্যান্য তথ্য যোগ করা হচ্ছে
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
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]'>
            {/* Header Section */}
            <div className='flex items-center gap-3 mb-8 border-l-4 border-[#FFA24C] pl-4'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-tight'>
                    My <span className='text-[#FFA24C]'>Orders</span>
                </h2>
            </div>

            <div className='flex flex-col gap-6'>
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFA24C]"></div>
                    </div>
                ) : orderData.length > 0 ? (
                    orderData.map((item, index) => (
                        <div key={index} className='bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300'>
                            
                            {/* Product Info Left Side */}
                            <div className='flex items-center gap-4 sm:gap-6'>
                                <div className="relative group">
                                    <img 
                                        className='w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50 border border-gray-100' 
                                        src={item.image[0]} 
                                        alt={item.name} 
                                    />
                                    <div className="absolute -top-2 -left-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                                        QTY: {item.quantity}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    {/* Order ID Badge */}
                                    <div className='flex items-center gap-2 mb-2'>
                                        <div className='flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200'>
                                            <FaHashtag size={10} className='text-gray-400'/>
                                            <span className='text-[10px] font-bold uppercase tracking-wider'>
                                                ID: {item.orderId.slice(-8).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <p className='text-sm md:text-lg font-bold text-gray-800 line-clamp-1'>{item.name}</p>
                                    
                                    <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600'>
                                        <p className="font-bold text-[#FFA24C] text-base">{currency}{item.price}</p>
                                        
                                        {item.size && (
                                            <span className="bg-gray-50 px-2 py-0.5 rounded text-xs font-medium border border-gray-200">
                                                Size: {item.size}
                                            </span>
                                        )}
                                        
                                        <span className="hidden sm:inline text-gray-300">|</span>
                                        <p className="text-gray-500 text-xs">{new Date(item.date).toDateString()}</p>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Payment:</span>
                                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FFA24C] border border-orange-100 uppercase">
                                            {item.paymentMethod}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status & Action Right Side */}
                            <div className='flex items-center justify-between md:justify-end md:gap-12 border-t md:border-t-0 pt-4 md:pt-0'>
                                
                                {/* Order Status */}
                                <div className='flex items-center gap-2'>
                                    <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-[#FFA24C]'}`}></div>
                                    <p className='text-sm font-semibold text-gray-700'>{item.status}</p>
                                </div>

                                {/* Track Button */}
                                <button 
                                    onClick={loadOrderData} 
                                    className='flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 text-xs font-bold rounded-xl hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm active:scale-95'
                                >
                                    <FaTruck size={14} />
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-100 p-8 rounded-full mb-6">
                            <FaBoxOpen size={60} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No Orders Found</h3>
                        <p className="text-gray-500 mt-2 max-w-xs mx-auto">Looks like you haven't made your first order yet. Explore our latest collection!</p>

                        <Link to={'/collection'} className="mt-10">
                            <button className="group relative px-8 py-4 bg-black rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 overflow-hidden cursor-pointer">
                                <span className="relative z-10 flex items-center gap-3">
                                    Start Shopping
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FFA24C] to-[#ff7b00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;