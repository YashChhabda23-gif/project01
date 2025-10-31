"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDrop, useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  ITEM: "item",
};

// Draggable waste item
const DraggableItem = ({ id, name, type, image }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { id, name, type, image },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`
        w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 p-1 sm:p-2 rounded-xl shadow-md cursor-grab
        flex flex-col items-center justify-center transition-transform duration-200
        hover:scale-105 bg-gray-800
      `}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg">
        <Image src={image} alt={name} width={52} height={52} className="object-contain" />
        <span className="text-[10px] sm:text-xs text-gray-300 font-semibold text-center mt-1">{name}</span>
      </div>
    </div>
  );
};

// Droppable bin
const DroppableBin = ({ name, type, image, onDrop, description }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`
        flex-1 h-36 sm:h-40 p-2 flex flex-col items-center justify-center rounded-2xl border-4
        ${isActive ? "border-green-400" : "border-gray-700"}
        transition-colors duration-200 bg-gray-800
      `}
    >
      <Image src={image} alt={name} width={48} height={48} className="sm:w-16 sm:h-16" />
      <span className="text-sm sm:text-base font-bold mt-2 text-gray-100 text-center">{name}</span>
      <span className="hidden sm:block text-xs text-gray-400 text-center">{description}</span>
    </div>
  );
};

// A larger pool of items to select from
const allItems = [
  { id: 1, name: "Plastic Bottle", type: "Recycling", image: "/images/bottle2.jpg" },
  { id: 2, name: "Banana Peel", type: "Compost", image: "/images/banana_peel.jpg" },
  { id: 3, name: "Newspaper", type: "Recycling", image: "/images/newspaper.jpg" },
  { id: 4, name: "Old Toy", type: "Trash", image: "/images/old-toys.jpg" },
  { id: 5, name: "Cardboard Box", type: "Recycling", image: "/images/cardboard.jpg" },
  { id: 6, name: "Apple Core", type: "Compost", image: "/images/apple-core.jpg" },
  { id: 7, name: "Glass Jar", type: "Recycling", image: "/images/glass-jar.jpg" },
  { id: 8, name: "Used T-shirt", type: "Trash", image: "/images/old-shits.jpg" },
  { id: 9, name: "Egg Shells", type: "Compost", image: "/images/egg-shell.jpg" },
];

const bins = [
  { id: 1, name: "Recycling Bin", type: "Recycling", image: "/images/recycle-bin.jpg", description: "Paper, plastic, and glass go here!" },
  { id: 2, name: "Compost Bin", type: "Compost", image: "/images/compost-bin.jpg", description: "Food scraps for healthy soil!" },
  { id: 3, name: "Trash Bin", type: "Trash", image: "/images/trash-bin1.png", description: "For things that can't be recycled." },
];

// Helper function to get new random items that are not already on screen
const getNewRandomItem = (currentItems) => {
  const currentItemIds = new Set(currentItems.map(item => item.id));
  const availableItems = allItems.filter(item => !currentItemIds.has(item.id));
  
  // If we run out of new items, reshuffle the entire pool
  if (availableItems.length === 0) {
    return allItems[Math.floor(Math.random() * allItems.length)];
  }
  
  const randomIndex = Math.floor(Math.random() * availableItems.length);
  return availableItems[randomIndex];
};

