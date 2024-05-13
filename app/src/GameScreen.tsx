import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import styles from "./GameScreen.module.scss";
import { getPlayerData, isLoggedIn } from "./utils";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setPlayerData } from "./redux/playerSlice";
import { collisions } from "./data/collisions";

export function GameScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [warriorX, setWarriorX] = useState(1);
  const [warriorY, setWarriorY] = useState(7);
  const [movingRight, setMovingRight] = useState(false);
  const [movingLeft, setMovingLeft] = useState(false);
  const movementSpeed = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn()) {
          const response = (await getPlayerData()) as AxiosResponse;
          if (response.status === 200) {
            dispatch(setPlayerData(response.data));

            const collisionsMap = [];
            for (let i = 0; i < collisions.length; i += 16) {
              collisionsMap.push(collisions.slice(i, i + 16));
            }
            console.log(collisionsMap);
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        navigate("/login");
      }
    };

    fetchData();

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
        case "d":
        case "D":
          setMovingRight(true);
          break;
        case "a":
        case "A":
          setMovingLeft(true);
          break;
        case "w":
        case "W":
          jump();
          break;
        case " ":
          attack();
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
          setMovingRight(false);
          break;
        case "a":
        case "A":
          setMovingLeft(false);
          break;
      }
    };

    let lastTime = performance.now();

    const gameLoop = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      if (movingRight) {
        const newX = warriorX + movementSpeed * (deltaTime / 1000);
        setWarriorX(newX);
      }
      if (movingLeft) {
        const newX = warriorX - movementSpeed * (deltaTime / 1000);
        setWarriorX(newX);
      }

      lastTime = currentTime;
      requestAnimationFrame(gameLoop);
    };

    const jump = () => {
      setWarriorY((prevY) => prevY - 2);
    };

    const attack = () => {
      // Implement attack logic
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const animationId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [dispatch, navigate, movingRight, movingLeft, warriorX, warriorY]);

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
