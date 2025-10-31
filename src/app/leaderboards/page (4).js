"use client";
import React, { useState, useEffect } from "react";

/**
 * Custom hook to force dark mode.
 */
const useTheme = () => {
  useEffect(() => {
    // Force the 'dark' class on the root HTML element
    document.documentElement.classList.add("dark");
  }, []);
};

const getRandomName = () => {
  const names = ["Ananya", "Ravi", "Priya", "Karthik", "Sneha", "Vikram", "Ayesha", "Manoj", "Divya", "Suresh", "Lakshmi", "Rahul", "Neha", "Arjun", "Kavya"];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomLocation = () => {
  const states = ["Telangana", "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"];
  const districts = ["Hyderabad", "Pune", "Bengaluru", "Chennai", "New Delhi", "Mumbai", "Kolkata", "Jaipur"];
  const randomState = states[Math.floor(Math.random() * states.length)];
  const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
  return { state: randomState, district: randomDistrict };
};

const generateRandomUsers = (count = 15) => {
  const users = [{ id: 1, name: "You", points: Math.floor(Math.random() * 500) + 500, ...getRandomLocation() }];
  for (let i = 2; i <= count; i++) {
    const location = getRandomLocation();
    users.push({
      id: i,
      name: getRandomName(),
      points: Math.floor(Math.random() * 900) + 100,
      ...location,
    });
  }
  return users;
};

// Avatar generator (DiceBear)
const getAvatar = (name) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;

// Medal emojis
const getMedal = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank;
};

export default function LeaderboardPage() {
  useTheme();
  const [filters, setFilters] = useState({
    all: true,
    myState: false,
    myDistrict: false,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(generateRandomUsers());
  }, []);

  const currentUser = users.find((u) => u.name === "You");

  // filtering
  let filteredUsers = [...users];
  if (!filters.all && currentUser) {
    if (filters.myState) {
      filteredUsers = users.filter((user) => user.state === currentUser.state);
    } else if (filters.myDistrict) {
      filteredUsers = users.filter((user) => user.district === currentUser.district);
    }
  }

  // sort by points
  filteredUsers.sort((a, b) => b.points - a.points);

  // get top score for progress bar
  const topScore = filteredUsers[0]?.points || 1;

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
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-900 text-green-200 font-semibold"
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
        <a href="/landing" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>🏠</span>
          <span>Learn</span>
        </a>
        <a href="/diy" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>🛠️</span>
          <span>DIY</span>
        </a>
        <a href="/leaderboards" className="flex flex-col items-center text-xs text-green-400 font-semibold p-2">
          <span>🏆</span>
          <span>Leaderboard</span>
        </a>
        <a href="/quests" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>⚡</span>
          <span>Quests</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>👤</span>
          <span>Profile</span>
        </a>
      </div>

      {/* ===== Main Content ===== */}
      <main className="flex-1 ml-0 md:ml-56 p-4 md:p-8 min-h-screen">
        <h2 className="text-2xl font-bold text-green-500 mb-6">
          Leaderboard 🏆
        </h2>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={filters.all}
              onChange={() =>
                setFilters({ all: true, myState: false, myDistrict: false })
              }
              className="form-checkbox text-green-500 bg-gray-700 border-gray-600 rounded-full"
            />
            All
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={filters.myState}
              onChange={() =>
                setFilters({
                  all: false,
                  myState: !filters.myState,
                  myDistrict: false,
                })
              }
              className="form-checkbox text-green-500 bg-gray-700 border-gray-600 rounded-full"
            />
            My State
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={filters.myDistrict}
              onChange={() =>
                setFilters({
                  all: false,
                  myState: false,
                  myDistrict: !filters.myDistrict,
                })
              }
              className="form-checkbox text-green-500 bg-gray-700 border-gray-600 rounded-full"
            />
            My District
          </label>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-900 text-left text-green-200">
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4 hidden sm:table-cell">Location</th>
                <th className="p-4 sm:hidden">District</th>
                <th className="p-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t border-gray-700 transition-colors
                    ${
                      user.name === "You"
                        ? "bg-green-800 font-bold"
                        : index < 3
                        ? "bg-yellow-900/50"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                >
                  {/* Rank with Medal */}
                  <td className="p-4 text-xl">{getMedal(index + 1)}</td>

                  {/* Avatar + Name */}
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={getAvatar(user.name)}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-gray-600"
                    />
                    {user.name}
                  </td>

                  {/* Location (desktop) */}
                  <td className="p-4 text-gray-400 text-sm hidden sm:table-cell">
                    {user.district}, {user.state}
                  </td>
                  {/* District (mobile) */}
                  <td className="p-4 text-gray-400 text-sm sm:hidden">
                    {user.district}
                  </td>

                  {/* Points with progress bar */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{user.points}</span>
                      <div className="w-24 md:w-32 lg:w-40 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-green-500 h-2"
                          style={{
                            width: `${(user.points / topScore) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}