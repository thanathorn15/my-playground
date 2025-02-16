
import { useSelector } from "react-redux";

const Home = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center text-center 
                    transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-4xl font-bold">🏠 Welcome to My App</h1>
      <p className="text-lg mt-4">Use the navigation bar to explore different pages.</p>
    </div>
  );
};

export default Home;
