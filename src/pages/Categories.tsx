import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Movies" },
  { name: "Animals" },
  { name: "Countries" },
  { name: "Random" },
];
// const categories is a list of category objects

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold">Choose a Category</h1>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          // .map() loops through categories list and creates a button for each one automatically instead of writing 5 buttons by hand
          <button
            key={category.name}
            // "React needs a unique key on each item it created in a loop so it can keep track of them>" Always add when using .map()
            className="px-8 py-4 tet-xl border-4 border-black rounded-full hover:bg-balck hover:text-white transition all"
            onClick={
              () => navigate("/game", { state: { category: category.name } })
              // passings state between pages. "when navigating to /game a small piece of info is handed, the category name clicked. The game page will read the "note" and know which category to use"
            }
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
