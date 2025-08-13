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
const MAP_ASPECT_RATIO = 1863 / 1069.5; // ~1.74

// Base dimensions for calculations (can be scaled)
const BASE_MAP_WIDTH = 1863;
const BASE_MAP_HEIGHT = 1069.5;

// Calculate how many squares fit in the map
const SQUARES_X = Math.ceil(BASE_MAP_WIDTH / SQUARE_SIZE);
const SQUARES_Y = Math.ceil(BASE_MAP_HEIGHT / SQUARE_SIZE);

export const HeatMap: React.FC<HeatMapProps> = ({ activityData, className = '' }) => {
  console.log(activityData);
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
    <div
      className={`relative ${className}`}
      style={{
        width: '100%',
        aspectRatio: MAP_ASPECT_RATIO.toString(),
      }}>
      {/* Background map image */}
      <img
        src="/map.svg"
        alt="Map"
        className="absolute z-[50] inset-0 w-full h-full object-cover"
        style={{
          aspectRatio: MAP_ASPECT_RATIO.toString(),
        }}
      />
      {/* Heat map overlay */}
      <div className="absolute z-[0] inset-0">
        <svg
          width="100%"
          height="100%"
          className="absolute z-[1] inset-0"
          style={{ pointerEvents: 'none' }}
          viewBox={`0 0 ${BASE_MAP_WIDTH} ${BASE_MAP_HEIGHT}`}
          preserveAspectRatio="none">
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
