import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Game from "./pages/Game";
// bringing in 3 new pages

function App() {
  // just a regular function
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    //<Routes> a wrapper, everything inside is navigation
    //<Route path="/" element={<Home />} /> when the URL is /, show Home component
  );
}

export default App;
// makes this component available to other files, which is how main.tsx can use it
