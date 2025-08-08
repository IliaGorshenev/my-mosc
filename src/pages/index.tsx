import { AgeDiagram } from '@/components/age-diagram';
import { BorderBlock } from '@/components/border-block';
import { ContentBlock } from '@/components/content-block';
import { VisitorsDiagram } from '@/components/customers-block';
import { ThreeColumnGrid } from '@/components/footer-grid';
import { Header } from '@/components/header';
import { HeatMapContainer } from '@/components/heat-map-container';
import { SexDiagram } from '@/components/sex-diagram';
import { GridLayout } from '@/layouts/grid';
import { contentBlockData, sampleItems } from './const';

export default function IndexPage() {
  return (
    <GridLayout
      leftSlot1={<Header />}
      leftSlot2={
        <BorderBlock>
          <HeatMapContainer></HeatMapContainer>
        </BorderBlock>
      }
      leftSlot3={
        <ThreeColumnGrid
          slot1={
            <BorderBlock className="h-full">
              <SexDiagram maleCount={1250} femaleCount={980} />
            </BorderBlock>
          }
          slot2={
            <BorderBlock className="h-full">
              <AgeDiagram
                ageData={[
                  { name: '0-9', value: 2 },
                  { name: '10-19', value: 8 },
                  { name: '20-29', value: 46 },
                  { name: '30-39', value: 38 },
                  { name: '40-49', value: 19 },
                  { name: '50-59', value: 3 },
                ]}
              />
            </BorderBlock>
          }
          slot3={
            <BorderBlock className="h-full">
              <VisitorsDiagram totalCount={196} hourlyCount={48} />
            </BorderBlock>
          }></ThreeColumnGrid>
      }
      rightContentSlot={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '43px' }}>
          <ContentBlock
            title={contentBlockData.title}
            subtitle={contentBlockData.subtitle}
            items={sampleItems}
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
            title={contentBlockData.title}
            subtitle={contentBlockData.subtitle}
            items={sampleItems}
          />
        </div>
      }
      rightImageSlot={<img src="/robot-1.png" alt="Moscow" />}></GridLayout>
  );
}
