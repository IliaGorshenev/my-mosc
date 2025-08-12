import { useActivityData } from '@/hooks/use-activity';
import React from 'react';
import { HeatMap } from './heat-map';

interface HeatMapContainerProps {
  className?: string;
}

export const HeatMapContainer: React.FC<HeatMapContainerProps> = ({ className }) => {
  const { activityData, loading, error } = useActivityData();

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', aspectRatio: '1863/1069.5' }}>
        <div className="text-lg">Loading heat map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', aspectRatio: '1863/1069.5' }}>
        <div className="text-lg text-red-500">Error loading heat map: {error}</div>
      </div>
    );
  }

  return <HeatMap activityData={activityData} className={className} />;
};
