import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaRobot, FaSearch, FaArrowRight } from "react-icons/fa";
import bg from "../assets/authAI.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050816] text-white min-h-screen overflow-hidden">
      {/* ================= Navbar ================= */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold tracking-wide">
            AI<span className="text-purple-500"> Assistant</span>
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signUp")}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ================= Hero ================= */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* Glow */}
        <div className="absolute w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full top-10 left-20"></div>
        <div className="absolute w-80 h-80 bg-indigo-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-purple-700/30 border border-purple-500 text-sm mb-6">
              🚀 AI Powered Voice Assistant
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Your Smart
              <span className="block text-purple-500">
                AI Virtual Assistant
              </span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8 max-w-lg">
              Talk naturally, search instantly, answer questions, and boost your
              productivity using advanced AI technology.
            </p>

            <div className="flex gap-5 mt-10">
              <button
                onClick={() => navigate("/signUp")}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition cursor-pointer"
              >
                Start Free <FaArrowRight />
              </button>

              <button
                onClick={() => navigate("/signIn")}
                className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <img
              src={bg}
              alt="AI"
              className="w-[420px] drop-shadow-[0_0_40px_rgba(139,92,246,.6)] animate-pulse"
            />
          </div>
        </div>
      </section>

      {/* ================= Features ================= */}
      <section className="py-24 px-6 bg-[#0b1120]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-4">
            Everything You Need
          </h2>

          <p className="text-center text-gray-400 mb-16">
            Powerful AI features designed to make your life easier.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500 hover:-translate-y-2 transition duration-300 cursor-pointer">
              <FaMicrophone className="text-5xl text-purple-500 mb-5" />

              <h3 className="text-2xl font-semibold mb-4">Voice Commands</h3>

              <p className="text-gray-400 leading-7">
                Control your AI assistant using natural voice conversations with
                lightning-fast responses.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500 hover:-translate-y-2 transition duration-300 cursor-pointer">
              <FaRobot className="text-5xl text-purple-500 mb-5" />

              <h3 className="text-2xl font-semibold mb-4">Intelligent AI</h3>

              <p className="text-gray-400 leading-7">
                Powered by advanced AI models to answer questions, generate
                responses, and solve complex problems.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500 hover:-translate-y-2 transition duration-300 cursor-pointer">
              <FaSearch className="text-5xl text-purple-500 mb-5" />

              <h3 className="text-2xl font-semibold mb-4">Instant Search</h3>

              <p className="text-gray-400 leading-7">
                Search the web instantly and receive accurate information with
                voice or text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold">
              AI<span className="text-purple-500"> Assistant</span>
            </h2>

            <p className="text-gray-400 mt-2">
              Your personal AI companion for smarter productivity.
            </p>
          </div>

          <div className="flex gap-8 text-gray-400">
            <a href="#" className="hover:text-purple-500">
              Home
            </a>

            <a href="#" className="hover:text-purple-500">
              Features
            </a>

            <a href="#" className="hover:text-purple-500">
              About
            </a>

            <a href="#" className="hover:text-purple-500">
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 text-center text-gray-500 text-sm">
          © 2026 AI Assistant. Powered By❤️ Atiq.
        </div>
      </footer>
    </div>
  );
};

export default Home;
