"use client";
import React, { useEffect } from "react";

/**
 * Custom hook to force dark mode.
 */
const useTheme = () => {
  useEffect(() => {
    // Force the 'dark' class on the root HTML element
    document.documentElement.classList.add("dark");
  }, []);
};

const diyProjects = [
  {
    id: 1,
    title: "DIY Paper Lamp",
    video: "https://www.youtube.com/embed/A8mYp48g9vM?si=Oof8QlHROLjGoaBy",
  },
  {
    id: 2,
    title: "DIY Mini Solar Car",
    video: "https://www.youtube.com/embed/75-x7Rx_n9g?si=Cym4kS2fFr7bbkLT",
  },
  {
    id: 3,
    title: "DIY Bottle Rocket",
    video: "https://www.youtube.com/embed/wMI5JaTy0Mg?si=5jkuOIc9yO_Z6D3x",
  },
];

export default function DIYPage() {
  useTheme();

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* ===== Left Sidebar (Desktop/Tablet) ===== */}
      <aside className="hidden md:flex w-56 bg-gray-900/80 p-4 flex-col items-start fixed top-0 left-0 h-screen border-r border-gray-700 z-30">
        <h1 className="text-2xl font-bold text-green-500 mb-6">GreenVision</h1>
        <nav className="flex flex-col gap-4 w-full flex-1">
          <a
            href="/landing"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
          >
            🏠 Learn
          </a>
          <a
            href="/diy"
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-900 text-green-200 font-semibold"
          >
            🛠️ DIY
          </a>
          <a
            href="/leaderboards"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
          >
            🏆 Leaderboards
          </a>
          <a
            href="/quests"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
          >
            🎯 Quests
          </a>
          <a
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
          >
            👤 Profile
          </a>
          <a
            href="/shop"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
          >
            🛒 Shop
          </a>
        </nav>
      </aside>

      {/* ===== Mobile Top Bar ===== */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-3 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">G</div>
          <div className="text-sm font-semibold">GreenVision</div>
        </div>
      </header>

      {/* ===== Mobile Bottom Bar ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around p-2 bg-gray-900/80 border-t border-gray-700 backdrop-blur-sm">
        <a href="/landing" className="flex flex-col items-center text-xs text-gray-200">
          <span>🏠</span>
          <span>Learn</span>
        </a>
        <a href="/diy" className="flex flex-col items-center text-xs text-green-400 font-semibold">
          <span>🛠️</span>
          <span>DIY</span>
        </a>
        <a href="/leaderboards" className="flex flex-col items-center text-xs text-gray-200">
          <span>🏆</span>
          <span>Leaderboard</span>
        </a>
        <a href="/quests" className="flex flex-col items-center text-xs text-gray-200">
          <span>⚡</span>
          <span>Quests</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-xs text-gray-200">
          <span>👤</span>
          <span>Profile</span>
        </a>
      </div>

      {/* ===== Main Content ===== */}
      <main className="flex-1 ml-0 md:ml-56 p-4 md:p-8 min-h-screen bg-gray-900">
        <h2 className="text-2xl font-bold text-green-500 mb-6">DIY Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diyProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-xl shadow-lg dark:shadow-none overflow-hidden border border-gray-700 transition-colors"
            >
              <div className="aspect-video">
                <iframe
                  src={project.video}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-100">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}