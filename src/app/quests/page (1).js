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

const weeklyQuizzes = [
  {
    id: 1,
    title: "Eco-Friendly Habits Quiz",
    description: "Learn how your daily habits impact the planet and earn points.",
    points: 50,
    link: "#",
  },
  {
    id: 2,
    title: "Renewable Energy Challenge",
    description: "Answer questions about solar, wind, and hydropower.",
    points: 75,
    link: "#",
  },
  {
    id: 3,
    title: "Recycling & Waste Trivia",
    description: "Fun trivia covering different types of waste and recycling.",
    points: 40,
    link: "#",
  },
];

const hackathons = [
  {
    id: 1,
    title: "Green Tech Hackathon",
    description: "Build an app to track your carbon footprint in 48 hours.",
    points: 200,
    link: "#",
  },
  {
    id: 2,
    title: "Urban Farming Challenge",
    description: "Design a plan for a community garden or vertical farm.",
    points: 150,
    link: "#",
  },
  {
    id: 3,
    title: "Wildlife Conservation App",
    description: "Develop a mobile app to help identify local flora and fauna.",
    points: 300,
    link: "#",
  },
];

export default function QuestsPage() {
  useTheme();
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
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
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
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
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-900 text-green-200 font-semibold"
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
        <a href="/landing" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>🏠</span>
          <span>Learn</span>
        </a>
        <a href="/diy" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>🛠️</span>
          <span>DIY</span>
        </a>
        <a href="/leaderboards" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>🏆</span>
          <span>Leaderboard</span>
        </a>
        <a href="/quests" className="flex flex-col items-center text-xs text-green-400 font-semibold p-2">
          <span>🎯</span>
          <span>Quests</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>👤</span>
          <span>Profile</span>
        </a>
        <a href="/shop" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>🛒</span>
          <span>Shop</span>
        </a>
      </div>

      {/* ===== Main Content ===== */}
      <main className="flex-1 ml-0 md:ml-56 p-4 md:p-8 min-h-screen">
        <h2 className="text-2xl font-bold text-green-500 mb-6">Quests</h2>

        {/* Weekly Quizzes */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            📝 Weekly Quizzes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-green-500 mb-2">
                    {quiz.title}
                  </h4>
                  <p className="text-gray-400 mb-4">{quiz.description}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    🎯 Earn {quiz.points} XP
                  </p>
                </div>
                <a
                  href={quiz.link}
                  className="inline-block text-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Play Quiz
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Hackathons */}
        <section>
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            💻 Hackathons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hack) => (
              <div
                key={hack.id}
                className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-green-500 mb-2">
                    {hack.title}
                  </h4>
                  <p className="text-gray-400 mb-4">{hack.description}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    🎯 Earn {hack.points} XP
                  </p>
                </div>
                <a
                  href={hack.link}
                  className="inline-block text-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Join Hackathon
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}