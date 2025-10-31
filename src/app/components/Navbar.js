"use client";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-sm">
      {/* Left side logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
        <span className="font-bold text-green-600 text-xl">Gameified</span>
      </div>

      {/* Right side language */}
      <div className="text-sm text-gray-500 cursor-pointer">
        SITE LANGUAGE: <span className="font-semibold">ENGLISH ▾</span>
      </div>
    </nav>
  );
}
