import SquareBoxContainer from "./Components/SquareBoxContainer";
import SelectBoxes, { type GridData } from "./Components/SelectBoxes";
import "./index.css";
import LandingPage from "./Components/LandingPage";
import { useState, useEffect, type CSSProperties } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export type InputArrayType = number[][];

function App() {
  const [gridNum, setGridNum] = useState<number>(0);
  const [patternArray, setPatternArray] = useState<GridData>([]);

  useEffect(() => {
    const handleResize = () => {
      const boxSize = Math.min(
        Math.min(window.innerWidth / gridNum - 20, 100),
        Math.min(window.innerHeight / gridNum - 20, 100)
      );
      document.documentElement.style.setProperty("--box-size", `${boxSize}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [gridNum]);

  return (
    <Router>
      <div className="app" style={{ "--grid-num": gridNum } as CSSProperties}>
        <Routes>
          <Route path="/" element={<LandingPage setGridNum={setGridNum} />} />

          <Route
            path="/square-box-container"
            element={
              <SquareBoxContainer data={patternArray} gridNum={gridNum} />
            }
          />

          <Route
            path="/select-boxes"
            element={
              <SelectBoxes
                gridNum={gridNum}
                setPatternArray={setPatternArray}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
