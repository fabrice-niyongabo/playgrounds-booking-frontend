import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/controller/ProtectedRoute";
import UnProtectedRoute from "./components/controller/UnProtectedRoute";
import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Playground from "./components/playground";
import Print from "./components/print";
import Printer from "./components/Dashboard/printer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:id" element={<Playground />} />
          <Route exact path="/print/:id" element={<Print />} />
          <Route exact path="/printer/:keyword" element={<Printer />} />
          <Route exact path="/printer/" element={<Printer />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <UnProtectedRoute>
                <SignUp />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
