import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components";
import {
  Home,
  AddProduct,
  CheckProducts,
  Contact,
  ScanShipment,
  Login,
  Signup,
  DisplayProduct,
} from "./pages";
import { Navbar } from "./components";
const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... min-h-screen flex flex-row">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/AddProduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DisplayProduct"
            element={
              <ProtectedRoute>
                <DisplayProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CheckProducts"
            element={
              <ProtectedRoute>
                <CheckProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ScanShipment"
            element={
              <ProtectedRoute>
                <ScanShipment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
