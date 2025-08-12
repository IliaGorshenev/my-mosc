import { BorderBlock } from '@/components/border-block';
import { ClothingGrid } from '@/components/clothing-grid';
import { ContentBlock } from '@/components/content-block';
import { ThreeColumnGrid } from '@/components/footer-grid';
import { Header } from '@/components/header';
import { GridLayout } from '@/layouts/grid';
import { rfidData, rfidItems, rfidRetailData, rfidRetailItems } from './const';
import { liveIcon } from './pose-page';

export const ShelfOccupancyBlock2 = ({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) => {
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
        padding: '40px',
        backgroundColor: '#E60528',
      }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h2
          style={{
            color: '#ffffff',
            fontFamily: 'Inter',
            fontSize: '50px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '120%',
            margin: 0,
          }}>
          {title}
        </h2>

        <span
          style={{
            color: '#191919',
            fontFamily: 'Inter',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            opacity: 0.4,
          }}></span>
      </div>

      {/* Percentage */}
      <div
        style={{
          overflow: 'hidden',
          color: '#ffffff',
          textOverflow: 'ellipsis',
          fontFamily: 'Inter',
          fontSize: '98px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          marginTop: 'auto',
        }}>
        {percentage}
      </div>
    </div>
  );
};
const ClothesPage = () => {
  return (
    <GridLayout
      leftSlot1={
        <Header
          text={
            <>
              {liveIcon}{' '}
              <span>
                RFID{' '}
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
                Контроль наличия товара
              </span>
            </>
          }
        />
      }
      leftSlot2={<ClothingGrid></ClothingGrid>}
      leftSlot3={
        <ThreeColumnGrid
          slot1={
            <BorderBlock className="bg-[#E60528] h-full">
              <ShelfOccupancyBlock2 title="Всего товаров" percentage={90} />
            </BorderBlock>
          }></ThreeColumnGrid>
      }
      rightContentSlot={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '43px' }}>
          <ContentBlock title={rfidData.title} subtitle={rfidData.subtitle} items={rfidItems} />
          <svg
            width="1180"
            height="3"
            viewBox="0 0 1180 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="1180" height="3" rx="1.5" fill="#DBDBDB" />
          </svg>

          <ContentBlock
            title={rfidRetailData.title}
            subtitle={rfidRetailData.subtitle}
            items={rfidRetailItems}
          />
        </div>
      }
      rightImageSlot={<img className="mt-auto" src="/robot-3.png" alt="Moscow" />}></GridLayout>
  );
};

export default ClothesPage;
