import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Contact, Login, Register, Reset, NotFound } from "./pages";
import { AdminGuard } from "./utils/AdminGuard";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "./pages/auth/authSlice";
import { SAVE_PRODUCTS } from "./pages/admin/productSlice.js";
import useFetchCollection from "./hooks/useFetchCollection";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import CheckoutForm from "./pages/checkout/CheckoutForm";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const dispatch = useDispatch();
  const { data } = useFetchCollection("products");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(SET_ACTIVE_USER(user));
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(SAVE_PRODUCTS(data));
  }, [dispatch, data]);

  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/product-details/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-form" element={<CheckoutForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin/*"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        />
      </Routes>
    </>
  );
}

export default App;
