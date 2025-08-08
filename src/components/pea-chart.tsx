import { ReactNode } from 'react';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';

type PieChartData = {
  name: string;
  value: number;
  color?: string;
};

type PieChartProps = {
  data: PieChartData[];
  dataKey?: string;
  height?: number;
  marginTop?: number;
  header?: ReactNode;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  startAngle?: number;
  endAngle?: number;
  colors?: string[];
  showLabels?: boolean;
  showLegend?: boolean;
  cornerRadius?: number;
  styles?: {
    text: string;
  };
  margins?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: PieChartData;
  }>;
  label?: string;
};

const PRIORITY_COLORS = {
  low: '#016FEE',
  middle: '#1AC964',
  high: '#F5A525',
  ultraHigh: '#F31260',
};

const DEFAULT_COLORS = [
  PRIORITY_COLORS.low,
  PRIORITY_COLORS.middle,
  PRIORITY_COLORS.high,
  PRIORITY_COLORS.ultraHigh,
];
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          border: `1px solid ${data.payload.color || '#0987EE'}`,
          borderRadius: '4px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#666',
          }}>
          {data.name}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 500,
            color: data.payload.color || '#0987EE',
          }}>
          {data.value}
        </p>
      </div>
    );
  }

  return null;
};

export const PieChart = ({
  data,
  dataKey = 'value',
  height = 400,
  marginTop = 0,
  header,
  innerRadius = 60,
  outerRadius = 110,
  paddingAngle = 10,
  startAngle = 360,
  endAngle = 0,
  colors = DEFAULT_COLORS,
  showLabels = true,
  showLegend = true,
  cornerRadius = 8,
  margins = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 40,
  },
}: PieChartProps) => {
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: item.color || colors[index % colors.length],
  }));

  const legendBackgroundColors = {
    [PRIORITY_COLORS.low]: '#006FEE33',
    [PRIORITY_COLORS.middle]: '#17C96433',
    [PRIORITY_COLORS.high]: '#F5A52433',
    [PRIORITY_COLORS.ultraHigh]: '#F3126033',
  };

  const legendTextColors = {
    [PRIORITY_COLORS.low]: '#005FCB',
    [PRIORITY_COLORS.middle]: '#007B35',
    [PRIORITY_COLORS.high]: '#9A5F00',
    [PRIORITY_COLORS.ultraHigh]: '#C10043',
  };

  return (
    <div style={{ marginTop, position: 'relative', width: '100%' }}>
      {header}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: showLegend ? '1 1 80%' : '1 1 100%' }}>
          <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart
              margin={{
                top: margins.top,
                right: margins.right,
                left: margins.left,
                bottom: margins.bottom,
              }}>
              <Pie
                isAnimationActive={true}
                data={dataWithColors}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                cornerRadius={cornerRadius}
                outerRadius={outerRadius}
                paddingAngle={paddingAngle}
                startAngle={startAngle}
                endAngle={endAngle}
                dataKey={dataKey}
                style={{ outline: 'none' }}
                label={
                  showLabels
                    ? ({ cx, cy, midAngle, outerRadius, percent }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius * 1.2;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const textAnchor = x > cx ? 'start' : 'end';

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#999999"
                            textAnchor={textAnchor}
                            dominantBaseline="central"
                            fontFamily="Inter, sans-serif"
                            fontSize={13}
                            fontWeight={400}
                            letterSpacing="0"
                            style={{ lineHeight: '18px' }}>
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }
                    : undefined
                }
                labelLine={false}>
                {dataWithColors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {showLegend && (
          <div style={{ flex: '1 1 30%', paddingLeft: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, justifyItems: 'flex-start' }}>
              {dataWithColors.map((item, index) => {
                let priorityLevel = 'Unknown';
                if (item.color === PRIORITY_COLORS.low) priorityLevel = 'Низкий';
                else if (item.color === PRIORITY_COLORS.middle) priorityLevel = 'Средний';
                else if (item.color === PRIORITY_COLORS.high) priorityLevel = 'Высокий';
                else if (item.color === PRIORITY_COLORS.ultraHigh) priorityLevel = 'Критический';

                const backgroundColor = legendBackgroundColors[item.color] || `${item.color}20`;
                const textColor = legendTextColors[item.color] || item.color;

                return (
                  <li
                    key={`legend-${index}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                      fontSize: '14px',
                      backgroundColor: backgroundColor,
                      padding: '4px 8px',
                      borderRadius: '8px',
                      outline: 'none',
                      cursor: 'default',
                    }}>
                    <span style={{ color: textColor }}>
                      {priorityLevel} - {item.value} заявок
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
