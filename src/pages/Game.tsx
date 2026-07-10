import WordDisplay from "../components/WordDisplay";
// useState is how React remembers things, a way to store values that React keeps track of
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWord } from "../services/wordService";

function Game() {
  // useLocation is a React Router tool that lets info to be read about current page, including any state passed to it
  // location.state?.category read the category name from that "note" passed. The ? is a safety check
  const location = useLocation();
  const category = location.state?.category;

  // word is the current value which starts as an empty string
  // setWord is the function called to update it
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  // loading starts as true but once word arrives it is set to false

  // useEffect runs code at a specific moment, without it the fetch would run on every re-render
  useEffect(() => {
    async function fetchWord() {
      const fetchWord = await getWord(category);
      setWord(fetchWord);
      setLoading(false);
      // when setLoading(false) runs, React re-renders and shows word
    }

    fetchWord();
  }, [category]);
  // dependacy array so React only re-runs effect if category changes

  // show "Loading..." message when waiting for word to arrive
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <h1 className="text-4xl font-bold">{category}</h1>
      {/* <p>The word is: {word}</p> */}
      <WordDisplay word={word} guessedLetters={[]} />
    </div>
  );
}

export default Game;
