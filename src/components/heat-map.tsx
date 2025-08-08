import React, { useMemo } from 'react';

interface ActivityData {
  X: number;
  Y: number;
  Activity: number; // 0-100
}

interface HeatMapProps {
  activityData: ActivityData[];
  className?: string;
}

const SQUARE_SIZE = 42;
const MAP_WIDTH = 1863;
const MAP_HEIGHT = 1069.5;

// Calculate how many squares fit in the map
const SQUARES_X = Math.ceil(MAP_WIDTH / SQUARE_SIZE);
const SQUARES_Y = Math.ceil(MAP_HEIGHT / SQUARE_SIZE);

export const HeatMap: React.FC<HeatMapProps> = ({ activityData, className = '' }) => {
  // Create a grid of squares with calculated opacity
  const heatMapGrid = useMemo(() => {
    // Initialize grid with zero activity
    const grid: number[][] = Array(SQUARES_Y)
      .fill(null)
      .map(() => Array(SQUARES_X).fill(0));

    // Apply activity data to grid
    activityData.forEach(({ X, Y, Activity }) => {
      const gridX = Math.floor(X / SQUARE_SIZE);
      const gridY = Math.floor(Y / SQUARE_SIZE);

      if (gridX >= 0 && gridX < SQUARES_X && gridY >= 0 && gridY < SQUARES_Y) {
        // Set main square activity
        grid[gridY][gridX] = Math.max(grid[gridY][gridX], Activity);

        // Apply reduced activity to surrounding squares (heat spread effect)
        const spreadRadius = 4;
        const spreadIntensity = 0.5; // 30% of main activity

        for (let dy = -spreadRadius; dy <= spreadRadius; dy++) {
          for (let dx = -spreadRadius; dx <= spreadRadius; dx++) {
            const newX = gridX + dx;
            const newY = gridY + dy;

            if (
              newX >= 0 &&
              newX < SQUARES_X &&
              newY >= 0 &&
              newY < SQUARES_Y &&
              (dx !== 0 || dy !== 0)
            ) {
              const distance = Math.sqrt(dx * dx + dy * dy);
              const falloff = Math.max(0, 1 - distance / spreadRadius);
              const spreadActivity = Activity * spreadIntensity * falloff;

              grid[newY][newX] = Math.max(grid[newY][newX], spreadActivity);
            }
          }
        }
      }
    });

    return grid;
  }, [activityData]);

  return (
    <div className={`relative ${className}`} style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
      {/* Background map image */}
      <img
        src="/map.png"
        alt="Map"
        className="absolute z-[50] inset-0 w-full h-full object-cover"
        style={{
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          aspectRatio: '54/31',
        }}
      />
      {/* Heat map overlay */}
      <div className="absolute z-[0] inset-0">
        <svg
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          className="absolute  z-[1] inset-0"
          style={{ pointerEvents: 'none' }}>
          {heatMapGrid.map((row, y) =>
            row.map((activity, x) => {
              const opacity = Math.min(activity / 100, 1); // Convert activity (0-100) to opacity (0-1)

              return (
                <rect
                  key={`${x}-${y}`}
                  x={x * SQUARE_SIZE}
                  y={y * SQUARE_SIZE}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  fill="#E60528"
                  opacity={opacity}
                />
              );
            }),
          )}
        </svg>
      </div>
    </div>
  );
};
