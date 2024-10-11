import { useInteraction } from "../context/InteractionContext";

const InteractionBox = () => {
  const { interactionMode } = useInteraction();

  return (
    <div className="w-full h-full flex justify-center items-center border-[0.05rem] border-black">
      {/* replace this with interaction components later */}
      <p>{interactionMode}</p>
    </div>
  );
};

export default InteractionBox;
