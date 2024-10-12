import React, { useState, useRef, useEffect, useCallback } from "react";
import anime from "animejs";

interface Circle {
  id: number;
  x: number;
  y: number;
  radius: number;
}

const HoverInteraction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [cursorSize, setCursorSize] = useState(20);
  const maxCursorSize = 200;
  const minCircles = 25;

  const createCircle = useCallback((): Circle => {
    const container = containerRef.current;
    if (!container) return { id: 0, x: 0, y: 0, radius: 0 };

    const { width, height } = container.getBoundingClientRect();
    return {
      id: Date.now(),
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 5,
    };
  }, []);

  useEffect(() => {
    // Initialize circles
    setCircles(Array(minCircles).fill(null).map(createCircle));
  }, [createCircle]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !cursorRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      anime({
        targets: cursorRef.current,
        left: x,
        top: y,
        duration: 300,
        easing: "easeOutExpo",
      });

      // Check for collisions
      setCircles((prevCircles) => {
        const newCircles = prevCircles.filter((circle) => {
          const dx = x - circle.x;
          const dy = y - circle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < cursorSize / 2 + circle.radius) {
            // Collision detected
            setCursorSize((prevSize) => {
              const newSize = prevSize + circle.radius / circle.radius;
              return newSize > maxCursorSize ? 20 : newSize; // Reset if max size reached
            });
            return false; // Remove this circle
          }
          return true;
        });

        // Add new circles if needed
        while (newCircles.length < minCircles) {
          newCircles.push(createCircle());
        }

        return newCircles;
      });
    },
    [cursorSize, createCircle]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-gray-100 overflow-hidden"
    >
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute bg-black rounded-full"
          style={{
            left: circle.x,
            top: circle.y,
            width: circle.radius * 2,
            height: circle.radius * 2,
          }}
        />
      ))}
      <div
        ref={cursorRef}
        className="absolute bg-black rounded-full pointer-events-none"
        style={{
          width: cursorSize,
          height: cursorSize,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default HoverInteraction;
