interface Props {
  incorrectGuesses: number;
}

function HangmanImage({ incorrectGuesses }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#2a1a1a",
        borderRadius: "8px",
        padding: "1rem",
        border: "2px solid #8b0000",
      }}
    >
      <img
        // Math.min() picks the smaller of two numbers so never goes above 8
        src={`/images/hangman-${Math.min(incorrectGuesses + 1, 8)}.png`}
        alt={`Hangman stage ${incorrectGuesses}`}
        style={{ width: "400px", height: "400px", objectFit: "contain" }}
      />
    </div>
  );
}

export default HangmanImage;
