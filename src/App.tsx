import InteractionBox from "./components/InteractionBox";
import InteractionItem from "./components/InteractionItem";
import { InteractionProvider } from "./context/InteractionContext";

function App() {
  return (
    <InteractionProvider>
      {/* Desktop and Tablet */}
      <div className="hidden md:flex container max-w-full h-screen px-4 py-2">
        <div className="w-full h-full flex flex-col gap-2 bg-neutral-200">
          {/* Title and subtext */}
          <div className="w-full flex flex-col items-center justify-center py-4 bg-neutral-300">
            <h1 className="select-none inter text-[7rem] font-bold leading-none">
              DYNAPOST
            </h1>
            <h2 className="select-none inter text-[1.7rem] font-light">
              AN INTERACTIVE POSTER DESIGN EXPERIENCE
            </h2>
          </div>

          {/* Interaction selector */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[0.05rem] bg-black"></div>
            <div className="flex justify-between items-center w-full h-fit">
              <InteractionItem
                interactionNumber="001"
                interactionDesc="Spark a change. Your click, your choice."
              />
              <InteractionItem
                interactionNumber="002"
                interactionDesc="Pause and ponder. What lies beneath?"
              />
              <InteractionItem
                interactionNumber="003"
                interactionDesc="Shift perspectives. Redraw boundaries."
              />
            </div>
            <div className="w-full h-[0.05rem] bg-black"></div>
          </div>

          {/* Interaction box */}
          <InteractionBox />
        </div>
      </div>
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* Mobile */}
      <div className="flex md:hidden container max-w-full h-screen px-4 py-2 overflow-x-hidden">
        <div className="w-full h-full flex flex-col gap-2 bg-neutral-200">
          {/* Title and subtext */}
          <div className="w-full flex flex-col items-center justify-center py-4 bg-neutral-300">
            <h1 className="select-none inter text-[4rem] font-bold leading-none">
              DYNAPOST
            </h1>
            <h2 className="select-none inter text-[1rem] font-light">
              AN INTERACTIVE POSTER DESIGN EXPERIENCE
            </h2>
          </div>

          {/* Interaction selector */}
          <div className="flex flex-col h-[15%] gap-4">
            <div className="w-full h-[0.05rem] bg-black"></div>
            <div className="flex flex-col gap-10 justify-between items-center w-full h-fit overflow-y-scroll py-4">
              <InteractionItem
                interactionNumber="001"
                interactionDesc="Spark a change. Your click, your choice."
              />
              <InteractionItem
                interactionNumber="002"
                interactionDesc="Shift perspectives. Redraw boundaries."
              />
            </div>
            <div className="w-full h-[0.05rem] bg-black"></div>
          </div>

          {/* Interaction box */}
          <InteractionBox />
        </div>
      </div>
    </InteractionProvider>
  );
}

export default App;
