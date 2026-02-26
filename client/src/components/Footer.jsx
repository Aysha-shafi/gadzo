import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt -40 text-sm '>
                <div>
                    <img src={assets.logo} className='mb-1 w-32 ' alt="" />
                    <p className='text-gray-400 w-full md:w-2/3'>Gadzo is your trusted destination for the latest and most reliable gadgets. We’re committed to bringing you innovative products that combine quality, performance, and style. Follow us on our social channels, subscribe to our newsletter, and stay updated on the newest arrivals, exclusive offers, and expert tips. Gadzo – technology you can trust.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mt-15'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600 mt-6'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mt-14'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600 mt-6'>
                        <li>+1-212-456-7890</li>
                        <li>xyz@mail.com</li>

                    </ul>
                </div>

                
            </div>
            <div>
                <hr />
                <p className='py-5  text-sm text-center'>Copyright 2025@ gadzo.com - All Rights Reserved.

                </p>
            </div>
        </div>
    )
}

export default Footer
