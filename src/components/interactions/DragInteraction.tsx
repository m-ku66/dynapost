import React, { useState, useRef, useEffect, useCallback } from "react";

interface Square {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const DragInteraction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggedSquareRef = useRef<HTMLDivElement>(null);
  const [squares, setSquares] = useState<Square[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const squareSize = 32;
  const attractionRadius = 150;
  const repulsionRadius = 40;
  const attractionStrength = 0.5;
  const repulsionStrength = 1.5;

  const createSquare = useCallback((): Square => {
    const container = containerRef.current;
    if (!container) return { id: 0, x: 0, y: 0, vx: 0, vy: 0 };

    const { width, height } = container.getBoundingClientRect();
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - squareSize),
      y: Math.random() * (height - squareSize),
      vx: 0,
      vy: 0,
    };
  }, []);

  useEffect(() => {
    setSquares(Array(50).fill(null).map(createSquare));
  }, [createSquare]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !draggedSquareRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setDragPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newX = Math.max(
        squareSize / 2,
        Math.min(event.clientX - rect.left, rect.width - squareSize / 2)
      );
      const newY = Math.max(
        squareSize / 2,
        Math.min(event.clientY - rect.top, rect.height - squareSize / 2)
      );

      setDragPosition({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateSquares = () => {
      setSquares((prevSquares) => {
        const container = containerRef.current;
        if (!container) return prevSquares;

        const { width, height } = container.getBoundingClientRect();

        return prevSquares.map((square) => {
          let { x, y, vx, vy } = square;

          // Apply attraction to dragged square
          const dx = dragPosition.x - x;
          const dy = dragPosition.y - y;
          const distanceToDrag = Math.sqrt(dx * dx + dy * dy);

          if (distanceToDrag < attractionRadius) {
            vx += (dx / distanceToDrag) * attractionStrength;
            vy += (dy / distanceToDrag) * attractionStrength;
          }

          // Apply repulsion between squares
          prevSquares.forEach((otherSquare) => {
            if (square.id !== otherSquare.id) {
              const dx = otherSquare.x - x;
              const dy = otherSquare.y - y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < repulsionRadius) {
                const force = (repulsionRadius - distance) / repulsionRadius;
                vx -= (dx / distance) * force * repulsionStrength;
                vy -= (dy / distance) * force * repulsionStrength;
              }
            }
          });

          // Apply velocity and boundary constraints
          x += vx;
          y += vy;
          x = Math.max(squareSize / 2, Math.min(x, width - squareSize / 2));
          y = Math.max(squareSize / 2, Math.min(y, height - squareSize / 2));

          // Apply friction
          vx *= 0.95;
          vy *= 0.95;

          return { ...square, x, y, vx, vy };
        });
      });

      animationFrameId = requestAnimationFrame(updateSquares);
    };

    updateSquares();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dragPosition]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-gray-100 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {squares.map((square) => (
        <div
          key={square.id}
          className="w-16 h-16 bg-black/[0.2] absolute rounded-sm"
          style={{
            left: `${square.x - squareSize / 2}px`,
            top: `${square.y - squareSize / 2}px`,
          }}
        />
      ))}
      <div
        ref={draggedSquareRef}
        className="w-8 h-8 bg-black absolute z-10 cursor-move rounded-sm"
        style={{
          left: `${dragPosition.x - squareSize / 2}px`,
          top: `${dragPosition.y - squareSize / 2}px`,
        }}
        onMouseDown={handleMouseDown}
      />
      {isDragging && (
        <div
          className="absolute rounded-full border-4 border-black opacity-5 pointer-events-none"
          style={{
            left: `${dragPosition.x - attractionRadius}px`,
            top: `${dragPosition.y - attractionRadius}px`,
            width: `${attractionRadius * 2}px`,
            height: `${attractionRadius * 2}px`,
          }}
        />
      )}
    </div>
  );
};

export default DragInteraction;
