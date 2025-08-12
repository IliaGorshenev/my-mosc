import { BorderBlock } from '@/components/border-block';
import { ContentBlock } from '@/components/content-block';
import { ThreeColumnGrid } from '@/components/footer-grid';
import { Header } from '@/components/header';
import { GridLayout } from '@/layouts/grid';
import {
  retailApplicationData,
  retailApplicationItems,
  shelfMonitoringData,
  shelfMonitoringItems,
} from './const';
import { liveIcon } from './pose-page';

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
        padding: '40px'
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
        <img
          src="/shop.png"
          alt="Shop"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      }
      leftSlot3={
        <ThreeColumnGrid
          slot1={
            <BorderBlock className="h-full">
              <ShelfOccupancyBlock title="Заполненность полки 1" percentage={90} />
            </BorderBlock>
          }
          slot2={
            <BorderBlock className="h-full">
              <ShelfOccupancyBlock title="Заполненность полки 2" percentage={75} />
            </BorderBlock>
          }
          slot3={
            <BorderBlock className="h-full">
              <ShelfOccupancyBlock title="Заполненность полки 3" percentage={82} />
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
      rightImageSlot={<img className='mt-auto'  src="/robot-2.png" alt="Moscow" />}></GridLayout>
  );
};

export default ShopPage;
