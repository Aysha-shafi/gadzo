import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // ------------------------------
  // Helper to set token in state & localStorage
  // ------------------------------
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // ------------------------------
  // Fetch Products
  // ------------------------------
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ------------------------------
  // Fetch User Cart
  // ------------------------------
  const getUserCart = async (authToken) => {
  if (!authToken) return;
  try {
    const res = await axios.post(
      `${backend_url}/api/cart/get`,
      {},
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    if (res.data.success) {
      setCartItems(res.data.cartData);
    }
  } catch (error) {
    console.log("Cart fetch error:", error.response?.data || error.message);

    // If token invalid or expired → remove it and redirect
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      setToken("");
      toast.error("Session expired. Please login again.");
      navigate("/login");
    } else {
      toast.error(error.response?.data?.message || error.message);
    }
  }
};
  // ------------------------------
  // Add to Cart
  // ------------------------------
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (!token) return;

    try {
      await axios.post(
        `${backend_url}/api/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ------------------------------
  // Update Cart Quantity
  // ------------------------------
  const updateQuantity = async (itemId, quantity) => {
    const newQty = Number(quantity);
    setCartItems((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) delete updated[itemId];
      else updated[itemId] = newQty;
      return updated;
    });

    if (!token) return;

    try {
      await axios.post(
        `${backend_url}/api/cart/update`,
        { itemId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ------------------------------
  // Cart Utilities
  // ------------------------------
  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, val) => acc + (val || 0), 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const qty = cartItems[id];
      const product = products.find((p) => p._id === id);
      if (product) total += product.price * qty;
    }
    return total;
  };

  // ------------------------------
  // Load token from localStorage on mount
  // ------------------------------
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  // ------------------------------
  // Fetch cart after token is set
  // ------------------------------
  useEffect(() => {
    if (token) getUserCart(token);
  }, [token]);

  // ------------------------------
  // Load products once
  // ------------------------------
  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backend_url,
    token,
    setToken: saveToken, // always store in localStorage via saveToken
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;