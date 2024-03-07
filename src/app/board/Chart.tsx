"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface Props {
  data: any[];
}

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const Chart = ({ data }: Props) => {
  return (
    data && (
      <div className="w-[1200px] flex-1">
        <ResponsiveContainer>
          <ScatterChart data={data}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  const data = payload[0].payload;
                  const { scoreDisplay, percentage } = data;
                  return (
                    <div className="rounded border bg-background shadow-sm text-sm">
                      <div className="flex flex-col px-4 py-2 gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-muted-foreground">
                            Score
                          </span>
                          <span className="">{scoreDisplay}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-muted-foreground">
                            Top
                          </span>
                          <span className="">{percentage} %</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <XAxis type="number" dataKey="time" name="time" />
            <YAxis type="number" dataKey="count" name="head count" />
            <CartesianGrid strokeDasharray="3 3" />
            <Scatter />
            <ReferenceLine x={107500} stroke="green" label="Timeout" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    )
  );
};

export default Chart;
