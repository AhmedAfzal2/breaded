import { useEffect } from "react";
import Board from "./components/Board";
import Intro from "./components/Intro";
import Teams from "./components/Teams";
import { useBoardStore } from "./hooks/useBoardStore";

function App() {
  const prevBoard = useBoardStore((state) => state.prevBoard);
  const nextBoard = useBoardStore((state) => state.nextBoard);

  useEffect(() => {
    function keyHandler(e: KeyboardEvent) {
      if (e.key === "]") nextBoard();
      if (e.key === "[") prevBoard();
    }
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center pb-[10vh] py-8 px-[5vw] gameshow-bg overflow-hidden relative gap-4">
      <Intro>
        <Teams />
      </Intro>
      <Board />
    </div>
  );
}

export default App;
