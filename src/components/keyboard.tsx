interface Props {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
  //   passing a function, void means it doesn't return anything
}

// splits the alphabet into an array of individual letters
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

function Keyboard({ guessedLetters, onGuess }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "center",
        maxWidth: "500px",
      }}
    >
      {LETTERS.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter)}
          style={{
            width: "2.5rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "2px solid black",
            borderRadius: "4px",
            cursor: guessedLetters.includes(letter) ? "not-allowed" : "pointer",
            opacity: guessedLetters.includes(letter) ? 0.3 : 1,
            backgroundColor: "white",
          }}
        >
          {letter}
        </button>
      ))}
    </div>
    // disabled={guessedLetters.includes(letter)}, when a letter is guessed, the button gets disabled so it can't be clicked again
    // opacity: 0.3 disabled letters appear faded
  );
}

export default Keyboard;
