import React, { useState } from "react";
import { fetchAnalytics } from "../services/api";
import { Cpu, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react";

interface AIInsightsProps {
  credentials: {
    apiKey: string;
    secretKey: string;
    passphrase: string;
  };
}

interface Insight {
  type: "positive" | "warning" | "neutral";
  title: string;
  body: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({ credentials }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const analytics = await fetchAnalytics(credentials);

      const response = await fetch(
        "https://excellen-production.up.railway.app/api/insights/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": credentials.apiKey,
            "x-secret-key": credentials.secretKey,
            "x-passphrase": credentials.passphrase,
          },
          body: JSON.stringify({ analytics }),
        },
      );

      const data = await response.json();
      if (data.code === "00000") {
        setSummary(data.data.summary);
        setInsights(data.data.insights);
        setGenerated(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    positive: <TrendingUp size={16} className="text-positive" />,
    warning: <AlertTriangle size={16} className="text-negative" />,
    neutral: <Cpu size={16} className="text-accent" />,
  };

  const borderMap = {
    positive: "border-positive/20",
    warning: "border-negative/20",
    neutral: "border-accent/20",
  };

  const bgMap = {
    positive: "bg-positive/5",
    warning: "bg-negative/5",
    neutral: "bg-accent/5",
  };

  return (
    <div className="p-4 md:p-6 space-y-6 min-w-0 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Insights</h1>
          <p className="text-muted text-sm mt-1">
            Claude-powered analysis of your execution performance
          </p>
        </div>
        <button
          onClick={generateInsights}
          disabled={loading}
          className="flex items-center gap-2 bg-accent hover:bg-amber-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          {loading ?
            "Analyzing..."
          : generated ?
            "Regenerate"
          : "Generate Insights"}
        </button>
      </div>

      {/* Empty state */}
      {!generated && !loading && (
        <div className="bg-surface border border-border rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <Cpu size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              No insights yet
            </h3>
            <p className="text-muted text-sm mt-1 max-w-sm">
              Click "Generate Insights" to get a Claude-powered breakdown of
              your trading performance and execution quality.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-lg px-3 py-2 mt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Powered by
            </span>
            <span className="text-xs font-semibold text-white">
              Anthropic · Claude
            </span>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="bg-surface border border-border rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
            <Cpu size={24} className="text-accent" />
          </div>
          <p className="text-muted text-sm">Analyzing your trading data...</p>
        </div>
      )}

      {/* Results */}
      {generated && !loading && (
        <>
          <div className="flex items-center gap-2">
            <span className="bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              Anthropic · Claude Sonnet
            </span>
          </div>

          {/* Summary */}
          <div className="bg-surface border border-accent/20 rounded-xl p-5">
            <p className="text-muted text-xs uppercase tracking-wider mb-2 font-medium">
              Overall Assessment
            </p>
            <p className="text-white text-sm leading-relaxed">{summary}</p>
          </div>

          {/* Insight Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className={`border rounded-xl p-5 space-y-2 ${borderMap[insight.type]} ${bgMap[insight.type]}`}
              >
                <div className="flex items-center gap-2">
                  {iconMap[insight.type]}
                  <span className="text-white font-semibold text-sm">
                    {insight.title}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {insight.body}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AIInsights;
