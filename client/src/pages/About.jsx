import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Gadzo is your go-to destination for the latest and greatest in tech. From cutting-edge smartphones to smart home devices, we bring you gadgets that enhance your lifestyle and keep you ahead of the tech curve. Our mission is simple: to make technology accessible, exciting, and reliable for everyone.</p>
          <p>We believe technology should simplify life, not complicate it. That’s why Gadzo is committed to providing detailed reviews, expert advice, and a seamless shopping experience. Our goal is to empower you to make informed choices and stay connected in a rapidly evolving digital world.</p>
          <b className='text-gray-800'> Our Mission</b>
          <p>At Gadzo, our mission is to make cutting-edge technology accessible and meaningful for everyone. We strive to bring the latest gadgets and innovations to your fingertips, helping you enhance your lifestyle, stay connected, and make smarter tech choices. We are dedicated to quality, reliability, and creating an exceptional experience for every tech enthusiast who visits us.</p>
        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>At Gadzo, quality is at the heart of everything we do. Every gadget we offer undergoes strict testing and meticulous inspection to ensure it meets the highest standards of performance, durability, and reliability. From sourcing premium components to rigorous final checks, our commitment is to deliver products that you can trust. With Gadzo, you’re not just buying gadgets—you’re investing in quality, innovation, and peace of mind.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>At Gadzo, we make shopping for gadgets simple, fast, and hassle-free. Our user-friendly website is designed to help you find exactly what you need with just a few clicks. From smooth navigation and secure payments to quick delivery and easy returns, every step is built to give you a seamless shopping experience. With Gadzo, convenience meets technology—right at your fingertips.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>At Gadzo, we believe that great service is just as important as great products. Our dedicated support team is always ready to assist you—whether it’s answering your questions, helping you choose the right gadget, or resolving issues quickly and efficiently. We value every customer and strive to make your shopping experience smooth, satisfying, and worry-free. With Gadzo, you’re never alone—we’re here to help every step of the way.</p>
        </div>


      </div>
      <NewsletterBox/>

    </div>
  )
}

export default About
