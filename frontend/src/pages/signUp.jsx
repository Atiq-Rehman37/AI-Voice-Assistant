import React, { useState, useContext } from "react";
import bg from "../assets/authAI.png";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { serverUrl, setUserData, userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formhandler = async (e) => {
    e.preventDefault();

    const data = { name, email, password };

    try {
      const res = await axios.post(`${serverUrl}/api/auth/signup`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserData(res.data);
      // clear fields
      setName("");
      setEmail("");
      setPassword("");

      // redirect
      navigate("/customize");
    } catch (error) {
      setUserData(null);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold tracking-wide text-white">
            AI<span className="text-purple-500"> Assistant</span>
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition text-white cursor-pointer"
            >
              Back To Home
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <p className="text-center text-gray-300 mb-6 text-sm">
          to Virtual Assistant 🤖
        </p>

        <form className="space-y-5" onSubmit={formhandler}>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-300" />
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-300" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-300" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-all duration-300 font-semibold cursor-pointer hover:from-purple-600 hover:to-indigo-600 shadow-lg"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <span
              className="text-purple-300 cursor-pointer hover:underline"
              onClick={() => navigate("/signIn")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
