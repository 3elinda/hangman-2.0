interface Props {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
  //   passing a function, void means it doesn't return anything
  disabled?: boolean;
  // ? after disabled means its optional, booloan means true or false, if nothing is passed, it won't be set
}

// splits the alphabet into an array of individual letters
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

function Keyboard({ guessedLetters, onGuess, disabled = false }: Props) {
  // disabled = false is the default value, if it's not passed as prop, ot defaults to false
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "center",
        maxWidth: "700px",
      }}
    >
      {LETTERS.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter) || disabled}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            fontFamily: "Pacifico, serif",
            border: "2px solid #8b0000",
            borderRadius: "4px",
            cursor: guessedLetters.includes(letter) ? "not-allowed" : "pointer",
            opacity: guessedLetters.includes(letter) || disabled ? 0.3 : 1,
            backgroundColor: "transparent",
            color: "#f5e6d0",
          }}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
    // disabled={guessedLetters.includes(letter)}, when a letter is guessed, the button gets disabled so it can't be clicked again
    // opacity: 0.3 disabled letters appear faded
  );
}

export default Keyboard;
