import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';
import ResponsiveAppBar from '../ResponsiveAppBar';

const stripePromise = loadStripe("pk_test_51NDVcUJVbJVgaTyynzt3eEFYmAaUMhwBvFUB3ppoerEYt1vR9paBpTiXxI1gfvaAiiwN3sI2xlmaewvxk2emvweM00Ez0X9tZv");

function Stripe(props) {

  const {
    productDetail,
    calculateTotalPrice,
    fetchProduct
  } = props;

  return (
    <Elements stripe={stripePromise}>
      <ResponsiveAppBar/>
      <PaymentForm 
        productDetail={productDetail}
        calculateTotalPrice={calculateTotalPrice}
        fetchProduct={fetchProduct}
      />
    </Elements>
   )
}

export default Stripe