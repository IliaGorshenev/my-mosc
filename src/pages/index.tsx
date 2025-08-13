import { AgeDiagram } from '@/components/age-diagram';
import { BorderBlock } from '@/components/border-block';
import { ContentBlock } from '@/components/content-block';
import { VisitorsDiagram } from '@/components/customers-block';
import { ThreeColumnGrid } from '@/components/footer-grid';
import { Header } from '@/components/header';
import { HeatMapContainer } from '@/components/heat-map-container';
import { SexDiagram } from '@/components/sex-diagram';
import { GridLayout } from '@/layouts/grid';
import { useEffect, useMemo, useState } from 'react';
import { contentBlockData, contentBlockData2, sampleItems, sampleItems2 } from './const';

interface DemographicsData {
  gender: {
    male: number;
    female: number;
  };
  total: number;
  hourly: number;
  age: Array<{
    name: string;
    value: number;
  }>;
}

export default function IndexPage() {
  const [demographics, setDemographics] = useState<DemographicsData>({
    gender: {
      male: 1250,
      female: 980,
    },
    total: 196,
    hourly: 48,
    age: [
      { name: '0-9', value: 2 },
      { name: '10-19', value: 8 },
      { name: '20-29', value: 46 },
      { name: '30-39', value: 38 },
      { name: '40-49', value: 19 },
      { name: '50-59', value: 3 },
    ],
  });
  // @ts-ignore
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/stats');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error('API returned unsuccessful response');
        }

        setDemographics(result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching demographics data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        // Keep using default values in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchDemographics();

    // Optional: Set up polling for real-time updates
    const interval = setInterval(fetchDemographics, 10000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const memoizedAgeData = useMemo(
    () => demographics.age,
    [
      // Convert the array to a string for comparison
      JSON.stringify(demographics.age),
    ],
  );

  return (
    <GridLayout
      leftSlot1={<Header />}
      leftSlot2={
        <BorderBlock>
          <HeatMapContainer useRealData={true}></HeatMapContainer>
        </BorderBlock>
      }
      leftSlot3={
        <ThreeColumnGrid
          slot1={
            <BorderBlock className="h-full px-14">
              (
              <SexDiagram
                maleCount={demographics.gender.male}
                femaleCount={demographics.gender.female}
              />
              )
            </BorderBlock>
          }
          slot2={
            <BorderBlock className="h-full pb-0 px-14">
              <AgeDiagram ageData={memoizedAgeData} />
            </BorderBlock>
          }
          slot3={
            <BorderBlock className="h-full px-14">
              <VisitorsDiagram totalCount={demographics.total} hourlyCount={demographics.hourly} />
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

          <ContentBlock title={contentBlockData2.subtitle} items={sampleItems2} />
        </div>
      }
      rightImageSlot={<img className="mt-auto" src="/robot-1.png" alt="Moscow" />}></GridLayout>
  );
}
