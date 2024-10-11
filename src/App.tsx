import React, { useEffect, useRef } from "react";
import anime from "animejs";

function App() {
  const elementRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    // Basic animation for the text
    anime({
      targets: elementRef.current,
      translateY: 20,
      opacity: [0, 1],
      duration: 2000,
      easing: "easeInOutQuad",
    });

    // Animation for the box
    anime({
      targets: boxRef.current,
      translateX: 250,
      rotate: 360,
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });
  }, []);

  return (
    <div className="App">
      <h1
        ref={elementRef}
        className="text-3xl font-bold mb-4"
        style={{ opacity: 0 }} // Start with opacity 0
      >
        Anime.js Example
      </h1>

      <div ref={boxRef} className="w-16 h-16 bg-blue-500"></div>
    </div>
  );
}

export default App;
