import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { CALCULATE_SUB_TOTAL } from "../../slices/cartSlice";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing checkout...");
  const [stripePromise, setStripePromise] = useState(null);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const email = useSelector((state) => state.auth.email);
  const name = useSelector((state) => state.auth.username);
  const shippingAddress = useSelector(
    (state) => state.checkout.shippingAddress
  );
  const billingAddress = useSelector((state) => state.checkout.billingAddress);
  const subTotal = useSelector((state) => state.cart.cartTotalAmount);
  const description = `Ecommerce Payment - email: ${email}, amount: ${(
    subTotal +
    5 +
    8.32
  ).toFixed(2)}`;

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    fetch("http://localhost:4242/config").then(async (res) => {
      const { publishableKey } = await res.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL());
  }, [dispatch, cartItems]);

  useEffect(() => {
    Loading.standard();

    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        email,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
        username: name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        Loading.remove();
      })
      .catch(() => {
        setMessage("Failed to initialize checkout!");
      });
    Loading.remove();
  }, [billingAddress, shippingAddress, cartItems, description, email, name]);

  return (
    <div>
      <div className="flex justify-center">
        {!clientSecret && <h3>{message}</h3>}
      </div>
      {stripePromise && clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm cartItems={cartItems} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
