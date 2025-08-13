import { PieChart } from './pea-chart';

type SexDiagramProps = {
  maleCount: number;
  femaleCount: number;
};

export const SexDiagram = ({ maleCount, femaleCount }: SexDiagramProps) => {
  const total = maleCount + femaleCount;
  const malePercentage = total > 0 ? Math.round((maleCount / total) * 100) : 0;
  const femalePercentage = total > 0 ? Math.round((femaleCount / total) * 100) : 0;

  const chartData = [
    { name: 'Мужчины', value: maleCount, color: '#E60528' },
    { name: 'Женщины', value: femaleCount, color: 'rgba(230, 5, 40, 0.5)' },
  ];

  const HeaderIcon = () => (
    <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4">
        <rect y="0.5" width="5" height="5" rx="2.5" fill="#191919" />
      </g>
    </svg>
  );

  const MaleLine = () => (
    <svg
      width="153"
      height="11"
      viewBox="0 0 153 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect y="0.826172" width="153" height="10" rx="5" fill="#E60528" />
    </svg>
  );

  const FemaleLine = () => (
    <div
      style={{
        width: '153px',
        height: '10px',
        borderRadius: '999px',
        opacity: 0.5,
        background: '#E60528',
      }}
    />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '40px',
        alignSelf: 'stretch',
        height: '100%',
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
          Пол
        </h2>{' '}
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

      {/* Content */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-end',
      
          gap: '40px',
        }}>
        {/* Left - Male */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            flex: '1',
            transform: 'translateY(50px)',
          }}>
          <MaleLine />
          <div
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              opacity: 0.5,
            }}>
            Мужчины
          </div>
          <div
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '63px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '120%',
            }}>
            {malePercentage}
          </div>
        </div>

        {/* Center - Chart */}
        <div style={{ flex: '2', display: 'flex', justifyContent: 'center' }}>
          <PieChart
            data={chartData}
            height={300}
            showLabels={false}
            showLegend={false}
            outerRadius={120}
            colors={['#E60528', 'rgba(230, 5, 40, 0.5)']}
          />
        </div>

        {/* Right - Female */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            flex: '1',
            transform: 'translateY(50px)',
          }}>
          <FemaleLine />
          <div
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              opacity: 0.5,
            }}>
            Женщины
          </div>
          <div
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '63px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '120%',
            }}>
            {femalePercentage}
          </div>
        </div>
      </div>
    </div>
  );
};
