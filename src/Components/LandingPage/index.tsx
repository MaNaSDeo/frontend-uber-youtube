import { useState } from "react";
import styles from "./LandingPage.module.scss";

interface LandingPageProps {
  setGridNum: (num: number) => void;
}

function LandingPage({ setGridNum }: LandingPageProps) {
  const [gridSize, setGridSize] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const size = parseInt(gridSize, 10);
    if (!isNaN(size) && size > 0) {
      setGridNum(size);
    }
  };

  return (
    <div>
      <h1>Welcome to the Box Selection Game!</h1>
      <p>
        In this game, you'll create a grid of boxes, select some of them, and
        then watch as they magically disappear in the order you selected them.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="gridSize">
          Enter a number to create your grid (e.g., 3 for a 3x3 grid):
        </label>
        <input
          type="number"
          id="gridSize"
          value={gridSize}
          onChange={(e) => setGridSize(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Create Grid</button>
      </form>
    </div>
  );
}

export default LandingPage;
