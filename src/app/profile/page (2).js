"use client";
import { useState, useEffect } from "react";
import React from "react";

/**
 * Custom hook to force dark mode.
 */
const useTheme = () => {
  useEffect(() => {
    // Force the 'dark' class on the root HTML element
    document.documentElement.classList.add("dark");
  }, []);
};

const MODULES = [
  { id: 1, name: "Basics", badge: "/badges/basics.png" },
  { id: 2, name: "DIY", badge: "/badges/diy.png" },
  { id: 3, name: "Community", badge: "/badges/community.png" },
];

export default function ProfilePage() {
  useTheme();
  const [media, setMedia] = useState([]);
  const [profile, setProfile] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "+91 9876543210",
    college: "ABC Engineering College",
    instagram: "@guest_insta",
    github: "github.com/guestuser",
    points: 1120,
    plants: 7,
    hackathons: 2,
    completedModules: [],
  });

  // Load profile and media from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};
      const storedMedia = JSON.parse(localStorage.getItem("media")) || [];
      setProfile((prev) => ({ ...prev, ...storedProfile }));
      setMedia(storedMedia);
    }
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMedia = [...media, reader.result];
        setMedia(newMedia);
        localStorage.setItem("media", JSON.stringify(newMedia));
      };
      reader.readAsDataURL(file);
    });
  };

  // Delete media
  const handleDelete = (index) => {
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);
    localStorage.setItem("media", JSON.stringify(newMedia));
  };

  // Simulate module completion (for demo)
  const completeModule = (id) => {
    if (!profile.completedModules.includes(id)) {
      const updated = [...profile.completedModules, id];
      setProfile({ ...profile, completedModules: updated });
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...profile, completedModules: updated })
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 bg-gray-900/80 p-4 flex-col items-start fixed top-0 left-0 h-screen z-30 border-r border-gray-700">
        <h1 className="text-2xl font-bold text-green-500 mb-6">GreenVision</h1>
        <nav className="flex flex-col gap-4 w-full flex-1">
          <a href="/landing" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">🏠 Learn</a>
          <a href="/diy" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">🛠️ DIY</a>
          <a href="/leaderboards" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">🏆 Leaderboards</a>
          <a href="/quests" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">🎯 Quests</a>
          <a href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-900 text-green-200 font-semibold">👤 Profile</a>
          <a href="/shop" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">🛒 Shop</a>
        </nav>
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-3 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">G</div>
          <div className="text-sm font-semibold">GreenVision</div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around p-2 bg-gray-900/80 border-t border-gray-700 backdrop-blur-sm">
        <a href="/landing" className="flex flex-col items-center text-xs text-gray-200 p-2"><span>🏠</span><span>Learn</span></a>
        <a href="/diy" className="flex flex-col items-center text-xs text-gray-200 p-2"><span>🛠️</span><span>DIY</span></a>
        <a href="/leaderboards" className="flex flex-col items-center text-xs text-gray-200 p-2"><span>🏆</span><span>Leaderboard</span></a>
        <a href="/quests" className="flex flex-col items-center text-xs text-gray-200 p-2"><span>⚡</span><span>Quests</span></a>
        <a href="/profile" className="flex flex-col items-center text-xs text-green-400 font-semibold p-2"><span>👤</span><span>Profile</span></a>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-56 p-4 md:p-8 min-h-screen">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-800 shadow-xl rounded-2xl p-8 mb-8 border border-green-900">
          <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-green-700 to-green-900 text-4xl font-bold rounded-full shadow-lg">
            P
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              <span className="bg-green-900 text-green-200 px-3 py-1 rounded-full text-xs font-semibold">{profile.college}</span>
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">{profile.email}</span>
              <span className="bg-gray-900 text-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{profile.phone}</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              <a href={`https://instagram.com/${profile.instagram.replace("@", "")}`} className="text-pink-400 hover:underline flex items-center gap-1">
                <span className="text-lg">📸</span> {profile.instagram}
              </a>
              <a href={`https://${profile.github}`} className="text-gray-200 hover:underline flex items-center gap-1">
                <span className="text-lg">🐙</span> {profile.github}
              </a>
            </div>
            {/* Module Badges */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
              {MODULES.map((mod) =>
                profile.completedModules.includes(mod.id) ? (
                  <div key={mod.id} className="flex flex-col items-center">
                    <img src={mod.badge} alt={mod.name + " badge"} className="w-12 h-12 object-contain mb-1 drop-shadow-lg" />
                    <span className="text-xs font-semibold text-green-300">{mod.name} Badge</span>
                  </div>
                ) : (
                  <button
                    key={mod.id}
                    onClick={() => completeModule(mod.id)}
                    className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-900 hover:text-green-200 transition"
                  >
                    Complete {mod.name}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 text-center bg-gray-800 shadow-xl rounded-2xl p-6 mb-8 border border-green-900">
          <div>
            <p className="text-2xl font-bold text-green-400">{profile.points}</p>
            <p className="text-gray-400">Points</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">{profile.plants}</p>
            <p className="text-gray-400">Plants Planted</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">{profile.hackathons}</p>
            <p className="text-gray-400">Hackathon Wins</p>
          </div>
        </div>

        {/* My Media Section */}
        <div className="bg-gray-800 shadow-xl rounded-2xl p-8 border border-green-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">My Media</h2>
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="w-10 h-10 flex items-center justify-center bg-green-500 text-white text-2xl rounded-full shadow hover:bg-green-600 transition-colors"
              title="Upload Media"
            >
              +
            </button>
          </div>
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
          />

          {media.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>No media uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {media.map((item, index) => (
                <div key={index} className="relative group bg-gray-900 rounded-xl shadow overflow-hidden flex items-center justify-center" style={{ aspectRatio: "4/5", minHeight: "160px", minWidth: "128px" }}>
                  {item.startsWith("data:image") ? (
                    <img
                      src={item}
                      alt={`media-${index}`}
                      className="object-cover w-full h-full"
                      style={{ aspectRatio: "4/5", background: "#eee" }}
                    />
                  ) : (
                    <video
                      src={item}
                      controls
                      className="object-cover w-full h-full"
                      style={{ aspectRatio: "4/5", background: "#eee" }}
                    />
                  )}
                  {/* Overlay for delete */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100 transition-opacity z-10"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {/* Fill empty spaces for Instagram-like grid */}
              {Array.from({ length: Math.max(0, 4 - (media.length % 4)) }).map((_, idx) => (
                <div key={`empty-${idx}`} className="bg-transparent" style={{ aspectRatio: "4/5", minHeight: "160px", minWidth: "128px" }} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}