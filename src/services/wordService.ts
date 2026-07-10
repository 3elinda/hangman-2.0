import { wordsByCategory } from "../data/words";

// async function returns a Promise
export async function getWord(category: string): Promise<string> {
  // if category is Random, call API. If not, pick a random word from own list using Math.random()
  if (category === "Random") {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    return data[0];
    // await goes hand in hand with asyn. Without it code could move on before API replies
    // fetch() built in browser toll that makes the call to the API, gets data from the URL
    // response.json() converts raw data API sent into something that JS can work with
  }

  const words = wordsByCategory[category];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
  //   Math.floor(Math.random() * words.length) picks random number between 0 and length of word list to give random word every time
}
