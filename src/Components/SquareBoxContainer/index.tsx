import { useEffect, useState } from "react";
import { type InputArrayType } from "../../App";
import "./SquareBoxContainer.css";

interface SquareBoxContainerProps {
  inputArr: InputArrayType;
}

function SquareBoxContainer({ inputArr }: SquareBoxContainerProps) {
  const [count, setCount] = useState<number>(2);
  const [maxCount, setMaxCount] = useState<number>(0);
  const [tempArray, setTempArray] = useState<number[][]>([]);

  const handleClick = (row: number, col: number) => {
    // console.log("row :- ", row, "col :- ", col);
    inputArr[row][col] = count;
    setCount(count + 1);
    setTempArray((prevArray) => [...prevArray, [row, col]]);
    console.log("inputArr handleClick", inputArr);
  };

  useEffect(() => {
    let count = 2;
    for (let i = 0; i < inputArr.length; i++) {
      for (let j = 0; j < inputArr[i].length; j++) {
        if (inputArr[i][j] === 1) {
          count++;
        }
      }
    }
    setMaxCount(count);
  }, []);
  console.log("count", count);
  console.log("maxCount", maxCount);
  if (count === maxCount) {
    for (let i = tempArray.length - 1; i >= 0; i--) {
      inputArr[tempArray[i][0]][tempArray[i][1]] = 1;
      console.log("inputArr", inputArr);
    }
  }

  return (
    <main>
      {inputArr &&
        inputArr.length &&
        inputArr.map((subArray, row) => {
          return (
            <div className="square-container" key={row}>
              {subArray &&
                subArray.length &&
                subArray.map((ele, col) => {
                  return ele ? (
                    <button
                      className={`square ${ele !== 1 ? "selectedSquare" : ""}`}
                      key={col}
                      onClick={() => handleClick(row, col)}
                      disabled={ele !== 1}
                    ></button>
                  ) : null;
                })}
            </div>
          );
        })}
    </main>
  );
}

export default SquareBoxContainer;
