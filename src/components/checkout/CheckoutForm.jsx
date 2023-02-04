import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../Button";
import { OrderSummery } from "../checkout/OrderSummery";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import db from "../../firebase/config";
import { CLEAR_CART } from "../../slices/cartSlice";

const CheckoutForm = ({ cartItems }) => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);
  const email = useSelector((state) => state.auth.email);
  const subTotal = useSelector((state) => state.cart.cartTotalAmount);
  const shippingAddress = useSelector(
    (state) => state.checkout.shippingAddress
  );
  const billingAddress = useSelector((state) => state.checkout.billingAddress);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      email,
      orderDate: date,
      orderTime: time,
      orderAmount: subTotal + 5 + 8.32,
      orderStatus: {
        status: 'Placed',
        date: date,
        time: time,
      },
      cartItems,
      shippingAddress,
      billingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      navigate("/checkout-success");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          setMessage(result.error.message);
          return;
        }

        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <div>
      {/* Background color split screen for large screens */}
      <div
        className="hidden lg:block fixed top-0 left-0 w-1/2 bg-white"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block fixed top-0 right-0 w-1/2 h-screen bg-gray-100 -z-10"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <OrderSummery />

        <form
          className="pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
          onSubmit={handleSubmit}
        >
          <PaymentElement />
          <div className="my-4">
            <Button type="submit" disabled={isLoading || !stripe || !elements}>
              {isLoading ? "Loading..." : "Pay now"}
            </Button>
          </div>
          {message && <div>{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
