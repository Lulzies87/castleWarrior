export interface Boundary {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  draw(c: CanvasRenderingContext2D): void;
}

class BoundaryImpl implements Boundary {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  constructor(x: number, y: number) {
    this.position = { x, y };
    this.width = 32;
    this.height = 32;
  }
  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export function loadBoundaries(
  collisions: number[],
  mapWidth: number
): Boundary[] {
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += mapWidth) {
    collisionsMap.push(collisions.slice(i, i + mapWidth));
  }
  const boundaries: Boundary[] = [];

  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol > 0) {
        const boundary = new BoundaryImpl(j * 32, i * 32);
        boundaries.push(boundary);
      }
    });
  });

  return boundaries;
}

// export function drawBoundaries(
//   boundaries: Boundary[],
//   context: CanvasRenderingContext2D
// ) {
//   boundaries.forEach((boundary) => {
//     boundary.draw(context);
//   });
// }
