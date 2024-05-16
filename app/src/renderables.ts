import { onGrid } from "./utils";

export function drawWarrior(
  position: { x: number; y: number },
  ctx: CanvasRenderingContext2D
) {
  if (!ctx) {
    console.log("ctx is " + ctx);
    return;
  }
  const warrior = new Image();
  warrior.src = "src/assets/characters/warrior/Idle.png";
  warrior.onload = () => {
    ctx.drawImage(
      warrior,
      0,
      0,
      78,
      58,
      onGrid(position.x),
      onGrid(position.y) - 12,
      78,
      58
    );
  };
}

export function drawEnemy(
    position: { x: number; y: number },
    ctx: CanvasRenderingContext2D
  ) {
    if (!ctx) {
      console.log("ctx is " + ctx);
      return;
    }
    const enemy = new Image();
    enemy.src = "src/assets/characters/enemy/Idle.png";
    enemy.onload = () => {
      ctx.drawImage(
        enemy,
        0,
        0,
        34,
        28,
        onGrid(position.x),
        onGrid(position.y) + 4,
        34,
        28
      );
    };
  }

export function drawDiamond(
    position: { x: number; y: number },
    ctx: CanvasRenderingContext2D
  ) {
    if (!ctx) {
      console.log("ctx is " + ctx);
      return;
    }
    const enemy = new Image();
    enemy.src = "src/assets/objects/diamond/BigDiamondIdle.png";
    enemy.onload = () => {
      ctx.drawImage(
        enemy,
        0,
        0,
        18,
        14,
        onGrid(position.x),
        onGrid(position.y) + 4,
        18,
        14
      );
    };
  }