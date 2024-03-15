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
      <div className="w-[1200px] h-[800px] not-prose">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={data}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  const data = payload[0].payload;
                  const { scoreDisplay, breakdown, partPercentage } = data;
                  return (
                    <div className="rounded border bg-background shadow-sm text-sm">
                      <Top scoreDisplay={scoreDisplay} top={partPercentage} />
                      <hr />
                      <Breakdown breakdown={breakdown} />
                    </div>
                  );
                }
                return null;
              }}
            />
            <XAxis type="number" dataKey="rank" name="rank" />
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

const Top = ({ scoreDisplay, top }: { scoreDisplay: string; top: number }) => {
  return (
    <div className="flex flex-col px-4 py-2 gap-1">
      <div className="flex items-center gap-2">
        <span className="font-bold text-muted-foreground">Score</span>
        <span className="">{scoreDisplay}</span>
      </div>
      <div className="flex gap-2">
        <span className="font-bold text-muted-foreground">Top</span>
        <span className="">{top.toFixed(1)}%</span>
      </div>
    </div>
  );
};

const Breakdown = ({ breakdown }: { breakdown: string }) => {
  const withoutTiebreak = breakdown.split("Tiebreak")[0];
  return (
    <div className="flex flex-col px-4 py-2">
      <h3 className="font-bold text-muted-foreground mb-1">Completed</h3>
      {withoutTiebreak.split("\n").map((line: string, index: number) => (
        <span key={`${line}+${index}`}>{line}</span>
      ))}
    </div>
  );
};

export default Chart;
