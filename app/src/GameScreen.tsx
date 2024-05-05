import { useEffect, useRef, useState } from "react";
import styles from "./GameScreen.module.scss";
import { GameObject, GameObjectProps } from "./GameObject";

export function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [warriorX, setWarriorX] = useState(1);
  const [warriorY, setWarriorY] = useState(7);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    setCtx(context);

    const map = new Image();
    map.onload = () => {
      context.drawImage(map, 0, 0);
      drawWarrior(warriorX, warriorY);
    };
    map.src = "src/assets/maps/level1.png";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        setWarriorX(warriorX + 5);
        console.log(warriorX);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [warriorX]);

  const drawWarrior = (x: number, y: number) => {
    if (!ctx) return;
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas
    // Redraw background
    // const map = new Image();
    // map.src = "src/assets/maps/level1.png";
    // map.onload = () => {
    //   ctx.drawImage(map, 0, 0);
    // };
    // Draw warrior
    const warrior = new Image();
    warrior.src = "src/assets/characters/warrior/Idle.png";
    warrior.onload = () => {
      ctx.drawImage(warrior, x, y, 78, 58, 0, 0, 78, 58);
    };
  };

  return (
    <div className={styles.gameContainer}>
      <canvas
        ref={canvasRef}
        className={styles.gameCanvas}
        width="512"
        height="288"
      ></canvas>
      {/* <GameObject
        x={warriorX}
        y={warriorY}
        src="src/assets/characters/warrior/Idle.png"
        ctx={ctx!}
      /> */}
    </div>
  );
}
