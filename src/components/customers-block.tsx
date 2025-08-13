type VisitorsDiagramProps = {
  totalCount: number;
  hourlyCount: number;
};

export const VisitorsDiagram = ({ totalCount, hourlyCount }: VisitorsDiagramProps) => {
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
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '40px',
        height: '100%'
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
          Посетители
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

      {/* Statistics Row */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          gap: '40px',
          marginTop: 'auto',
        }}>
        {/* Total Count */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            flex: '1',
          }}>
          <div
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              opacity: 0.4,
            }}>
            Всего
          </div>
          <div
            style={{
              color: '#E60528',
              fontFamily: 'Inter',
              fontSize: '98px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '120%',
            }}>
            {totalCount}
          </div>
        </div>

        {/* Hourly Count */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            flex: '1',
          }}>
          <div
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              opacity: 0.4,
            }}>
            За час
          </div>
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
              opacity: 0.5,
            }}>
            +{hourlyCount}
          </div>
        </div>
      </div>
    </div>
  );
};
