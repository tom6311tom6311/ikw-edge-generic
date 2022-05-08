import React from 'react';
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  ReferenceLine,
  YAxis,
  LabelProps,
} from 'recharts';
import { EuiSelect } from '@elastic/eui';
import TimeUtils from '../../utils/TimeUtils';
import { Op } from '../../types';

export type DataPoint = {
  [key: string]: string | number;
};

export type SelectableOption = {
  target: {
    value: string;
  };
};

export const LINE_COLORS = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#FF00FF',
];

export const LABEL_POSITIONS: LabelProps['position'][] = [
  'insideBottomLeft',
  'top',
  'insideBottomRight',
];

export const TIME_SPAN_OPTIONS = [
  {
    text: '過去3小時',
    value: '0',
    span: 10800,
    labelConversion: TimeUtils.timestampToHourAndMin,
    aggregateWindow: '10m',
  },
  {
    text: '過去1天',
    value: '1',
    span: 86400,
    labelConversion: TimeUtils.timestampToHourAndMin,
    aggregateWindow: '1h',
  },
  {
    text: '過去10天',
    value: '2',
    span: 864000,
    labelConversion: TimeUtils.timestampToDate,
    aggregateWindow: '1d',
  },
  {
    text: '過去30天',
    value: '3',
    span: 2592000,
    labelConversion: TimeUtils.timestampToDate,
    aggregateWindow: '1d',
  },
];

type MonitorSectionProps = {
  ops: Op[],
  chartData: DataPoint[],
  averages: number[],
  timeSpan: typeof TIME_SPAN_OPTIONS[0],
  // eslint-disable-next-line no-unused-vars
  onTimeSpanChanged: (timeSpan: typeof TIME_SPAN_OPTIONS[0]) => void,
};

function MonitorSection({
  ops, chartData, averages, timeSpan, onTimeSpanChanged,
}: MonitorSectionProps) {
  return (
    <div className="sitemanage_body_subcontainer">
      <div className="sitemanage_body_item_header">
        <p className="sitemanage_body_title">監測圖表</p>
        <p className="sitemanage_body_option">看更多</p>
      </div>
      <div>
        <div
          className="sitemanage_body_basicitem"
          style={{ width: 'calc(100% - 10px)', height: 'fit-content' }}
        >
          <ResponsiveContainer width="100%" height={380}>
            <LineChart
              style={{ position: 'inherit' }}
              margin={{
                top: 30,
                right: 50,
                left: 30,
                bottom: 10,
              }}
              data={chartData}
            >
              <XAxis dataKey="readableTime" />
              <Tooltip />
              {ops.map(({ name: opName }, idx) => (
                <YAxis
                  key={`${opName}-y-axis`}
                  yAxisId={`${opName}-y-axis`}
                  label={{
                    position: 'top',
                    value: opName,
                    fill: LINE_COLORS[idx % LINE_COLORS.length],
                    fontSize: 10,
                  }}
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  allowDecimals={false}
                  width={30}
                  tickSize={3}
                  stroke={LINE_COLORS[idx % LINE_COLORS.length]}
                  tick={{ fontSize: 10 }}
                />
              ))}
              {ops.map(({ name: opName, unit }, idx) => (
                <Line
                  key={`${opName}-line`}
                  name={opName}
                  type="monotone"
                  yAxisId={`${opName}-y-axis`}
                  dataKey={opName}
                  stroke={LINE_COLORS[idx % LINE_COLORS.length]}
                  unit={` ${unit}` || ''}
                />
              ))}
              {ops.map(({ name: opName, unit }, idx) => (
                <ReferenceLine
                  key={`${opName}-avg`}
                  y={averages[idx]}
                  yAxisId={`${opName}-y-axis`}
                  label={{
                    position: LABEL_POSITIONS[idx % LABEL_POSITIONS.length],
                    value: `${opName}平均: ${averages[idx]} ${unit}`,
                    fill: LINE_COLORS[idx % LINE_COLORS.length],
                    fontSize: 10,
                  }}
                  stroke={LINE_COLORS[idx % LINE_COLORS.length]}
                  strokeDasharray="3 3"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div className="sitemanage_chartbottom_container">
            {/* <div className="sitemanage_chart_dataselector_container">
              <EuiSelect
                className="sitemanage_euiselect"
                id="dataSelector"
                options={displaydataOptions}
                value={displayData}
                onChange={(e) => onQueryDataChange(e)}
                aria-label="Use aria labels when no actual label is in use"
              />
            </div> */}
            <div className="sitemanage_chart_timeselector_container">
              <EuiSelect
                className="sitemanage_euiselect"
                id="timeSelector"
                options={TIME_SPAN_OPTIONS.map(({ text, value }) => ({
                  text,
                  value,
                }))}
                value={timeSpan.value}
                onChange={(e) => onTimeSpanChanged(TIME_SPAN_OPTIONS[parseInt(e.target.value, 10)])}
                aria-label="Use aria labels when no actual label is in use"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonitorSection;
