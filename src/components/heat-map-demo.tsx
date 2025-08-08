import React, { useState, useEffect } from 'react';
import { HeatMap } from './heat-map';

interface ActivityData {
  X: number;
  Y: number;
  Activity: number;
}

// Demo component with mock data for testing
export const HeatMapDemo: React.FC = () => {
  const [mockData, setMockData] = useState<ActivityData[]>([]);

  useEffect(() => {
    // Generate some mock activity data
    const generateMockData = (): ActivityData[] => {
      const data: ActivityData[] = [];
      
      // Add some random activity points
      for (let i = 0; i < 20; i++) {
        data.push({
          X: Math.random() * 1863,
          Y: Math.random() * 1069.5,
          Activity: Math.random() * 100
        });
      }
      
      // Add some high-activity clusters
      const clusters = [
        { centerX: 500, centerY: 300, intensity: 90 },
        { centerX: 1200, centerY: 600, intensity: 75 },
        { centerX: 800, centerY: 800, intensity: 60 }
      ];
      
      clusters.forEach(cluster => {
        for (let i = 0; i < 5; i++) {
          data.push({
            X: cluster.centerX + (Math.random() - 0.5) * 200,
            Y: cluster.centerY + (Math.random() - 0.5) * 200,
            Activity: cluster.intensity + (Math.random() - 0.5) * 20
          });
        }
      });
      
      return data;
    };

    setMockData(generateMockData());
    
    // Update mock data every 5 seconds for demo
    const interval = setInterval(() => {
      setMockData(generateMockData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Heat Map Demo</h2>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <HeatMap activityData={mockData} />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Activity data points: {mockData.length}</p>
        <p>Map updates every 5 seconds with new mock data</p>
      </div>
    </div>
  );
};
