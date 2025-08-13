// import { useActivityData } from '@/hooks/use-activity';
// import React, { useEffect, useState } from 'react';
// import { HeatMap } from './heat-map';

// interface HeatMapContainerProps {
//   className?: string;
//   useRealData?: boolean; // Optional prop to toggle between mock and real data
// }

// interface ActivityDataResponse {
//   success: boolean;
//   data: Array<{
//     X: number;
//     Y: number;
//     Activity: number;
//   }>;
// }

// export const HeatMapContainer: React.FC<HeatMapContainerProps> = ({
//   className,
//   useRealData = true, // Default to using real data from API
// }) => {
//   const {
//     activityData: mockActivityData,
//     loading: mockLoading,
//     error: mockError,
//   } = useActivityData();
//   const [realActivityData, setRealActivityData] = useState<
//     Array<{ X: number; Y: number; Activity: number }>
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!useRealData) {
//       return; // Skip API call if using mock data
//     }

//     const fetchActivityData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/activityData');

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const responseData: ActivityDataResponse = await response.json();

//         if (!responseData.success) {
//           throw new Error('API returned unsuccessful response');
//         }

//         setRealActivityData(responseData.data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching activity data:', err);
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActivityData();

//     // Set up polling for real-time updates
//     const interval = setInterval(fetchActivityData, 5000); // Update every 10 seconds

//     return () => clearInterval(interval);
//   }, [useRealData]);

//   // Determine which data and loading state to use
//   const finalActivityData = useRealData ? realActivityData : mockActivityData;
//   const isLoading = useRealData ? loading : mockLoading;
//   const currentError = useRealData ? error : mockError;

//   if (isLoading) {
//     return (
//       <div
//         className={`flex items-center justify-center ${className}`}
//         style={{ width: '100%', aspectRatio: '1863/1069.5' }}>
//         <div className="text-lg">Загрузка карты </div>
//       </div>
//     );
//   }

//   if (currentError) {
//     return (
//       <div
//         className={`flex items-center justify-center ${className}`}
//         style={{ width: '100%', aspectRatio: '1863/1069.5' }}>
//         <div className="text-lg text-red-500">Ошибка загрузки карты: {currentError}</div>
//       </div>
//     );
//   }

//   return <HeatMap activityData={finalActivityData} className={className} />;
// };

import { useActivityData } from '@/hooks/use-activity';
import React, { useState } from 'react';
import { HeatMap } from './heat-map';
import { VideoStream } from './video-stream';

interface HeatMapContainerProps {
  className?: string;
  useRealData?: boolean; // Optional prop to toggle between mock and real data
  showVideoStream?: boolean; // New prop to toggle video stream
}

 // @ts-ignore
interface ActivityDataResponse {
  success: boolean;
  data: Array<{
    X: number;
    Y: number;
    Activity: number;
  }>;
}

export const HeatMapContainer: React.FC<HeatMapContainerProps> = ({
  className,
  useRealData = true, // Default to using real data from API
  showVideoStream = true, // Default to not showing video stream
}) => {
  const {
    activityData: mockActivityData,
    loading: mockLoading,
    error: mockError,
  } = useActivityData();
  // @ts-ignore
  const [realActivityData, setRealActivityData] = useState<
    Array<{ X: number; Y: number; Activity: number }>
  >([]);
  // @ts-ignore
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [error, setError] = useState<string | null>(null);
  // @ts-ignore
  const [streamError, setStreamError] = useState(false);

  // useEffect(() => {
  //   if (!useRealData) {
  //     return; // Skip API call if using mock data
  //   }

  //   const fetchActivityData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('/api/activityData');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const responseData: ActivityDataResponse = await response.json();

  //       if (!responseData.success) {
  //         throw new Error('API returned unsuccessful response');
  //       }

  //       setRealActivityData(responseData.data);
  //       setError(null);
  //     } catch (err) {
  //       console.error('Error fetching activity data:', err);
  //       setError(err instanceof Error ? err.message : 'Unknown error occurred');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchActivityData();

  //   // Set up polling for real-time updates
  //   const interval = setInterval(fetchActivityData, 5000); // Update every 5 seconds

  //   return () => clearInterval(interval);
  // }, [useRealData]);

  // Determine which data and loading state to use
  const finalActivityData = useRealData ? realActivityData : mockActivityData;

  // @ts-ignore
  const isLoading = useRealData ? loading : mockLoading;
  const currentError = useRealData ? error : mockError;

  const handleStreamError = () => {
    setStreamError(true);
  };

  // if (isLoading) {
  //   return (
  //     <div
  //       className={`flex items-center justify-center ${className}`}
  //       style={{ width: '100%', aspectRatio: '1863/1069.5' }}>
  //       <div className="text-lg">Загрузка карты </div>
  //     </div>
  //   );
  // }

  if (currentError) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', aspectRatio: '1863/1069.5' }}>
        <div className="text-lg text-red-500">Ошибка загрузки карты: {currentError}</div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: '100%',  aspectRatio: '1863/1069.5' }}>
      {showVideoStream ? (
        <VideoStream
          streamUrl="http://192.168.10.249:8080/stream.mjpg"
          className={className}
          onError={handleStreamError}
        />
      ) : (
        <HeatMap activityData={finalActivityData} className={className} />
      )}
    </div>
  );
};
