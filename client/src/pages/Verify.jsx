import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItems, backend_url } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backend_url + '/api/order/verifyStripe', { orderId, success }, { headers: { Authorization: `Bearer ${token}` } })
      if(response.data.success){
        setCartItems({});
        toast.success(response.data.message);
        navigate('/orders');
      } else {
        toast.error(response.data.message);
        navigate('/cart');
      }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
            
            

        }

    }
    useEffect(() => {

        verifyPayment()
    }, [token])
    return (
        <div>

        </div>
    )
}

export default Verify
