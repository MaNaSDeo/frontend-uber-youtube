import SquareBoxContainer from "./Components/SquareBoxContainer";
import SelectBoxes from "./Components/SelectBoxes";

export type InputArrayType = number[][];

function App() {
  const inputArr: InputArrayType = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];
  return (
    <div>
      {/* <SquareBoxContainer data={inputArr} /> */}
      <SelectBoxes />
    </div>
  );
}

export default App;
