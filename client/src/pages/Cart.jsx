import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];

      if (quantity > 0) {
        const productInfo = products.find(p => p._id === itemId);

        if (productInfo) {
          tempData.push({
            ...productInfo,
            quantity: quantity,
            lineTotal: quantity * productInfo.price
          });
        }
      }
    }

    setCartData(tempData);

  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item) => (
          <div
            key={item._id}
            className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
          >
            <div className='flex items-start gap-6'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                <div className='flex items-center gap-5 mt-2'>
                  <p>{currency}{item.price}</p>
                </div>
              </div>
            </div>

            <input
              onChange={(e) =>
                updateQuantity(item._id, Number(e.target.value))
              }
              className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
              type="number"
              min={1}
              value={item.quantity}
            />

            <RiDeleteBin6Line
              onClick={() => updateQuantity(item._id, 0)}
              className='text-2xl mr-4 cursor-pointer'
            />
          </div>
        ))}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-5 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
