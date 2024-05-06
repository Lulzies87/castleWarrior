import { useEffect, useRef, useState } from "react";
import styles from "./GameScreen.module.scss";

export function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [warriorX, setWarriorX] = useState(1);
  const [warriorY, setWarriorY] = useState(7);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const map = new Image();
    map.onload = () => {
      context.drawImage(map, 0, 0);
      drawWarrior(warriorX, warriorY, context);
    };
    map.src = "src/assets/maps/level1.png";

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "d" || "D":
          setWarriorX(warriorX + 0.09);
          console.log(warriorX);
          break;
        case "a" || "A":
          setWarriorX(warriorX - 0.09);
          console.log(warriorX);
          break;
        case "w" || "W":
          // add JUMP code
          console.log("JUMP!");
          break;
        case " ":
          // add HIT code
          console.log("HIT!");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [warriorX]);

  const drawWarrior = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    if (!ctx) {
      console.log("ctx is " + ctx);
      return;
    }
    const warrior = new Image();
    warrior.src = "src/assets/characters/warrior/Idle.png";
    warrior.onload = () => {
      ctx.drawImage(warrior, 0, 0, 78, 58, x * 32 - 8, y * 32 - 12, 78, 58);
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className={styles.gameCanvas}
      width="512"
      height="288"
    ></canvas>
  );
}
