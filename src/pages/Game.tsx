import HangmanImage from "../components/HangmanImage";
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
  const hasLost = incorrectGuesses.length >= 7;

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
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontSize: "2rem",
          fontFamily: "Crimson Text, serif",
          color: "#f5e6d0",
        }}
      >
        A word is being chosen...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "3rem 1rem",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontFamily: "UnifrakturMaguntia, cursive",
          color: "#8b0000",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {category}
      </h1>
      {/* <p>The word is: {word}</p> */}

      <p
        style={{
          fontSize: "1.4rem",
          fontFamily: "Crimson Text, serif",
          color: "#f5e6d0",
          letterSpacing: "0.1em",
        }}
      >
        Incorrect guesses: {incorrectGuesses.length} / 7
      </p>

      <HangmanImage incorrectGuesses={incorrectGuesses.length} />

      <WordDisplay word={word} guessedLetters={guessedLetters} />

      <Keyboard
        guessedLetters={guessedLetters}
        onGuess={handleGuess}
        disabled={hasWon || hasLost}
      />
      {/* both compotents recieve guessedLetters so they stay in sync */}
      {/* WordDisplay uses it decide which letter to reveal, keyboard uses it to fade out already clicked buttons */}
      {/* onGuess={handledGuess} passes the function down to keyboard, wehn a button is clicked it can tell Game.tsx */}

      {hasWon && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontFamily: "UnifrakturMaguntia, cursive",
              color: "#c9a84c",
              textShadow: "2px 2px 8px rgba(0,0,0,0.8",
            }}
          >
            Curiouser and curiouser! You Won!
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              fontFamily: "Crimson Text. serif",
              color: "#f5e6d0",
            }}
          >
            The word was: <strong>{word}</strong>
          </p>
          <button
            onClick={handlePlayAgain}
            style={{
              padding: "0.8rem 2.5rem",
              fontSize: "1.2rem",
              fontFamily: "Pacifico, cursive",
              color: "#c9a84c",
              backgroundColor: "transparent",
              border: "2px solid #c9a84c",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor =
                "transparent";
              (e.target as HTMLButtonElement).style.color = "#f5e6d0";
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
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontFamily: "UnifrakturMaguntia, cursive",
              color: "#8b0000",
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Off with his Head!
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              fontFamily: "Crimson Text, serif",
              color: "#f5e6d0",
            }}
          >
            The word was: <strong>{word}</strong>
          </p>
          <button
            onClick={handlePlayAgain}
            style={{
              padding: "0.8rem 2.5rem",
              fontSize: "1.2rem",
              fontFamily: "Pacifico, cursive",
              color: "#f5e6d0",
              backgroundColor: "transparent",
              border: "2px solid #8b0000",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#8b0000";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor =
                "transparent";
            }}
          >
            Play Me Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
