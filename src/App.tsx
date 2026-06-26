function App() {
  // just a regular function
  return (
    // instead of returning a number/word, this function returns HTML
    // React- functions that return HTML
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-4xl font-bold">Hangman</h1>
      <p>Word display goes here</p>
      <p>Keyboard goes here</p>
    </div>
    // Looks & works like HTML but it's called JSX (HTML living inside JS/TS)
  );
}

export default App;
// makes this component available to other files, which is how main.tsx can use it
