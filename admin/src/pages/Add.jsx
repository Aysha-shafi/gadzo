import React, { useState } from 'react'
import { assets } from '../assets/assets'
import '../index.css'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'
import { MdCloudUpload } from "react-icons/md";


const Add = () => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Mobile')
  const [subCategory, setSubCategory] = useState('Apple')

  const [price, setPrice] = useState('')
  const [bestseller, setBestseller] = useState(false)
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('price', price)
      formData.append('bestseller', bestseller)

      const token = localStorage.getItem('token')

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setCategory('')
        setSubCategory('')
        setPrice('')
        setBestseller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.response?.data || error.message)
      toast.error(error.response?.data?.message || error.message)
    }
  }





  return (
    <form onSubmit={onSubmitHandler} className=" p-6 flex flex-col w-full  items-start gap-3 rounded-xl">
      <p className="text-lg font-semibold mb-4">Upload Images</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((num) => {
          const image =
            num === 1 ? image1 :
              num === 2 ? image2 :
                num === 3 ? image3 :
                  image4

          return (
            <label
              key={num}
              htmlFor={`image${num}`}
              className="flex items-center bg-orange-50 justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
                className={`rounded-xl 
    ${image
                    ? "w-full h-full object-cover"
                    : "w-12 h-12 object-contain opacity-60"
                  }`
                }
              />



              <input
                type="file"
                id={`image${num}`}
                hidden
                onChange={(e) => {
                  if (num === 1) setImage1(e.target.files[0])
                  if (num === 2) setImage2(e.target.files[0])
                  if (num === 3) setImage3(e.target.files[0])
                  if (num === 4) setImage4(e.target.files[0])
                }}
              />
            </label>
          )
        })}
      </div>

      {/* Product name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          required
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-[700px]"
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write content here"
          required
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-[700px]"
        />
      </div>

      {/* Category / Brand / Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="w-full sm:w-auto">
          <p>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)}
            value={category} className="border border-gray-300 rounded-lg p-2 w-full sm:w-[200px]">
            <option>Mobile</option>
            <option>Laptop</option>
            <option>Accessories</option>
            <option>Electronics</option>
            <option>Desktop</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <p>Brands</p>
          <select onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory} className="border border-gray-300 rounded-lg p-2 w-full sm:w-[200px]">
            <option>Apple</option>
            <option>Samsung</option>
            <option>Bose</option>
            <option>Dell</option>
            <option>Sony</option>
            <option>Lenovo</option>
            <option>Anker</option>
            <option>Asus</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <p>Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-[200px]"
          />
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={(e) => setBestseller(prev => !prev)}
          checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer ml-2" htmlFor="bestseller" >
          Add to Bestseller
        </label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>
        ADD
      </button>
    </form>
  )
}

export default Add
