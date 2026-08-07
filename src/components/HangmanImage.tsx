interface Props {
  incorrectGuesses: number;
}

function HangmanImage({ incorrectGuesses }: Props) {
  return (
    <img
      // Math.min() picks the smaller of two numbers so never goes above 8
      src={`/images/hangman-${Math.min(incorrectGuesses + 1, 8)}.png`}
      alt={`Hangman stage ${incorrectGuesses}`}
      style={{ width: "300px", height: "300px", objectFit: "contain" }}
    />
  );
}

export default HangmanImage;