export default function RecyclingGame({ onGameComplete }) {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("welcome"); // welcome, tutorial, playing, finished
  const [tutorialStep, setTutorialStep] = useState(0);
  const [timer, setTimer] = useState(60); // 60-second timer

  // Timer logic
  useEffect(() => {
    if (gameState === "playing" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && gameState === "playing") {
      setGameState("finished");
      if (onGameComplete) {
        setTimeout(() => onGameComplete(score * 20), 1500);
      }
    }
  }, [gameState, timer, onGameComplete, score]);

  // Load initial 3 items when starting the game
  useEffect(() => {
    if (gameState === "playing") {
      const initialItems = [...allItems].sort(() => 0.5 - Math.random()).slice(0, 3);
      setItems(initialItems);
    }
  }, [gameState]);

  const handleDrop = (item, bin) => {
    if (item.type === bin.type) {
      setScore((prev) => prev + 1);
      // Remove the dropped item and add a new random one
      setItems((prevItems) => {
        const remainingItems = prevItems.filter((i) => i.id !== item.id);
        const newItem = getNewRandomItem(remainingItems);
        return [...remainingItems, newItem];
      });
    } else {
      // Optional: Add a small score penalty for incorrect drops
      // setScore((prev) => Math.max(0, prev - 1));
    }
  };

  const tutorialScreens = [
    { title: "Welcome, little hero! 🌟", content: "Let's learn to sort waste and help our planet! 🌎" },
    { title: "Meet the Bins! 🗑️", content: "You'll see different bins. Each one is for a specific type of waste." },
    { title: "The Recycling Bin", content: "This is for paper, plastic, and glass. Turn old things into new things! ♻️", image: "/images/recycle-bin.jpg" },
    { title: "The Compost Bin", content: "Food scraps like banana peels go here. They'll become healthy food for plants! 🍎", image: "/images/compost-bin.jpg" },
    { title: "The Trash Bin", content: "This is for everything else that can't be recycled or composted. 🚮", image: "/images/trash-bin1.png" },
    { title: "Let's Play! ✨", content: "Drag the waste items to the correct bin. The faster you are, the more points you get! Ready? Set? Sort! 🎉" },
  ];

  const renderContent = () => {
    switch (gameState) {
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center text-center p-4 h-full">
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              Welcome to the Sorting Challenge!
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Help us clean up the environment by sorting waste into the right bins.
            </p>
            <button
              onClick={() => setGameState("tutorial")}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              Start
            </button>
          </div>
        );

      case "tutorial":
        const currentTutorial = tutorialScreens[tutorialStep];
        return (
          <div className="flex flex-col items-center justify-center text-center p-4 h-full">
            <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-4">{currentTutorial.title}</h2>
            {currentTutorial.image && (
              <Image src={currentTutorial.image} alt="Tutorial Image" width={96} height={96} className="my-4" />
            )}
            <p className="text-sm sm:text-lg text-gray-300 mb-6">{currentTutorial.content}</p>
            {tutorialStep < tutorialScreens.length - 1 ? (
              <button
                onClick={() => setTutorialStep((prev) => prev + 1)}
                className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setGameState("playing")}
                className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
              >
              {"Let's Play!"}
              </button>
            )}
          </div>
        );

      case "playing":
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between w-full max-w-4xl mb-6 items-center">
              <span className="text-lg sm:text-xl font-semibold text-gray-100">Score: {score}</span>
              <span className="text-lg sm:text-xl font-semibold text-gray-100">Time: {timer}s</span>
            </div>
            
            {/* Horizontal layout for items */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 min-h-[120px]">
              {items.map((item) => (
                <DraggableItem key={item.id} {...item} />
              ))}
            </div>

            {/* Horizontal layout for bins */}
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 w-full max-w-4xl">
              {bins.map((bin) => (
                <DroppableBin key={bin.id} {...bin} onDrop={(item) => handleDrop(item, bin)} />
              ))}
            </div>
          </>
        );

      case "finished":
        return (
          <div className="flex flex-col items-center justify-center text-center p-4 h-full animate-pop">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mb-4">
              Game Over! 🎉
            </h2>
            <p className="text-lg sm:text-2xl font-semibold text-gray-100">
              You scored {score} points!
            </p>
            <button
              onClick={() => onGameComplete(score * 20)}
              className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              Next Chapter
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700 w-full min-h-[500px] md:min-h-[600px]">
        {renderContent()}
      </div>
    </DndProvider>
  );

}


