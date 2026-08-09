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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "1.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          textAlign: "center" as const,
          fontFamily: "UnifrakturMaguntia, cursive",
          color: "#8b0000",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
          marginBottom: "1rem",
        }}
      >
        Choose Your Fate
      </h1>
      {categories.map((category) => (
        // .map() loops through categories list and creates a button for each one automatically instead of writing 5 buttons by hand
        <button
          key={category.name}
          // "React needs a unique key on each item it created in a loop so it can keep track of them>" Always add when using .map()
          onClick={
            () => navigate("/game", { state: { category: category.name } })
            // passings state between pages. "when navigating to /game a small piece of info is handed, the category name clicked. The game page will read the "note" and know which category to use"
          }
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#8b0000";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor =
              "transparent";
          }}
          style={{
            padding: "0.8rem 3rem",
            fontSize: "1.3rem",
            fontFamily: "Pacifico, cursive",
            color: "#f5e6d0",
            backgroundColor: "transparent",
            border: "3px solid #8b0000",
            borderRadius: "10px",
            cursor: "pointer",
            width: "250px",
            letterSpacing: "0.15em",
            transition: "all 0.3s ease",
            boxShadow: " 0 0 0 2px #1a0a0a, 0 0 0 4px #8b0000",
            textTransform: "uppercase" as const,
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;
