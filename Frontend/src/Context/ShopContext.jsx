import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "৳ ";
    const delivery_fee = 70;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [cartItems, setCartItems] = useState({});
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(true);

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: userToken } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // FIXED: Add to cart with strict number handling
    const addToCart = async (itemId, size, quantity = 1) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        setCartItems((prev) => {
            let cartData = structuredClone(prev);
            const qty = Number(quantity); // Ensure quantity is a number

            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += qty;
                } else {
                    cartData[itemId][size] = qty;
                }
            } else {
                cartData[itemId] = {};
                cartData[itemId][size] = qty;
            }
            return cartData;
        });

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size, quantity: Number(quantity) }, { headers: { token } });
                toast.success("Added to Bag");
            } catch (error) {
                console.error("Cart Add Error:", error);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) totalCount += Number(cartItems[items][item]);
            }
        }
        return totalCount;
    };

    // FIXED: Update quantity handler
    const updateQuantity = async (itemId, size, quantity) => {
        const qty = Number(quantity);
        
        setCartItems((prev) => {
            let cartData = structuredClone(prev);
            if (cartData[itemId]) {
                if (qty === 0) {
                    delete cartData[itemId][size];
                    if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
                } else {
                    cartData[itemId][size] = qty;
                }
            }
            return cartData;
        });

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity: qty }, { headers: { token } });
            } catch (error) {
                console.error("Cart Update Error:", error);
            }
        }
    };

    const getCartTotal = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0 && itemInfo) {
                    const price = itemInfo.offerPrice > 0 ? itemInfo.offerPrice : itemInfo.price;
                    totalAmount += Number(price) * Number(cartItems[items][item]);
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => { getProductsData(); }, []);

    useEffect(() => {
        if (token) getUserCart(token);
    }, [token]);

    const value = {
        products, currency, delivery_fee, backendUrl,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems,
        addToCart, getCartCount, updateQuantity, getCartTotal,
        navigate, token, setToken, getUserCart
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;