"use client";
import { useState } from "react";
import React from "react";

// This hook is no longer needed since we are forcing dark mode
const useTheme = () => {
  // useEffect is intentionally empty to remove dynamic theme logic
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
};

export default function SignupPage() {
  useTheme();
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSuccess("");
      setError("❌ Passwords do not match");
      return;
    }

    const newUser = {
      name: username,
      college,
      email,
      phone,
      instagram,
      github,
      password,
      completedModules: [],
      points: 0,
      plants: 0,
      hackathons: 0,
    };
    localStorage.setItem("profile", JSON.stringify(newUser));

    setError("");
    setSuccess("✅ Account created successfully!");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center 
      bg-gray-900 px-6 py-10 transition-colors duration-300"
    >
      {/* Left: Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16">
        <h2 className="text-3xl font-bold mb-2 text-gray-100">
          Sign Up
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Join us and start your journey!
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-400 
            border-gray-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-400 
            border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="College / School"
            className="border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-400 
            border-gray-600"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-400 
            border-gray-600"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Instagram (e.g. @yourhandle)"
            className="border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-400 
            border-gray-600"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <input
            type="text"
            placeholder="GitHub (e.g. github.com/yourname)"
            className="border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-400 
            border-gray-600"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create Password"
            className="border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-green-400 
            border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={`border rounded-lg px-4 py-2 
            bg-gray-800 
            text-gray-200 
            focus:outline-none focus:ring-2 
            ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-green-400 border-gray-600"
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="bg-green-500 hover:bg-green-600 
            text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-400 font-medium hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>

      {/* Right: Image Placeholder */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <img
            src="/images/signup.png"
            alt="Environment"
            className="object-cover w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}