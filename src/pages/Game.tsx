import { useLocation } from "react-router-dom";

function Game() {
  // useLocation is a React Router tool that lets info to be read about current page, including any state passed to it
  // location.state?.category read the category name from that "note" passed. The ? is a safety check
  const location = useLocation();
  const category = location.state?.category;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold">{category}</h1>
      <p>Game goes here</p>
    </div>
  );
}

export default Game;
