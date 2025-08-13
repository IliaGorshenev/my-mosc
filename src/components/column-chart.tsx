import { ReactNode } from 'react';
import {
  Bar,
  BarProps,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type BarChartProps<T = number> = {
  data: Array<{ name: string; [key: string]: string | T }>;
  dataKey: string;
  height?: number;
  marginTop?: number;
  header?: ReactNode;
  rotateLabels?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  styles: {
    bar?: string;
    grid?: string;
    text: string;
  };
  margins?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    xAxisPadding?: { left: number; right: number };
    xAxisTickMargin?: number;
    yAxisTickMargin?: number;
  };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number | string }>;
  label?: string;
};

// Define types for the custom components
interface CustomBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  radius: [number, number, number, number] | [number];
}

interface CustomXAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
  textColor: string;
  angle: number;
  index: number;
  visibleTicksCount: number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #E60528',
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
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 500,
            color: '#E60528',
          }}>
          {isNaN(Number(payload[0].value)) ? 'Нет данных' : payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const truncateText = (text: string, maxLength: number = 18) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const CustomBar = (props: CustomBarProps) => {
  const { x, y, width, height, fill, radius } = props;

  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} rx={radius[0]} ry={radius[0]} />
  );
};

const CustomXAxisTick = (props: CustomXAxisTickProps) => {
  const { x, y, payload, textColor, angle } = props;

  // const shouldShowWithCounting = visibleTicksCount > 10 ? index % Math.ceil(visibleTicksCount / 10) === 0 : true

  const shouldShow = true;

  if (!shouldShow) return null;

  const displayText = truncateText(payload.value);

  return (
    <g transform={`translate(${x},${y + 10})`}>
      <text
        x={5}
        y={0}
        dy={16}
        textAnchor={angle > 0 ? 'start' : angle < 0 ? 'end' : 'middle'}
        fill={textColor}
        fontSize={26}
        transform={`rotate(${angle})`}>
        {displayText}
      </text>
    </g>
  );
};

export const BarChart = ({
  data,
  dataKey,
  height = 440,
  marginTop = 0,
  header,
  rotateLabels = 0,
  xAxisLabel = '',
  yAxisLabel = '',
  styles = {
    bar: '#E60528',
    grid: '#B2B2B2',
    text: '#B2B2B2',
  },
  margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    xAxisPadding: { left: 0, right: 0 },
    xAxisTickMargin: 0,
    yAxisTickMargin: 0,
  },
}: BarChartProps) => {
  return (
    <div style={{ marginTop, position: 'relative' }}>
      {header}
      {xAxisLabel && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            color: styles.text,
            fontSize: '26px',
            fontWeight: 500,
            zIndex: 10,
          }}>
          {xAxisLabel}
        </div>
      )}
      {yAxisLabel && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-80%) rotate(90deg)',
            transformOrigin: 'center right',
            color: styles.text,
            fontSize: '26px',
            fontWeight: 500,
            zIndex: 10,
          }}>
          {yAxisLabel}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          className="no-hover-effect"
          data={data}
          margin={{
            top: margins.top,
            right: margins.right || 0 + (yAxisLabel ? 30 : 0),
            left: margins.left,
            bottom: margins.bottom,
          }}>
          <CartesianGrid
            horizontal={true}
            vertical={false}
            verticalFill={['transparent', 'transparent']}
            stroke={styles.grid}
            strokeDasharray="6 6"
          />
          <XAxis
            dataKey="name"
            tick={(props) => (
              <CustomXAxisTick
                {...props}
                textColor={styles.text}
                angle={rotateLabels}
                visibleTicksCount={data.length}
                size={29}
              />
            )}
            tickMargin={margins.xAxisTickMargin}
            padding={margins.xAxisPadding}
            axisLine={false}
            height={Math.abs(rotateLabels) > 0 ? 120 : 60}
            interval={0}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey={dataKey}
            fill={styles.bar}
            shape={(barProps: BarProps) => (
              <CustomBar {...(barProps as CustomBarProps)} radius={[4, 4, 0, 0]} />
            )}
            isAnimationActive={true}
            label={{
              position: 'top',
              fill: styles.bar,
              fontSize: 50,
              fontWeight: 500,
            }}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
