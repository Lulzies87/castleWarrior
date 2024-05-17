import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { getPlayerData, isLoggedIn, onGrid } from "./utils";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setPlayerData } from "./redux/playerSlice";
import { Boundary, loadBoundaries } from "./boundaries";
import { collisions } from "./data/collisions";
import styles from "./GameScreen.module.scss";
import { drawDiamond, drawEnemy, drawWarrior } from "./renderables";

export function GameScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [warriorPosition, setWarriorPosition] = useState({ x: 1, y: 7 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 10, y: 3 });
  const [movingRight, setMovingRight] = useState(false);
  const [movingLeft, setMovingLeft] = useState(false);
  const movementSpeed = 2;

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        if (isLoggedIn()) {
          const response = (await getPlayerData()) as AxiosResponse;
          if (response.status === 200) {
            dispatch(setPlayerData(response.data));
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

    fetchPlayerData();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const boundaries = loadBoundaries(collisions, 16);

    const map = new Image();
    map.onload = () => {
      context.drawImage(map, 0, 0);
      drawWarrior(warriorPosition, context);
      drawEnemy(enemyPosition, context);
      drawDiamond({ x: 6.7, y: 5.1 }, context);
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
    let animationId: number;

    const gameLoop = () => {
      console.log("Running gameloop");
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      if (movingRight) {
        const currentPosition = warriorPosition;
        const newX = warriorPosition.x + movementSpeed * (deltaTime / 1000);

        if (
          !checkCollision(onGrid(newX), onGrid(warriorPosition.y), boundaries)
        ) {
          setWarriorPosition({ ...currentPosition, x: newX });
        }
      }

      if (movingLeft) {
        const currentPosition = warriorPosition;
        const newX = warriorPosition.x - movementSpeed * (deltaTime / 1000);

        if (
          !checkCollision(onGrid(newX), onGrid(warriorPosition.y), boundaries)
        ) {
          setWarriorPosition({ ...currentPosition, x: newX });
        }
      }

      lastTime = currentTime;
      animationId = requestAnimationFrame(gameLoop);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const initGameloop = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(initGameloop);
    };
  }, [movingRight, movingLeft, warriorPosition]);

  const jump = () => {
    const currentPosition = warriorPosition;
    const newY = warriorPosition.y - 2;
    setWarriorPosition({ ...currentPosition, y: newY });
  };

  const attack = () => {
    console.log("Attack!");
    // Implement attack logic
  };

  const checkCollision = (
    x: number,
    y: number,
    boundaries: Boundary[]
  ): boolean => {
    const warriorLeft = x + 9;
    const warriorRight = x + 78;
    const warriorTop = y;
    const warriorBottom = y + 32;

    for (const boundary of boundaries) {
      const boundaryLeft = boundary.position.x + 32;
      const boundaryRight = boundary.position.x + boundary.width;
      const boundaryTop = boundary.position.y;
      const boundaryBottom = boundary.position.y + boundary.height;

      if (
        warriorLeft < boundaryRight &&
        warriorRight > boundaryLeft &&
        warriorTop < boundaryBottom &&
        warriorBottom > boundaryTop
      ) {
        console.log("Colliding!");
        return true;
      }
    }

    console.log("Not Colliding!");
    return false;
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
