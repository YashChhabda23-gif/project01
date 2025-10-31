"use client";
import { useState, useEffect } from "react";

// Custom hook to force dark mode.
const useTheme = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
};

export default function LoginPage() {
  useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Read profile from localStorage (as saved by signup page)
    const user = JSON.parse(localStorage.getItem("profile"));
    if (
      user &&
      user.email === email &&
      user.password === password
    ) {
      setError("");
      setSuccess("✅ Login successful!");

      setTimeout(() => {
        window.location.href = "/landing";
      }, 1000);
    } else {
      setSuccess("");
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
      px-4 transition-colors duration-300">
      
      {/* Card */}
      <div className="w-full max-w-md 
        bg-gray-800/80 
        backdrop-blur-lg rounded-2xl shadow-xl p-8 
        border border-gray-700">
        
        {/* Eco Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full 
            bg-green-500 
            flex items-center justify-center 
            text-white text-3xl font-bold shadow-md overflow-hidden">
            <img
              src="/images/logo.jpg"
              alt="Eco Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-green-300 mt-4">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Log in to continue your eco journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-600 
              rounded-xl px-4 py-3 text-base 
              bg-gray-700 
              text-gray-200 
              focus:outline-none focus:ring-2 focus:ring-green-400 
              shadow-sm placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-600 
              rounded-xl px-4 py-3 text-base 
              bg-gray-700 
              text-gray-200 
              focus:outline-none focus:ring-2 focus:ring-green-400 
              shadow-sm placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-400 text-sm font-medium">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-sm font-medium">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-green-600 
              hover:from-emerald-600 hover:to-green-700 
              text-white font-bold py-3 rounded-xl w-full mt-2 
              shadow-md transition"
            style={{ letterSpacing: "1px" }}
          >
            LOG IN
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-green-400 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}