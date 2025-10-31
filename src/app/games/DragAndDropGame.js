"use client";
import React, { useState, useEffect } from "react";
import { useDrop, useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Item type for drag-and-drop
const ItemTypes = {
  CARD: "card",
};

// Represents a draggable term
const DraggableCard = ({ name, isDropped, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`
        px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md
        cursor-grab text-center font-semibold text-sm transition-all duration-200
        ${isDropped ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
      `}
    >
      {name}
    </div>
  );
};

// Represents a droppable target area (the description)
const DroppableTarget = ({ description, onDrop, droppedItem, isCorrect }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.isOver() && monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`
        w-full p-4 rounded-lg shadow-inner
        transition-colors duration-200 ease-in-out
        ${isActive ? "bg-green-200 dark:bg-green-700" : "bg-gray-100 dark:bg-gray-800"}
        ${isCorrect ? "border-2 border-green-500" : "border-2 border-transparent"}
      `}
    >
      <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">{description}</p>
      {droppedItem ? (
        <span
          className={`
            block w-full px-4 py-2 rounded-lg text-center
            bg-green-500 text-white font-bold
          `}
        >
          {droppedItem.name}
        </span>
      ) : (
        <span className="text-gray-400 dark:text-gray-600 text-xs">Drop the correct term here</span>
      )}
    </div>
  );
};

const gameData = [
  { id: 1, term: "Ecosystem", description: "A community of living organisms interacting with their non-living environment.", correctMatch: "Ecosystem" },
  { id: 2, term: "Biodiversity", description: "The variety of life on Earth, from genes to ecosystems.", correctMatch: "Biodiversity" },
  { id: 3, term: "Pollution", description: "The introduction of harmful substances into the environment.", correctMatch: "Pollution" },
  { id: 4, term: "Conservation", description: "Protecting and preserving natural resources and the environment.", correctMatch: "Conservation" },
];

export default function DragAndDropGame({ onGameComplete }) {
  const [droppedItems, setDroppedItems] = useState({});
  const [correctMatches, setCorrectMatches] = useState({});
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    // Check for completion
    const allCorrect = gameData.every(item => correctMatches[item.id]);
    if (Object.keys(droppedItems).length === gameData.length && allCorrect) {
      setGameFinished(true);
      if (onGameComplete) {
        // Delay to show the final state before calling the callback
        setTimeout(() => onGameComplete(true), 1500);
      }
    }
  }, [droppedItems, correctMatches, onGameComplete]);

  const handleDrop = (targetId, droppedItem) => {
    // Check if the dropped item is the correct one for this target
    const targetData = gameData.find(item => item.id === targetId);
    const isCorrect = targetData.correctMatch === droppedItem.name;

    setDroppedItems(prev => ({
      ...prev,
      [targetId]: droppedItem,
    }));
    setCorrectMatches(prev => ({
      ...prev,
      [targetId]: isCorrect,
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">Match the Environmental Terms</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
          {gameData.map(item => (
            <DroppableTarget
              key={item.id}
              description={item.description}
              droppedItem={droppedItems[item.id]}
              onDrop={(item) => handleDrop(item.id, item)}
              isCorrect={correctMatches[item.id]}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {gameData.map(item => (
            <DraggableCard
              key={item.id}
              id={item.id}
              name={item.term}
              isDropped={droppedItems[item.id] !== undefined}
            />
          ))}
        </div>

        {gameFinished && (
          <div className="mt-8 text-center text-green-500 font-bold text-2xl animate-pop">
            Congratulations! You completed the game! 🎉
          </div>
        )}
      </div>
    </DndProvider>
  );
}