import React from 'react'
import { RiExchangeFundsFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { PiHeadsetBold } from "react-icons/pi";




const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm md:text-base text-gray-700'>
      <div>
       <RiExchangeFundsFill className=' text-4xl w-12 m-auto mb-5' />
  
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
      </div>
      <div>
       <FaCheckCircle className=' text-4xl w-12 m-auto mb-5' />
  
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>
      <div>
       <PiHeadsetBold className=' text-4xl w-12 m-auto mb-5' />
 
  
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We  provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
