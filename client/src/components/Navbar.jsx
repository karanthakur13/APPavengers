import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/Userauth";
import { useStateContext } from "../context";
import logo from "./logo.png";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { user, logout } = useUserAuth();
  const { address, connect } = useStateContext();

  const Supplier = "4svbuXCOHPRW9IajtuyTjjG9zya2";
  const Manufacturer = "Ws5SVjGhrIgcrrHSCcwYh0y2HYf1";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <img src={logo} className="h-20 " alt="GoodsChain Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            AppAvengers NFT
          </span>
        </a>
        <div className="flex md:order-2">
          {address ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {address.slice(0, 6) + "..." + address.slice(38, 42)}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => connect()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Connect
            </button>
          )}
        </div>
        <div className="flex md:order-2">
          <button
            type="button"
            onClick={handleLogout}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/CheckProducts"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Scan NFT
              </Link>
            </li>

            {user.uid === Manufacturer && (
              <li>
                <Link
                  to="/AddProduct"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Mint NFT
                </Link>
              </li>
            )}
            {user.uid === Supplier && (
              <li>
                <Link
                  to="/ScanShipment"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Modify NFT
                </Link>
              </li>
            )}
            <li>
              <Link
                to="https://www.linkedin.com/in/karan-singh-thakur-34735020b/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Responsive Drawer */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setShowDrawer(!showDrawer)}
            className="text-gray-800 dark:text-white p-2 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Navbar Items for Small Devices */}
        <div
          className={`items-center justify-between w-full md:hidden ${
            showDrawer ? "block" : "hidden"
          }`}
        >
          <ul className="gap-[10px] flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/CheckProducts"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Scan NFT
              </Link>
            </li>

            {user.uid === Manufacturer && (
              <li>
                <Link
                  to="/AddProduct"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Mint NFT
                </Link>
              </li>
            )}
            {user.uid === Supplier && (
              <li>
                <Link
                  to="/ScanShipment"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Modify NFT
                </Link>
              </li>
            )}
            <li>
              <Link
                to="https://www.linkedin.com/in/karan-singh-thakur-34735020b/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
