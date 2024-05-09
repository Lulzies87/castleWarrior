import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import styles from "./GameScreen.module.scss";
import { isLoggedIn } from "./utils";

export function GameScreen() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [warriorX, setWarriorX] = useState(1);
  const [warriorY, setWarriorY] = useState(7);
  
  
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
    
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

    let moveInterval: number | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "d":
        case "D":
          if (!moveInterval) {
            moveInterval = setInterval(() => {
              setWarriorX((prevX) => prevX + 0.1);
            }, 1);
          }
          break;
        case "a":
        case "A":
          setWarriorX((prevX) => prevX - 0.1);
          break;
        case "w":
        case "W":
          // add JUMP code
          setWarriorY((prevY) => prevY - 2);
          console.log("JUMP!");
          break;
        case " ":
          // add HIT code
          console.log("HIT!");
          break;
        case "Escape":
          navigate("/");
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "d":
        case "D":
          if (moveInterval) {
            clearInterval(moveInterval);
            moveInterval = null;
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (moveInterval) {
        clearInterval(moveInterval);
      }
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
