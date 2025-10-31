"use client";
import React, { useState, useRef, useEffect } from "react";
import RecyclingGame from "../games/RecyclingGame";

/**
 * Custom hook to force dark mode.
 */
const useTheme = () => {
  useEffect(() => {
    // Force the 'dark' class on the root HTML element
    document.documentElement.classList.add("dark");
  }, []);
};

/* --- Environment-based modules (6 chapters each) --- */
const initialModules = [
  {
    name: "Module 1: Waste Management",
    color: "bg-green-500",
    mascot: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    chapters: [
      { id: 1, name: "3R's", completed: false, unlocked: true },
      { id: 2, name: "Air & Atmosphere", completed: false, unlocked: false },
      { id: 3, name: "Water Resources", completed: false, unlocked: false },
      { id: 4, name: "Soil & Land", completed: false, unlocked: false },
      { id: 5, name: "Forests & Trees", completed: false, unlocked: false },
      { id: 6, name: "Wildlife Basics", completed: false, unlocked: false },
    ],
  },
  {
    name: "Module 2: Pollution & Waste",
    color: "bg-yellow-500",
    mascot: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    chapters: [
      { id: 1, name: "Types of Pollution", completed: false, unlocked: false },
      { id: 2, name: "Plastic Problem", completed: false, unlocked: false },
      { id: 3, name: "Air Pollution", completed: false, unlocked: false },
      { id: 4, name: "Waste Management", completed: false, unlocked: false },
      { id: 5, name: "Recycling Basics", completed: false, unlocked: false },
      { id: 6, name: "Composting", completed: false, unlocked: false },
    ],
  },
  {
    name: "Module 3: Renewable Energy",
    color: "bg-blue-500",
    mascot: "https://cdn-icons-png.flaticon.com/512/2972/2972229.png",
    chapters: [
      { id: 1, name: "Solar Energy", completed: false, unlocked: false },
      { id: 2, name: "Wind Power", completed: false, unlocked: false },
      { id: 3, name: "Hydropower", completed: false, unlocked: false },
      { id: 4, name: "Geothermal", completed: false, unlocked: false },
      { id: 5, name: "Biomass", completed: false, unlocked: false },
      { id: 6, name: "Future Clean Tech", completed: false, unlocked: false },
    ],
  },
  {
    name: "Module 4: Climate Action",
    color: "bg-purple-500",
    mascot: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
    chapters: [
      { id: 1, name: "Climate Change", completed: false, unlocked: false },
      { id: 2, name: "Carbon Footprint", completed: false, unlocked: false },
      { id: 3, name: "Green Transport", completed: false, unlocked: false },
      { id: 4, name: "Eco-Friendly Habits", completed: false, unlocked: false },
      { id: 5, name: "Community Action", completed: false, unlocked: false },
      { id: 6, name: "Be a Climate Hero", completed: false, unlocked: false },
    ],
  },
];

