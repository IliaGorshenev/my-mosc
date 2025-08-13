import { BorderBlock } from '@/components/border-block';
import { ContentBlock } from '@/components/content-block';
import { ThreeColumnGrid } from '@/components/footer-grid';
import { Header } from '@/components/header';
import { VideoStream } from '@/components/video-stream';
import { GridLayout } from '@/layouts/grid';
import { useEffect, useState } from 'react';
import {
  retailApplicationData,
  retailApplicationItems,
  shelfMonitoringData,
  shelfMonitoringItems,
} from './const';
import { liveIcon } from './pose-page';

// Define the type for shelf data
interface ShelfData {
  shelf_id: number;
  filling_percent: number;
}

export const ShelfOccupancyBlock = ({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) => {
  const HeaderIcon = () => (
    <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4">
        <rect y="0.5" width="5" height="5" rx="2.5" fill="#191919" />
      </g>
    </svg>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '40px',
        height: '100%',
        width: '100%',
        padding: '0 40px',
      }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h2
          style={{
            color: '#191919',
            fontFamily: 'Inter',
            fontSize: '50px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '120%',
            margin: 0,
          }}>
          {title}
        </h2>
        <HeaderIcon />
        <span
          style={{
            color: '#191919',
            fontFamily: 'Inter',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            opacity: 0.4,
          }}>
          %
        </span>
      </div>

      {/* Percentage */}
      <div
        style={{
          overflow: 'hidden',
          color: '#E60528',
          textOverflow: 'ellipsis',
          fontFamily: 'Inter',
          fontSize: '98px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          marginTop: 'auto',
        }}>
        {percentage}%
      </div>
    </div>
  );
};

const ShopPage = () => {
  const [shelfData, setShelfData] = useState<ShelfData[]>([
    { shelf_id: 1, filling_percent: 100 },
    { shelf_id: 2, filling_percent: 100 },
    { shelf_id: 3, filling_percent: 100 },
  ]);

  // @ts-ignore
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [error, setError] = useState<string | null>(null);
  const [streamError, setStreamError] = useState(false);

  useEffect(() => {
    const fetchShelfData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.10.249:8084/shelfes');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ShelfData[] = await response.json();
        setShelfData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching shelf data:', err);
        setError('Failed to load shelf data');
        // Keep the default data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchShelfData();

    // Set up polling to refresh data periodically
    const intervalId = setInterval(fetchShelfData, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const handleStreamError = () => {
    setStreamError(true);
  };

  return (
    <GridLayout
      leftSlot1={
        <Header
          text={
            <>
              {liveIcon}{' '}
              <span>
                Live-трансляция{' '}
                <span
                  style={{
                    color: '#E60528',
                    fontFamily: 'Inter',
                    fontSize: '72px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '120%',
                  }}>
                  |
                </span>{' '}
                Заполненность полок
              </span>
            </>
          }
        />
      }
      leftSlot2={
        streamError ? (
          <img
            src="/shop.png"
            alt="Shop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%' }}>
            <VideoStream
              streamUrl="http://192.168.10.249:8083/stream.mjpg"
              onError={handleStreamError}
              className="w-full h-full object-cover"
            />
          </div>
        )
      }
      leftSlot3={
        <ThreeColumnGrid
          slot1={
            <BorderBlock className="h-full">
              <ShelfOccupancyBlock
                title="Заполненность полки 1"
                percentage={shelfData[0]?.filling_percent || 0}
              />
            </BorderBlock>
          }
          slot2={
            <BorderBlock className="h-full">
              <ShelfOccupancyBlock
                title="Заполненность полки 2"
                percentage={shelfData[1]?.filling_percent || 0}
              />
            </BorderBlock>
          }
          slot3={
            <BorderBlock className="h-full">
              <ShelfOccupancyBlock
                title="Заполненность полки 3"
                percentage={shelfData[2]?.filling_percent || 0}
              />
            </BorderBlock>
          }></ThreeColumnGrid>
      }
      rightContentSlot={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '43px' }}>
          <ContentBlock
            title={shelfMonitoringData.title}
            subtitle={shelfMonitoringData.subtitle}
            items={shelfMonitoringItems}
          />
          <svg
            width="1180"
            height="3"
            viewBox="0 0 1180 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="1180" height="3" rx="1.5" fill="#DBDBDB" />
          </svg>

          <ContentBlock
            title={retailApplicationData.title}
            subtitle={retailApplicationData.subtitle}
            items={retailApplicationItems}
          />
        </div>
      }
      rightImageSlot={<img className="mt-auto" src="/robot-2.png" alt="Moscow" />}></GridLayout>
  );
};

export default ShopPage;
