import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutFrom from './CheckoutFrom';




const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const booking = useLoaderData()
    // const navigation = useNavigation()
    // if (navigation.state === 'loading') {
    //     return <Loading></Loading>
    // }
    const { treatment, price, appointmentDate, slot } = booking
    return (
        <div>
            <h3 className='text-3xl'> payment {treatment}</h3>
            <p className='text-xl'> please pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;