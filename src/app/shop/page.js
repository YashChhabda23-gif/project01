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

// ✅ Hardcoded eco-friendly products
const products = [
  { id: 1, name: "Bamboo Water Bottle", mrp: 350, points: 150, img: "/images/bottle.jpg" },
  { id: 2, name: "Recycled Notebook", mrp: 120, points: 50, img: "/images/note-book.png.jpg" },
  { id: 3, name: "Plantable Pens (Set of 5)", mrp: 180, points: 70, img: "/images/pen.jpg" },
  { id: 4, name: "Cotton Tote Bag", mrp: 250, points: 100, img: "/images/bag.jpg" },
  { id: 5, name: "Solar Desk Lamp", mrp: 900, points: 500, img: "/images/lanp.jpg" },
  { id: 6, name: "Lunch Box", mrp: 400, points: 200, img: "/images/lunchbox.jpg" },
  { id: 7, name: "Eco-friendly Phone Case", mrp: 300, points: 120, img: "/images/phone_backcover.jpg" },
  { id: 8, name: "Cloth Mask (Pack of 3)", mrp: 150, points: 60, img: "/images/mask.png" },
  { id: 9, name: "Digital E-Book", mrp: 0, points: 80, img: "/images/ebook.png" },
  { id: 10, name: "Avatar Skin Pack", mrp: 0, points: 50, img: "/images/avator.png" },
  { id: 11, name: "Eco Lunch Combo", mrp: 650, points: 300, img: "/images/ecolunch.png" },
  { id: 12, name: "Plant Kit", mrp: 500, points: 220, img: "/images/plant.jpg" },
];

export default function ShopPage() {
  useTheme();
  // ✅ User points (dummy value, update later when connected to profile)
  const [points, setPoints] = useState(1200); // <-- change this later
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Add to cart
  const addToCart = (product, type) => {
    if (type === "points" && product.points > points) return;
    setCart([...cart, { ...product, type }]);
  };

  // ✅ Checkout
  const checkout = () => {
    let totalPoints = cart
      .filter((item) => item.type === "points")
      .reduce((sum, item) => sum + item.points, 0);

    if (totalPoints > points) {
      alert("Not enough points!");
      return;
    }

    setPoints(points - totalPoints);
    setCart([]);
    setIsCartOpen(false);
  };

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
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-900 text-green-200 font-semibold"
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
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">Points: <span className="text-green-400">{points}</span></span>
          <button
            className="text-white bg-green-500 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => setIsCartOpen(true)}
          >
            🛒
          </button>
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
        <a href="/quests" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>🎯</span>
          <span>Quests</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-xs text-gray-200 p-2">
          <span>👤</span>
          <span>Profile</span>
        </a>
        <a href="/shop" className="flex flex-col items-center text-xs text-green-400 font-semibold p-2">
          <span>🛒</span>
          <span>Shop</span>
        </a>
      </div>

      {/* ===== Main Content ===== */}
      <main className="flex-1 ml-0 md:ml-56 p-4 md:p-8 min-h-screen">
        {/* Header */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-500">Eco Shop</h2>
          <div className="flex items-center space-x-6">
            <span className="text-lg font-semibold text-gray-100">
              Points Balance: <span className="text-green-400">{points}</span>
            </span>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
              onClick={() => setIsCartOpen(true)}
            >
              View Cart ({cart.length})
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-xl shadow border border-gray-700 p-4 flex flex-col items-center text-center transition-colors">
              <img src={product.img} alt={product.name} className="w-24 h-24 md:w-32 md:h-32 object-contain mb-4" />
              <h3 className="font-bold text-lg text-gray-100">{product.name}</h3>
              <p className="text-gray-400">₹{product.mrp}</p>
              <p className="text-green-400">{product.points} Points</p>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-3">
                <button
                  onClick={() => addToCart(product, "money")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  Add (₹)
                </button>
                <button
                  onClick={() => addToCart(product, "points")}
                  disabled={product.points > points}
                  className={`px-3 py-1 rounded-md transition ${
                    product.points > points
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  Add (Points)
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ===== Cart Sidebar ===== */}
      {isCartOpen && (
        <div className="fixed right-0 top-0 w-full md:w-96 h-full bg-gray-900 shadow-lg p-8 z-50 flex flex-col transition-transform transform">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-400">Your Cart</h2>
            <button
              className="text-gray-400 text-2xl hover:text-green-500"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close Cart"
            >
              &times;
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <img src="/images/empty_cart.png" alt="Empty Cart" className="w-32 h-32 mb-4 opacity-70" />
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3 shadow">
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt={item.name} className="w-12 h-12 object-contain rounded" />
                    <div>
                      <p className="font-semibold text-gray-100">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.type === "money" ? `₹${item.mrp}` : `${item.points} Points`}
                      </p>
                    </div>
                  </div>
                  {/* Remove from cart button */}
                  <button
                    className="text-red-500 hover:text-red-700 text-lg px-2"
                    onClick={() => setCart(cart.filter((_, i) => i !== index))}
                    aria-label="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <button
              onClick={checkout}
              disabled={cart.length === 0}
              className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold shadow hover:bg-green-600 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}