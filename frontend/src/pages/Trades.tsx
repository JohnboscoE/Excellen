import React, { useEffect, useState } from "react";
import { fetchSpotTrades, fetchFuturesTrades } from "../services/api";
import type { Trade } from "../types";
import { Search } from "lucide-react";

interface TradesProps {
  credentials: {
    apiKey: string;
    secretKey: string;
    passphrase: string;
  };
}

const Trades: React.FC<TradesProps> = ({ credentials }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filtered, setFiltered] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<"all" | "buy" | "sell">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "spot" | "futures">(
    "all",
  );

  useEffect(() => {
    const load = async () => {
      try {
        const [spot, futures] = await Promise.all([
          fetchSpotTrades(credentials),
          fetchFuturesTrades(credentials),
        ]);
        const spotTagged = spot.map((t: Trade) => ({
          ...t,
          tradeType: "spot",
        }));
        const futuresTagged = futures.map((t: Trade) => ({
          ...t,
          tradeType: "futures",
        }));
        const all = [...spotTagged, ...futuresTagged].sort(
          (a, b) => parseInt(b.cTime) - parseInt(a.cTime),
        );
        setTrades(all);
        setFiltered(all);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    let result = trades;
    if (search) {
      result = result.filter((t) =>
        t.symbol.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (sideFilter !== "all") {
      result = result.filter((t) => t.side === sideFilter);
    }
    if (typeFilter !== "all") {
      result = result.filter((t) => (t as any).tradeType === typeFilter);
    }
    setFiltered(result);
  }, [search, sideFilter, typeFilter, trades]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-accent text-lg animate-pulse">
          Loading trades...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Trades</h1>
        <p className="text-muted text-sm mt-1">
          {filtered.length} of {trades.length} trades
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pl-8 pr-4 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Side Filter */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
          {(["all", "buy", "sell"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSideFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                sideFilter === s ?
                  "bg-accent text-black"
                : "text-muted hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
          {(["all", "spot", "futures"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                typeFilter === t ?
                  "bg-accent text-black"
                : "text-muted hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface2">
                {[
                  "Symbol",
                  "Type",
                  "Side",
                  "Price",
                  "Size",
                  "Value",
                  "Fee",
                  "PnL",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-muted py-3 px-4 font-medium text-xs uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ?
                <tr>
                  <td colSpan={9} className="text-center text-muted py-12">
                    No trades match your filters
                  </td>
                </tr>
              : filtered.map((trade: any) => {
                  const value =
                    parseFloat(trade.price) * parseFloat(trade.size);
                  const pnl = trade.profit ? parseFloat(trade.profit) : null;
                  return (
                    <tr
                      key={trade.tradeId}
                      className="border-b border-border hover:bg-surface2 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-accent">
                        {trade.symbol}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-surface2 text-muted border border-border capitalize">
                          {trade.tradeType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
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
                      <td className="py-3 px-4 text-gray-300">
                        ${parseFloat(trade.price).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{trade.size}</td>
                      <td className="py-3 px-4 text-gray-300">
                        $
                        {value.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-3 px-4 text-muted">${trade.fee}</td>
                      <td className="py-3 px-4">
                        {pnl !== null ?
                          <span
                            className={
                              pnl >= 0 ? "text-positive" : "text-negative"
                            }
                          >
                            {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
                          </span>
                        : <span className="text-muted">—</span>}
                      </td>
                      <td className="py-3 px-4 text-muted">
                        {new Date(parseInt(trade.cTime)).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trades;
