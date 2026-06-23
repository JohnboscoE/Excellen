import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import type { Analytics as AnalyticsType, SymbolMetrics } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

interface AnalyticsProps {
  credentials: {
    apiKey: string;
    secretKey: string;
    passphrase: string;
  };
}

const Analytics: React.FC<AnalyticsProps> = ({ credentials }) => {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAnalytics(credentials);
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-accent text-lg animate-pulse">
          Loading analytics...
        </div>
      </div>
    );
  }

  const pnlBySymbol =
    analytics?.symbolMetrics.map((m) => ({
      symbol: m.symbol,
      pnl: parseFloat(m.pnl.toFixed(2)),
      fees: parseFloat(m.totalFees.toFixed(2)),
      winRate: parseFloat(m.winRate.toFixed(2)),
    })) || [];

  const tradesByDay = analytics?.tradesByDay || [];

  return (
    <div className="p-4 md:p-6 space-y-6 min-w-0 overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-muted text-sm mt-1">
          Deep dive into your execution performance by asset
        </p>
      </div>

      {/* Symbol Metrics Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider">
            Performance By Asset
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface2">
                {["Symbol", "Trades", "Volume", "Fees", "PnL", "Win Rate"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-muted py-3 px-4 font-medium text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {analytics?.symbolMetrics.map((m: SymbolMetrics) => (
                <tr
                  key={m.symbol}
                  className="border-b border-border hover:bg-surface2 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-accent">
                    {m.symbol}
                  </td>
                  <td className="py-3 px-4 text-gray-300">{m.totalTrades}</td>
                  <td className="py-3 px-4 text-gray-300">
                    $
                    {m.totalVolume.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-4 text-muted">
                    ${m.totalFees.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={m.pnl >= 0 ? "text-positive" : "text-negative"}
                    >
                      {m.pnl >= 0 ? "+" : ""}${m.pnl.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-surface2 rounded-full h-1.5 max-w-20">
                        <div
                          className="h-1.5 rounded-full bg-accent"
                          style={{ width: `${Math.min(m.winRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-gray-300 text-xs">
                        {m.winRate.toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* PnL by Symbol */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            PnL By Symbol
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pnlBySymbol}>
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
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                {pnlBySymbol.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.pnl >= 0 ? "#22C55E" : "#EF4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Win Rate by Symbol */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            Win Rate By Symbol
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pnlBySymbol}>
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
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "8px",
                  color: "#F5F5F5",
                }}
                formatter={(value: any) => [`${value}%`, "Win Rate"]}
              />
              <Bar dataKey="winRate" radius={[4, 4, 0, 0]}>
                {pnlBySymbol.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.winRate >= 50 ? "#F59E0B" : "#92400E"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fees vs PnL */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            Fees vs PnL By Symbol
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pnlBySymbol}>
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
              <Legend wrapperStyle={{ color: "#6B7280", fontSize: 12 }} />
              <Bar
                dataKey="pnl"
                name="PnL"
                fill="#22C55E"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="fees"
                name="Fees"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trades By Day */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            Trades By Day
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tradesByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis
                dataKey="date"
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
              <Line
                type="monotone"
                dataKey="count"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: "#F59E0B", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
