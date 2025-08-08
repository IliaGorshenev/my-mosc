import { useCallback, useEffect, useState } from 'react';

interface ActivityData {
  X: number;
  Y: number;
  Activity: number;
}

const generateMockData = (): ActivityData[] => {
  const data: ActivityData[] = [];

  // Add some random activity points
  for (let i = 0; i < 15; i++) {
    data.push({
      X: Math.random() * 1863,
      Y: Math.random() * 1069.5,
      Activity: Math.random() * 100,
    });
  }

  // Add some high-activity clusters
  const clusters = [
    { centerX: 500, centerY: 300, intensity: 90 },
    { centerX: 1200, centerY: 600, intensity: 75 },
    { centerX: 800, centerY: 800, intensity: 60 },
    { centerX: 300, centerY: 500, intensity: 85 },
  ];

  clusters.forEach((cluster) => {
    for (let i = 0; i < 3; i++) {
      data.push({
        X: cluster.centerX + (Math.random() - 0.5) * 150,
        Y: cluster.centerY + (Math.random() - 0.5) * 150,
        Activity: cluster.intensity + (Math.random() - 0.5) * 20,
      });
    }
  });

  return data;
};

export const useActivityData = () => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivityData = useCallback(async () => {
    try {
      setLoading(false);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For now, use mock data. Replace this with your actual API call when ready:
      // const response = await fetch('YOUR_BACKEND_API_ENDPOINT');
      // const data: ActivityData[] = await response.json();

      const data = generateMockData();
      setActivityData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching activity data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivityData();

    // Optional: Set up polling for real-time updates
    const interval = setInterval(fetchActivityData, 3000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [fetchActivityData]);

  return { activityData, loading, error, refetch: fetchActivityData };
};
