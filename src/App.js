import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import UsersPage from "./pages/usersPage/UsersPage";

export default function App() {
  return (
    <div className="root-container">
      <Routes>
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </div>
  );
}
