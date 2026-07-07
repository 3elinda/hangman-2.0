import { useNavigate } from "react-router-dom";
//useNavigate a tool from React Router to be able to navigate to diff page

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-6x1 font-bold">Hangman</h1>
      <p className="text-xl italic">Placeholder</p>
      <button
        className="px-8 py-4 text-2xl border-4 border-black rounded-full hover:bg-black hover:text-white transition-all"
        onClick={() => navigate("/categories")}
        // onClick is an event listener
        // transition-all makes hover effect animate smoothly instead of jumpiing instantely
      >
        Play Me
      </button>
    </div>
  );
}

export default Home;
