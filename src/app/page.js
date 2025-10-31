"use client";
import Link from "next/link";
import { Fredoka } from "next/font/google";
import { useEffect } from "react";

// Font setup
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// A simple hook to force dark mode
const useTheme = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
};

export default function Home() {
  useTheme();
  return (
    <main
      className={`${fredoka.className} flex flex-col md:flex-row items-center justify-center min-h-screen 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
      px-6 transition-colors duration-500`}
    >
      {/* Left side image */}
      <div className="flex-1 flex justify-center mb-10 md:mb-0">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl shadow-2xl border-4 
        border-green-700 bg-gray-800 
        overflow-hidden transform hover:scale-105 transition duration-500">
          <img
            src="/images/enivornment.png"
            alt="Environment"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Right side content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold 
        text-green-400 mb-4 leading-snug drop-shadow-sm">
          Learn. Grow. Protect 🌱
        </h1>

        <p className="text-base md:text-xl text-green-300 
        mb-10 max-w-md">
          Join us on a journey to learn about our planet and take action for a
          greener, brighter future!
        </p>

        <div className="flex flex-col gap-4 w-64">
          <Link href="/signup">
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 
            hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 
            rounded-xl shadow-lg transition transform hover:scale-105">
              🌍 Get Started
            </button>
          </Link>

          <Link href="/login">
            <button className="w-full border-2 border-green-600 
            text-green-300 hover:bg-gray-700 
            font-semibold py-3 rounded-xl shadow-md transition">
              I Already Have an Account
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
