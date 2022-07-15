import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import UsersPage from "./pages/usersPage/UsersPage";
import UserPage from "./pages/userPage/UserPage";

export default function App() {
  return (
    <div className="root-container">
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}
