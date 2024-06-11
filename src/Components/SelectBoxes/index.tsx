import { useEffect, useState, type MouseEvent } from "react";
import styles from "./SelectBoxes.module.scss";
import { useNavigate } from "react-router-dom";

export type GridData = number[][];

interface SelectBoxesProps {
  gridNum: number;
  setPatternArray: (arr: GridData) => void;
}
function SelectBoxes({ gridNum, setPatternArray }: SelectBoxesProps) {
  const [targetArray, setTargetArray] = useState<GridData>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const arr = Array(gridNum).fill(Array(gridNum).fill(0));
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

  const onSubmit = () => {
    setPatternArray(targetArray);
    navigate("/square-box-container");
  };

  useEffect(() => {
    if (gridNum === 0) {
      navigate("/");
    }
  }, [gridNum]);

  return (
    <div className={styles.selectBoxes}>
      <h1>Select Your Pattern!</h1>
      <p>
        Click on the boxes to select (or deselect) them and create your desired
        pattern. Once you're happy with your selection, click 'Submit the
        Pattern' to proceed.
      </p>
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
      <button onClick={onSubmit}>Submit the pattern</button>
    </div>
  );
}

export default SelectBoxes;
