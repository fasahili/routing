import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Auth/SignUp.jsx";
import LogIn from "./components/Auth/LogIn.jsx";
import NoPage from "./pages/NoPage";
import React from "react";
import Home from "./pages/homePage/Home.js";
import Navbar from "./components/navbar/Navbar.js";
import { AuthProvider } from "./api/AuthContext.js";
import ContainerCounter from "./components/counter/counterContainer/CounterContainer.js";
import Users from "./components/users/userList/UserList.js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.js";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="logIn" element={<LogIn />} />

          <Route
            path="users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="counters"
            element={
              <ProtectedRoute>
                <ContainerCounter />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
