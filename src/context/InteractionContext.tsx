import React, { createContext, useContext, useState } from "react";

// Union type to define the different states of app interaction
type InteractionMode = "hover" | "click" | "drag";

// Defining context shape
interface InteractionContextType {
  interactionMode: InteractionMode;
  toggleInteraction: (mode: InteractionMode) => void;
}

// Creating context with default value
const InteractionContext = createContext<InteractionContextType | undefined>(
  undefined
);

export function InteractionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>("hover");

  const toggleInteraction = (mode: InteractionMode) => {
    setInteractionMode(mode);
  };

  const value = {
    interactionMode,
    toggleInteraction,
  };

  return (
    <InteractionContext.Provider value={value}>
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction() {
  const context = useContext(InteractionContext);

  if (context === undefined) {
    throw new Error(
      "useInteraction must be used within an InteractionProvider"
    );
  }

  return context;
}
