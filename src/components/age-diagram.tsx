import { BarChart } from './column-chart';

type AgeDiagramProps = {
  ageData?: Array<{ name: string; value: number }>;
};

const defaultAgeData = [
  { name: '0-9', value: 2 },
  { name: '10-19', value: 8 },
  { name: '20-29', value: 46 },
  { name: '30-39', value: 38 },
  { name: '40-49', value: 19 },
  { name: '50-59', value: 3 },
];

export const AgeDiagram = ({ ageData = defaultAgeData }: AgeDiagramProps) => {
  // const total = ageData.reduce((sum, item) => sum + item.value, 0);
  // const maxValue = Math.max(...ageData.map((item) => item.value));
  // const maxPercentage = total > 0 ? Math.round((maxValue / total) * 100) : 0;

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
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '40px',
        flex: '1 0 0',
        alignSelf: 'stretch',
      }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'auto' }}>
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
          Возраст
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
          чел.
        </span>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', position: 'absolute', bottom: '0', marginTop: 'auto' }}>
        <BarChart
          data={ageData}
          dataKey="value"
          height={293}
          styles={{
            bar: '#E60528',
            grid: 'transparent',
            text: '#B2B2B2',
          }}
        />
      </div>

      {/* Statistics */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}></div>
    </div>
  );
};
