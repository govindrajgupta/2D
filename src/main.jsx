import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import ReactUI from "./ReactUI";
import { Provider } from "jotai";
import { store } from "./store";
import initGame from "./initGame";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameInitialized, setGameInitialized] = useState(false);

  const handleLoadingComplete = () => {
    // Start loading the gamee
    if (!gameInitialized) {
      initGame().catch(error => {
        console.error("Failed to initialize game:", error);
      });
      setGameInitialized(true);
    }
    
    // Smoother transition timing
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <StrictMode>
      <Provider store={store}>
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        <ReactUI />
      </Provider>
    </StrictMode>
  );
};

const ui = document.getElementById("ui");
const root = createRoot(ui);
root.render(<App />);
