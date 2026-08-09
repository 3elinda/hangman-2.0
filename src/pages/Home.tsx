import { useNavigate } from "react-router-dom";
//useNavigate a tool from React Router to be able to navigate to diff page

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
          fontFamily: "UnifrakturMaguntia, cursive",
          color: "#8b0000",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        Hangman
      </h1>
      <p
        style={{
          fontSize: "1.3rem",
          fontStyle: "italic",
          color: "#f5e6d0",
          fontFamily: "Crimson Text, serif",
        }}
      >
        {" "}
        A curious game of words...
      </p>
      <button
        onClick={() => navigate("/categories")}
        // onClick is an event listener
        style={{
          padding: "1rem 2.5rem",
          fontSize: "1.5rem",
          fontFamily: "Pacifico, cursive",
          color: "#f5e6d0",
          backgroundColor: "transparent",
          border: "2px solid #8b0000",
          borderRadius: "4px",
          cursor: "pointer",
          letterSpacing: "0.1em",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = "#8b0000";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
        }}
      >
        Play Me
      </button>
    </div>
  );
}

export default Home;
