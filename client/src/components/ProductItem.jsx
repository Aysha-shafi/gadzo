import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
      <div className="relative w-full aspect-[1/1] flex items-center justify-center bg-gray-100 rounded-none overflow-hidden">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="absolute w-full h-full object-contain p-4 transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>


      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>

    </Link>
  )
}

export default ProductItem
