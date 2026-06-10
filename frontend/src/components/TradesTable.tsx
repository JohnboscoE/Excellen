import React from "react";
import type { Trade } from "../types";

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable: React.FC<TradesTableProps> = ({ trades }) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
        Recent Trades
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Symbol", "Side", "Price", "Size", "Fee", "Date"].map((h) => (
                <th
                  key={h}
                  className="text-left text-muted py-2 pr-4 font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.tradeId}
                className="border-b border-border hover:bg-surface2 transition-colors"
              >
                <td className="py-3 pr-4 font-medium text-accent">
                  {trade.symbol}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.side === "buy" ?
                        "bg-positive/10 text-positive"
                      : "bg-negative/10 text-negative"
                    }`}
                  >
                    {trade.side.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-300">
                  ${parseFloat(trade.price).toLocaleString()}
                </td>
                <td className="py-3 pr-4 text-gray-300">{trade.size}</td>
                <td className="py-3 pr-4 text-muted">${trade.fee}</td>
                <td className="py-3 pr-4 text-muted">
                  {new Date(parseInt(trade.cTime)).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesTable;
