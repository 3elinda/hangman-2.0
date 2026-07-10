// defining what info this component expects to receive
// needs a word which is a sring, and a guessedLetters which is an array of strings
interface Props {
  word: string;
  guessedLetters: string[];
}

// {word, guessedLetter }: Props is how the component receives info, called props(properties)
// Props are how React components talk to each other, parent component passes info down to child component
function WordDisplay({ word, guessedLetters }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* word.split("") splits the word into individual letters. Ex: 'Dog' -> ['d', 'o', 'g'] */}
      {/* .map() creates a blank line for each letter */}
      {word.split("").map((letter, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              minWidth: "2rem",
              textAlign: "center",
            }}
          >
            {guessedLetters.includes(letter) ? letter : ""}
            {/* {guessedLetters.includes(letter) checks if this letter has been guessed yet and letter is shown if yes.
              If no, nothing is shown expect for the line underneath */}
          </span>
          <div
            style={{
              width: "2rem",
              height: "4px",
              backgroundColor: "black",
              marginTop: "4px",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default WordDisplay;
