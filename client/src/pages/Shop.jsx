import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { IoMdArrowDropright } from "react-icons/io";
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Shop = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilters, setShowFilters] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubcategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }

  }
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubcategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice()
    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))

    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))

    }
    setFilterProducts(productCopy)
  }
  const sortProducts = () => {
    let fpCopy = filterProducts.slice()
    switch (sortType) {

      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price)
        setFilterProducts(fpCopy)
        break;
      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price)
        setFilterProducts(fpCopy)
        break;
      default:
        setFilterProducts(fpCopy)
    }
  }





  useEffect(() => {
    applyFilter()

  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    if (sortType === 'relevant') {
      applyFilter();
    } else {
      sortProducts()
    }
  }, [sortType])

  return (
    <div className='flex flex-col  sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilters(!showFilters)} className='my-2 text-xl flex items-center cursor-pointer  gap-2'>FILTERS
          <IoMdArrowDropright className={` h-3 sm:hidden ${showFilters ? 'rotate-90' : ""}`} />


        </p>
        {/* Categories filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Mobile'} onChange={toggleCategory} />Mobile
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Laptops'} onChange={toggleCategory} />Laptops
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Accessories'} onChange={toggleCategory} />Accessories
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Electronics'} onChange={toggleCategory} />Electronics
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Desktop'} onChange={toggleCategory} />Desktop
            </p>
          </div>

        </div>
        {/*Subcategory Filter */}


        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>BRANDS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Apple'} onChange={toggleSubCategory} />Apple
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Samsung'} onChange={toggleSubCategory} />Samsung
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bose'} onChange={toggleSubCategory} />Bose
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dell'} onChange={toggleSubCategory} />Dell
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sony'} onChange={toggleSubCategory} />Sony
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Lenovo'} onChange={toggleSubCategory} />Lenovo
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Anker'} onChange={toggleSubCategory} />Anker
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Asus'} onChange={toggleSubCategory} />Asus
            </p>
          </div>

        </div>

      </div>
      {/*Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL '} text2={'PRODUCTS'} />
          {/*Product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by Relevant</option>
            <option value="low-high">Sort by Low to High</option>
            <option value="high-low">Sort by Hight to Low</option>

          </select>

        </div>
        {/*Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={item._id}
                name={item.name} id={item._id}
                price={item.price} image={item.image} />
            ))
          }


        </div>

      </div>

    </div>
  )
}

export default Shop
