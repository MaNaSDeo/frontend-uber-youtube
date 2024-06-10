import { useEffect, useState, type MouseEvent } from "react";
import styles from "./SelectBoxes.module.scss";

type GridValue = 0 | 1;
type GridRow = GridValue[];
type GridData = GridRow[];

function SelectBoxes() {
  const data = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [targetArray, setTargetArray] = useState<number[][]>(data);
  console.log("targetArray", targetArray);

  useEffect(() => {
    const arr = Array(3).fill(Array(3).fill(0));
    // const arr = Array(3).map(() => Array(3).fill(0));
    setTargetArray(arr);
  }, []);
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const rowAttr = target.getAttribute("data-row");
    const colAttr = target.getAttribute("data-col");

    if (rowAttr !== null && colAttr !== null) {
      const row = parseInt(rowAttr, 10);
      const col = parseInt(colAttr, 10);

      if (!isNaN(row) && !isNaN(col)) {
        setTargetArray((prevArr) => {
          const updatedArray = prevArr.map((subArr, rIndex) => {
            return subArr.map((val, cIndex) => {
              if (rIndex === row && cIndex === col && val === 0) {
                return 1;
              } else if (rIndex === row && cIndex === col && val === 1) {
                return 0;
              }
              return val;
            });
          });
          return updatedArray;
        });
      }
    }
  };
  return (
    <div className={styles.squareContainer} onClick={handleClick}>
      {targetArray &&
        targetArray.length &&
        targetArray.map((subArr, row) => {
          return (
            subArr &&
            subArr.length &&
            subArr.map((ele, col) => {
              return (
                <div
                  key={`${row}-${col}`}
                  className={`${styles.square} ${
                    ele === 1 ? styles.selectedSquare : ""
                  }`}
                  data-row={row}
                  data-col={col}
                ></div>
              );
            })
          );
        })}
    </div>
  );
}

export default SelectBoxes;
