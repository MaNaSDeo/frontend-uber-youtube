import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { InputArrayType } from "../../App";
import styles from "./SquareBoxContainer.module.scss";
import { Link, useNavigate } from "react-router-dom";

interface SquareBoxContainerProps {
  data: InputArrayType;
  gridNum: number;
}

function SquareBoxContainer({ data, gridNum }: SquareBoxContainerProps) {
  const boxes = useMemo(() => data.flat(Infinity), [data]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [unloading, setUnloading] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const countOfVisibileBoxes = useMemo(() => {
    return boxes.reduce((acc: number, box) => {
      if (box === 1) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);
  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const indexStr = target.getAttribute("data-index");
    const status: string | null = target.getAttribute("data-status");

    if (
      indexStr === null ||
      status === "hidden" ||
      selected.has(parseFloat(indexStr)) ||
      unloading
    ) {
      return;
    }

    const index = parseInt(indexStr, 10);
    setSelected((prev) => {
      return new Set<number>(prev.add(index));
    });
  }

  const unload = () => {
    setUnloading(true);
    const keys = Array.from(selected.keys());

    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();

        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey!);
          return updatedKeys;
        });

        timerRef.current = setTimeout(removeNextKey, 500);
      } else {
        setUnloading(false);
        timerRef.current && clearTimeout(timerRef.current);
      }
    };
    timerRef.current = setTimeout(removeNextKey, 100);
  };

  useEffect(() => {
    if (selected.size >= countOfVisibileBoxes) {
      //unloading
      unload();
    }
  }, [selected]);

  useEffect(() => {
    if (gridNum === 0) {
      navigate("/");
    }
  }, [gridNum]);

  return (
    <div className={styles.squareBoxContainer}>
      <Link to="/">
        <button>Home</button>
      </Link>

      <div className={styles.squareContainer} onClick={handleClick}>
        {boxes &&
          boxes.length &&
          boxes.map((box, index) => {
            const status = box === 0 ? "hidden" : "visible";
            const isSelected = selected.has(index);
            return (
              <div
                className={`${styles.square} ${
                  box === 0 ? styles.boxHidden : styles.boxVisible
                } ${isSelected ? styles.selectedSquare : ""}`}
                key={`${box}-${index}`}
                data-index={index}
                data-status={status}
              ></div>
            );
          })}
      </div>
    </div>
  );
}

export default SquareBoxContainer;
