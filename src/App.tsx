import SquareBoxContainer from "./Components/SquareBoxContainer";

// type InnerSubArray = number[];
// type InputArrayType = InnerSubArray[];
export type InputArrayType = number[][];

function App() {
  const inputArr: InputArrayType = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];
  return (
    <div>
      <SquareBoxContainer inputArr={inputArr} />
    </div>
  );
}

export default App;
