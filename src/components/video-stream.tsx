import React, { useRef, useEffect } from 'react';

interface VideoStreamProps {
  streamUrl: string;
  className?: string;
  onError?: () => void;
}

export const VideoStream: React.FC<VideoStreamProps> = ({ 
  streamUrl, 
  className = '',
  onError 
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Set error handler
    const handleError = () => {
      console.error('Error loading video stream');
      if (onError) onError();
    };
    
    img.onerror = handleError;

    // Force refresh the image source periodically to handle stream disconnections
    const refreshInterval = setInterval(() => {
      if (img) {
        const currentSrc = img.src;
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // blank image
        setTimeout(() => {
          if (img) img.src = currentSrc;
        }, 100);
      }
    }, 30000); // Refresh every 30 seconds

    return () => {
      clearInterval(refreshInterval);
      if (img) img.onerror = null;
    };
  }, [onError]);

  return (
    <div className={`video-stream-container ${className}`} style={{ width: '100%', aspectRatio: '1863/1069.5' }}>
      <img 
        ref={imgRef}
        src={streamUrl} 
        alt="Live Stream"
        className="w-full h-full object-cover"
        style={{ aspectRatio: '1863/1069.5' }}
      />
    </div>
  );
};
