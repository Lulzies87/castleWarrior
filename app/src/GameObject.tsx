import { useEffect, useState } from "react";
import { Sprite } from "./Sprite";

export interface GameObjectProps {
  x?: number;
  y?: number;
  src?: string;
  ctx: CanvasRenderingContext2D;
}

export function GameObject({
  x = 0,
  y = 0,
  src = "src/assets/characters/warrior/Idle.png",
  ctx,
}: GameObjectProps) {
  const [positionX, setPositionX] = useState(x);
  const [positionY, setPositionY] = useState(y);

  return (
    <div>
      <Sprite
        config={{
          src: src,
          gameObject: {
            x: positionX,
            y: positionY,
          },
        }}
        ctx={ctx}
      />
    </div>
  );
}
