import WordDisplay from "../components/WordDisplay";
// useState is how React remembers things, a way to store values that React keeps track of
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWord } from "../services/wordService";
import Keyboard from "../components/keyboard";

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

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  // stores an array of strings, every letter that has been guessed. starts as an empty array []
  // <string[]> it is specifically an array of strings

  function handleGuess(letter: string) {
    setGuessedLetters((prev) => [...prev, letter]);
  }
  // every time a keyboard button is clicked, the function runs and adds the clicked letter to the guessedLetters array
  // prev => [...prev, letter]  prev is the previous array of guessed letters
  // ...prev 'spreads out everyting that was already there
  // , letter adds the new letter at the end
  // Ex: ['a', 'b'] and c was clicked, becomes ['a', 'b', 'c']

  function handlePlayAgain() {
    // clears all guessed letters back to empty
    setGuessedLetters([]);
    // shows the loading message while fetching
    setLoading(true);
    // fetches a new word, .then() is similar to await, waits for the word to arrive then runs code inside
    getWord(category).then((newWord) => {
      setWord(newWord);
      setLoading(false);
    });
  }

  const incorrectGuesses = guessedLetters.filter(
    (letter) => !word.includes(letter),
  );
  // filters through alll guessed letters and keeps that ones not included in the word
  // !word.includes(letter) means letter is not in the word

  // checks if every letter in the word has been guessed
  // .every() returns true only if all items in the array pass the check
  const hasWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // checks if incorrect guessed reached 6
  const hasLost = incorrectGuesses.length >= 8;

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "4rem 1",
      }}
    >
      <h1 className="text-4xl font-bold">{category}</h1>
      {/* <p>The word is: {word}</p> */}

      <p style={{ fontSize: "1.2rem" }}>
        Incorrect guesses: {incorrectGuesses.length} / 8
      </p>

      {hasWon && (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>You Won!</p>
          <p>The word was: {word}</p>
          <button
            onClick={handlePlayAgain}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Play Me Again
          </button>
        </div>
      )}
      {/* {hasWon && (...) if hasWon is true, show this} */}

      {hasLost && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Off with his Head!
          </p>
          <p>The word was: {word}</p>
          <button
            onClick={handlePlayAgain}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Play Me Again
          </button>
        </div>
      )}
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <Keyboard
        guessedLetters={guessedLetters}
        onGuess={handleGuess}
        disabled={hasWon || hasLost}
      />
      {/* both compotents recieve guessedLetters so they stay in sync */}
      {/* WordDisplay uses it decide which letter to reveal, keyboard uses it to fade out already clicked buttons */}
      {/* onGuess={handledGuess} passes the function down to keyboard, wehn a button is clicked it can tell Game.tsx */}
    </div>
  );
}

export default Game;
