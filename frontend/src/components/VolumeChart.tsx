import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface VolumeChartProps {
  data: { symbol: string; volume: number }[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
        Volume By Symbol
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
          <XAxis
            dataKey="symbol"
            tick={{ fill: "#6B7280", fontSize: 11 }}
            axisLine={{ stroke: "#2A2A2A" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6B7280", fontSize: 11 }}
            axisLine={{ stroke: "#2A2A2A" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #2A2A2A",
              borderRadius: "8px",
              color: "#F5F5F5",
            }}
          />
          <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? "#F59E0B" : "#92400E"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
