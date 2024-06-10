import SquareBoxContainer from "./Components/SquareBoxContainer";
import SelectBoxes from "./Components/SelectBoxes";
import "./index.css";
import LandingPage from "./Components/LandingPage";
export type InputArrayType = number[][];

function App() {
  const inputArr: InputArrayType = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];
  return (
    <div className="app">
      {/* <SquareBoxContainer data={inputArr} /> */}
      {/* <SelectBoxes /> */}
      <LandingPage />
    </div>
  );
}

export default App;
