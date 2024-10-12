import { useInteraction } from "../context/InteractionContext";
import ClickInteraction from "./interactions/ClickInteraction";
import DragInteraction from "./interactions/DragInteraction";
import HoverInteraction from "./interactions/HoverInteraction";

const InteractionBox = () => {
  const { interactionMode } = useInteraction();

  function renderInteraction(mode: string) {
    switch (mode) {
      case "click":
        return <ClickInteraction />;
      case "hover":
        return <HoverInteraction />;
      case "drag":
        return <DragInteraction />;
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center border-[0.05rem] border-black">
      {renderInteraction(interactionMode)}
    </div>
  );
};

export default InteractionBox;
