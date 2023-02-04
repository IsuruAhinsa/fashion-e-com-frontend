import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/img/2.png";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

const navigation = {
  pages: [{ name: "Contact Us", to: "/contact" }],
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const cartTotalItems = useSelector((state) => state.cart.cartItems.length);

  const navigate = useNavigate();

  const authenticated = useAuth();

  const { username, email, avatar } = useSelector((state) => state.auth);

  const handleLogout = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.error(error.message);
      });
  };

  // Get the currently signed-in user
  useEffect(() => {
    if (username) {
      if (username == null) {
        // When Email Password Registration
        let displayName = email.substring(0, email.indexOf("@"));
        displayName =
          displayName.charAt(0).toUpperCase() + displayName.slice(1);
        setDisplayName(displayName);
      } else {
        setDisplayName(username);
      }
    } else {
      setDisplayName("");
    }
  }, [username, email]);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {authenticated && (
                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    <div className="flex text-sm font-medium text-gray-700 hover:text-gray-800 items-center hover:cursor-pointer">
                      <img
                        class="h-10 w-10 rounded-full mr-3"
                        src={authenticated ? avatar : ""}
                        alt=""
                      />
                      Hi, {displayName}
                    </div>
                  </div>
                )}

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {authenticated && (
                    <>
                      {navigation.pages.map((page) => (
                        <div key={page.name} className="flow-root">
                          <Link
                            to={page.to}
                            className="-m-2 block p-2 font-medium text-gray-900"
                          >
                            {page.name}
                          </Link>
                        </div>
                      ))}

                      <div className="flow-root">
                        <Link
                          to="/order-history"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          My Orders
                        </Link>
                      </div>

                      <div className="flow-root">
                        <Link
                          onClick={handleLogout}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Logout
                        </Link>
                      </div>
                    </>
                  )}
                  {!authenticated && (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/register"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src={logo} alt="" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center text-sm font-medium border-b-2 border-indigo-600 text-indigo-600`
                        : `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`
                    }
                  >
                    Home
                  </NavLink>

                  {navigation.pages.map((page) => (
                    <NavLink
                      key={page.name}
                      to={page.to}
                      className={({ isActive }) =>
                        isActive
                          ? `flex items-center text-sm font-medium border-b-2 border-indigo-600 text-indigo-600`
                          : `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`
                      }
                    >
                      {page.name}
                    </NavLink>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!authenticated && (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign in
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        to="/register"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Create account
                      </Link>
                    </>
                  )}

                  {displayName && (
                    <div className="text-sm font-medium text-gray-700 hover:text-gray-800 flex items-center hover:cursor-pointer">
                      <img
                        class="h-10 w-10 rounded-full mr-3"
                        src={authenticated ? avatar : ""}
                        alt=""
                      />
                      Hi, {displayName}
                    </div>
                  )}

                  {authenticated && (
                    <NavLink
                      to="/order-history"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      My Orders
                    </NavLink>
                  )}

                  {authenticated && (
                    <NavLink
                      to="/"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartTotalItems}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
