import { useState, type FormEvent, type ChangeEvent } from "react";
import styles from "./LandingPage.module.scss";
import { useNavigate } from "react-router-dom";

interface LandingPageProps {
  setGridNum: (num: number) => void;
}

function LandingPage({ setGridNum }: LandingPageProps) {
  const [gridSize, setGridSize] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const size = parseInt(gridSize, 10);
    if (!isNaN(size) && size > 0 && size < 11) {
      setGridNum(size);
      navigate("/select-boxes");
    } else if (!isNaN(size) && size > 0) {
      alert("Please enter a number smaller than or equall to 10.");
    } else {
      alert("Please enter a valid positive number.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGridSize(e.target.value);
  };

  return (
    <div className={styles.landingPage}>
      <h1 className={styles.heading}>Welcome to the Box Selection Game!</h1>
      <p className={styles.titleText}>
        {/* In this game, you'll create a grid of boxes, select some of them, and
        then watch as they magically disappear in the order you selected them. */}
        In this game, you'll create a grid of boxes, select a pattern by
        clicking on them, and then watch as the selected boxes disappear one by
        one in the order you chose.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="gridSize">
          Enter a number to create your grid (e.g., 3 for a 3x3 grid):
        </label>
        <div className={styles.inputBtn}>
          <input
            type="number"
            id="gridSize"
            value={gridSize}
            onChange={handleChange}
            min="1"
            required
            placeholder="Number between 1 and 10"
          />
          <button type="submit">Create Grid</button>
        </div>
      </form>
    </div>
  );
}

export default LandingPage;
