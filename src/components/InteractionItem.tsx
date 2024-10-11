import { useInteraction } from "../context/InteractionContext";

type Props = {
  interactionNumber: string;
  interactionDesc: string;
};

const InteractionItem = ({ interactionNumber, interactionDesc }: Props) => {
  const { toggleInteraction } = useInteraction();

  function handleClick(modeNumber: string) {
    switch (modeNumber) {
      case "001":
        toggleInteraction("click");
        break;
      case "002":
        toggleInteraction("hover");
        break;
      case "003":
        toggleInteraction("drag");
        break;
    }
  }

  return (
    <div
      onClick={() => handleClick(interactionNumber)}
      className="select-none cursor-pointer flex flex-col gap-[0.05rem] bg-neutral-300"
    >
      <h3>{interactionNumber}</h3>
      <p className="w-[15rem]">{interactionDesc}</p>
    </div>
  );
};

export default InteractionItem;