export default function LandingPage() {
  const [modules, setModules] = useState(initialModules);
  const [points, setPoints] = useState(0); // Initialize points to 0 on the server
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeGame, setActiveGame] = useState(null);
  const moduleRefs = useRef([]);
  useTheme();

  // Load points from localStorage only after the component mounts on the client
  useEffect(() => {
    const storedPoints = localStorage.getItem("points");
    if (storedPoints) {
      setPoints(parseInt(storedPoints, 10));
    }
  }, []);

  useEffect(() => {
    // Save points to localStorage whenever they change
    localStorage.setItem("points", points);
    // Optionally, update profile points in localStorage for profile page
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    if (profile) {
      profile.points = points;
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [points]);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = moduleRefs.current.map(ref =>
        ref ? ref.getBoundingClientRect().top : Infinity
      );
      const idx = offsets.findIndex(offset => offset > 100);
      setActiveModuleIdx(idx === -1 ? modules.length - 1 : Math.max(0, idx - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [modules.length]);

  const current = (() => {
    for (let m = 0; m < modules.length; m++) {
      const ch = modules[m].chapters.find(c => c.unlocked && !c.completed);
      if (ch) return { moduleIdx: m, chapter: ch };
    }
    const lastModule = modules[modules.length - 1];
    return { moduleIdx: modules.length - 1, chapter: lastModule.chapters[lastModule.chapters.length - 1] };
  })();

  const completeChapter = (moduleIdx, chapterIdx, pointsEarned = 100) => {
    setModules(prev =>
      prev.map((mod, mIdx) => {
        if (mIdx !== moduleIdx) return mod;
        return {
          ...mod,
          chapters: mod.chapters.map((ch, cIdx) => {
            if (cIdx === chapterIdx) return { ...ch, completed: true };
            if (cIdx === chapterIdx + 1) return { ...ch, unlocked: true };
            return ch;
          }),
        };
      })
    );
    setPoints(p => p + pointsEarned);
    setActiveGame(null);
  };

  const handleChapterClick = (moduleIdx, chapterId) => {
    if (moduleIdx === 0 && chapterId === 1) {
      setActiveGame("recycling-game");
    }
  };

  const offsets = [
    "ml-0 md:ml-0",
    "ml-10 md:ml-20",
    "ml-20 md:ml-40",
    "ml-10 md:ml-20",
    "ml-0 md:ml-0",
    "ml-10 md:ml-20",
  ];

  const mascotSide = idx => (idx % 2 === 0 ? "left" : "right");

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* ===== Left Sidebar (Desktop/Tablet) ===== */}
      <aside className="hidden md:flex w-56 bg-gray-900/80 p-4 flex-col items-start fixed top-0 left-0 h-screen border-r border-gray-700 z-30">
        <h1 className="text-2xl font-bold text-green-500 mb-6">GreenVision</h1>
        <nav className="flex flex-col gap-4 w-full flex-1">
          <a href="/landing" className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-900 text-green-200 font-semibold">
            🏠 Learn
          </a>
          <a href="/diy" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">
            🛠️ DIY
          </a>
          <a href="/leaderboards" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">
            🏆 Leaderboards
          </a>
          <a href="/quests" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">
            🎯 Quests
          </a>
          <a href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">
            👤 Profile
          </a>
          <a href="/shop" className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800">
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
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-gray-800 text-green-400 font-bold">
            {points}
          </div>
        </div>
      </header>

      {/* ===== Right Sidebar (Desktop only) ===== */}
      <aside className="hidden lg:flex fixed right-0 top-0 w-96 h-screen bg-gray-900/80 p-8 flex-col space-y-8 border-l border-gray-700 z-30">
        {/* Points */}
        <div className="flex items-center justify-between bg-gray-800 rounded-2xl shadow-xl dark:shadow-sm px-10 py-8 transition-all duration-300">
          <span className="flex items-center space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-8 h-6" />
            <p className="font-semibold text-gray-300 text-lg">Points</p>
          </span>
          <p className="font-bold text-green-400 text-2xl">{points}</p>
        </div>
        {/* Leaderboards */}
        <div className="bg-gray-800 rounded-2xl shadow-xl dark:shadow-sm px-10 py-10 transition-all duration-300">
          <h2 className="font-bold mb-4 flex items-center text-xl text-gray-100">
            <span className="mr-3 text-yellow-600 text-2xl">🏆</span> Leaderboard
          </h2>
          <p className="text-gray-400 text-base">Complete chapters to rank up!</p>
        </div>
        {/* Daily Quests */}
        <div className="bg-gray-800 rounded-2xl shadow-xl dark:shadow-sm px-10 py-10 transition-all duration-300">
          <h2 className="font-bold mb-4 flex items-center text-xl text-gray-100">
            <span className="mr-3 text-green-600 text-2xl">⚡</span> Daily Quests
          </h2>
          <p className="text-gray-400 text-base">Earn 10 XP by completing 1 chapter</p>
        </div>
      </aside>

      {/* ===== Mobile Bottom Bar ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around p-2 bg-gray-900/80 border-t border-gray-700 backdrop-blur-sm">
        <a href="/landing" className="flex flex-col items-center text-xs text-gray-200">
          <span>🏠</span>
          <span>Learn</span>
        </a>
        <a href="/diy" className="flex flex-col items-center text-xs text-gray-200">
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
        <a href="/shop" className="flex flex-col items-center text-xs text-gray-200">
          <span>🛒</span>
          <span>Shop</span>
        </a>
      </div>

      {/* ===== Main Content (Scrollable) ===== */}
      <main className="flex-1 ml-0 md:ml-56 mr-0 lg:mr-96 pt-[9rem] md:pt-32 pb-28">
        {/* Fixed Module Header (shows current module + current chapter) */}
        <div
          key={`${activeModuleIdx}-${current.chapter?.id ?? ""}`}
          className={`
            fixed left-1/2 top-4 z-30
            -translate-x-1/2
            w-11/12 max-w-lg
            rounded-xl px-4 py-3 md:px-8 md:py-3 flex flex-col items-center gap-2 shadow-lg
            transition-all duration-300
            ${modules[activeModuleIdx].color} text-white
            animate-fadeInDown
          `}
          style={{
            pointerEvents: "none"
          }}
        >
          <span className="text-base md:text-lg font-bold">
            {modules[activeModuleIdx].name}
          </span>
          <span className="font-bold text-lg md:text-xl">
            {current.chapter ? `Chapter ${current.chapter.id}: ${current.chapter.name}` : ""}
          </span>
        </div>

        <div className="w-full flex justify-center pb-28">
          {activeGame === "recycling-game" ? (
            <RecyclingGame onGameComplete={(pointsEarned) => completeChapter(0, 0, pointsEarned)} />
          ) : (
            <div className="w-11/12 max-w-lg">
              {modules.map((module, mIdx) => {
                const moduleUnlocked = module.chapters.some(ch => ch.unlocked);
                const side = mascotSide(mIdx);
                const mascotChapterIdx = Math.floor(module.chapters.length / 2);

                return (
                  <section
                    key={module.name}
                    ref={el => (moduleRefs.current[mIdx] = el)}
                    className="mb-16"
                  >
                    {/* Module header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-100">{module.name}</h2>
                      <div className="text-sm text-gray-300">{moduleUnlocked ? "Unlocked" : "Locked"}</div>
                    </div>

                    {/* Chapters (snake layout vertically) */}
                    <div className="relative flex flex-col items-start gap-10 pl-2 md:pl-0">
                      {module.chapters.map((chapter, cIdx) => (
                        <div key={chapter.id} className={`relative ${offsets[cIdx % offsets.length]}`} style={{ zIndex: 10 }}>
                          <button
                            onClick={() => handleChapterClick(mIdx, chapter.id)}
                            tabIndex={chapter.unlocked ? 0 : -1}
                            disabled={!chapter.unlocked || chapter.completed}
                            className={`
                              w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                              transition-transform duration-300
                              border-4 border-gray-800
                              ${
                                chapter.completed
                                  ? "bg-gradient-to-br from-green-700 to-green-500 text-green-100 pointer-events-none"
                                  : chapter.unlocked
                                  ? "bg-gradient-to-br from-green-600 to-green-400 text-white"
                                  : "bg-gray-700 text-gray-500 pointer-events-none"
                              }
                              ${
                                chapter.unlocked && !chapter.completed
                                  ? "hover:scale-110 active:scale-95 ring-2 ring-green-700"
                                  : ""
                              }
                              three-d-btn
                            `}
                            style={{
                              boxShadow:
                                chapter.unlocked && !chapter.completed
                                  ? "0 6px 16px 0 #16a34a" // Darker green shadow
                                  : "0 2px 8px 0 #374151" // Darker gray shadow
                            }}
                          >
                            {chapter.completed ? "⭐" : chapter.unlocked ? "★" : "🔒"}
                          </button>

                          {/* Mascot image with template */}
                          {cIdx === mascotChapterIdx && (
                            <div className={`
                              absolute top-1/2 -translate-y-1/2
                              w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center shadow-lg
                              ${side === "left" ? "-left-20 md:-left-24" : "-right-20 md:-right-24"}
                              pointer-events-none
                            `}>
                              <img
                                src={module.mascot}
                                alt="Mascot"
                                className={`
                                  w-10 h-10 md:w-12 md:h-12
                                  ${moduleUnlocked ? "animate-float" : "grayscale"}
                                `}
                                draggable={false}
                              />
                            </div>
                          )}

                          {/* Complete button */}
                          {chapter.unlocked && !chapter.completed && (
                            <button
                              onClick={() => completeChapter(mIdx, cIdx)}
                              className="absolute left-1/2 -bottom-8 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 text-xs"
                            >
                              Complete Chapter
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Divider between modules */}
                    {mIdx < modules.length - 1 && (
                      <div className="w-2/3 h-1 bg-gray-700 my-10 rounded-full mx-auto"></div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        @keyframes pop {
          0% { transform: scale(1); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 0.5s; }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.5s ease-out; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-float { animation: float 2s infinite; }
      `}</style>
    </div>
  );
}