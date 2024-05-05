import { useState, useEffect } from "react";

interface Config {
  src: string;
  animations?: { [key: string]: number[][] };
  currentAnimation?: string;
  gameObject: { x: number; y: number };
}

interface Props {
  config: Config;
  ctx: CanvasRenderingContext2D;
}

export function Sprite({ config, ctx }: Props) {
  const [image, setImage] = useState(new Image());
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAnimationFrame, setCurrentAnimationFrame] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = config.src;
    img.onload = () => {
      setImage(img);
      setIsLoaded(true);
    };
  }, [config.src]);

  const animations = config.animations || {
    idle: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 0],
    ],
  };
  const currentAnimation = config.currentAnimation || "idle";

  const draw = () => {
    if (isLoaded && ctx) {
      const x = config.gameObject.x * 32 - 8;
      const y = config.gameObject.y * 32 - 12;

      ctx.drawImage(
        image,
        78 * animations[currentAnimation][currentAnimationFrame][0], // Assuming each frame width is 78
        58 * animations[currentAnimation][currentAnimationFrame][1], // Assuming each frame height is 58
        78, // Frame width
        58, // Frame height
        x, // Destination X
        y, // Destination Y
        78, // Destination width
        58 // Destination height
      );
    }
  };

  useEffect(() => {
    draw();
  }, [isLoaded, ctx, currentAnimationFrame]);

  return null;
}