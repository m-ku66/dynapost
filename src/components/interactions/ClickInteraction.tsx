import React, { useState, useRef, useCallback } from "react";
import anime from "animejs";

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
}

const ClickInteraction: React.FC = () => {
  const [triangles, setTriangles] = useState<Triangle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createTriangle = useCallback((x: number, y: number): Triangle => {
    const size = Math.random() * 100 + 10; // Random size between 10 and 110
    const angle = Math.random() * 360; // Random angle for variety
    return { id: Date.now() + Math.random(), x, y, size, angle };
  }, []);

  const animateTriangle = useCallback((element: HTMLElement) => {
    anime({
      targets: element,
      translateX: () => anime.random(-50, 500),
      translateY: () => anime.random(-50, 500),
      scale: [1, 0],
      opacity: [1, 0],
      duration: 80000,
      easing: "easeOutExpo",
      complete: (anim) => {
        // Remove the triangle from the DOM after animation
        const target = anim.animatables[0].target as HTMLElement;
        target.remove();
      },
    });
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;

      const newTriangles = Array(Math.round(Math.random() * 5 + 5))
        .fill(null)
        .map(() => createTriangle(x, y));
      setTriangles((prevTriangles) => [...prevTriangles, ...newTriangles]);

      // Animate new triangles after they're added to the DOM
      setTimeout(() => {
        newTriangles.forEach((triangle) => {
          const element = document.getElementById(`triangle-${triangle.id}`);
          if (element) animateTriangle(element);
        });
      }, 0);
    },
    [createTriangle, animateTriangle]
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-100 cursor-pointer overflow-hidden relative"
      onClick={handleClick}
    >
      {triangles.map((triangle) => (
        <div
          key={triangle.id}
          id={`triangle-${triangle.id}`}
          className="absolute"
          style={{
            left: triangle.x,
            top: triangle.y,
            width: 0,
            height: 0,
            borderLeft: `${triangle.size / 2}px solid transparent`,
            borderRight: `${triangle.size / 2}px solid transparent`,
            borderBottom: `${triangle.size}px solid rgba(0, 0, 0, 0.7)`,
            transform: `translate(-50%, -50%) rotate(${triangle.angle}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default ClickInteraction;
