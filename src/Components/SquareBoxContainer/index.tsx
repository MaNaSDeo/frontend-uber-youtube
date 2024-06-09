import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { InputArrayType } from "../../App";
import "./SquareBoxContainer.css";

interface SquareBoxContainerProps {
  data: InputArrayType;
}

function SquareBoxContainer({ data }: SquareBoxContainerProps) {
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

  return (
    <div className="square-container" onClick={handleClick}>
      {boxes &&
        boxes.length &&
        boxes.map((box, index) => {
          const status = box === 0 ? "hidden" : "visible";
          const isSelected = selected.has(index);
          return (
            <div
              className={`square ${box === 0 ? "boxHidden" : "boxVisible"} ${
                isSelected ? "selectedSquare" : ""
              }`}
              key={`${box}-${index}`}
              data-index={index}
              data-status={status}
            ></div>
          );
        })}
    </div>
  );
}

export default SquareBoxContainer;
