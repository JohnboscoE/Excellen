import React, { useEffect, useState } from "react";
import {
  fetchAnalytics,
  fetchAccountInfo,
  fetchSpotTrades,
} from "../services/api";
import type { Analytics, AccountInfo, Trade } from "../types";
import StatCard from "../components/StatCard";
import PnLChart from "../components/PnlChart";
import VolumeChart from "../components/VolumeChart";
import TradesTable from "../components/TradesTable";
import {
  TrendingUp,
  DollarSign,
  Activity,
  Award,
  AlertTriangle,
} from "lucide-react";

interface DashboardProps {
  credentials: {
    apiKey: string;
    secretKey: string;
    passphrase: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ credentials }) => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [a, acc, t] = await Promise.all([
          fetchAnalytics(credentials),
          fetchAccountInfo(credentials),
          fetchSpotTrades(credentials),
        ]);
        setAnalytics(a);
        setAccount(acc);
        setTrades(t);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [credentials]);

  return (
    <div className="p-4 md:p-6 space-y-6 min-w-0 overflow-x-hidden">
      {loading ?
        <p className="text-muted text-sm">Loading dashboard…</p>
      : <>
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-muted text-sm mt-1">
              Execution performance overview — User #{account?.userId}
            </p>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Total PnL"
              value={`$${analytics?.totalPnl.toLocaleString()}`}
              subtitle="All time"
              positive={Number(analytics?.totalPnl) >= 0}
              icon={<TrendingUp size={16} />}
            />
            <StatCard
              title="Win Rate"
              value={`${analytics?.winRate}%`}
              subtitle="Across all trades"
              positive={Number(analytics?.winRate) >= 50}
              negative={Number(analytics?.winRate) < 50}
              icon={<Award size={16} />}
            />
            <StatCard
              title="Total Volume"
              value={`$${analytics?.totalVolume.toLocaleString()}`}
              subtitle="Spot trades"
              icon={<Activity size={16} />}
            />
            <StatCard
              title="Total Fees"
              value={`$${analytics?.totalFees.toLocaleString()}`}
              subtitle="Fees paid"
              negative
              icon={<DollarSign size={16} />}
            />
            <StatCard
              title="Total Trades"
              value={analytics?.totalTrades || 0}
              subtitle="Executed orders"
              icon={<Activity size={16} />}
            />
            <StatCard
              title="Avg Trade Size"
              value={`$${analytics?.avgTradeSize.toLocaleString()}`}
              subtitle="Per order"
              icon={<DollarSign size={16} />}
            />
            <StatCard
              title="Best Asset"
              value={analytics?.bestAsset || "N/A"}
              subtitle="Highest PnL"
              positive
              icon={<TrendingUp size={16} />}
            />
            <StatCard
              title="Worst Asset"
              value={analytics?.worstAsset || "N/A"}
              subtitle="Lowest PnL"
              negative
              icon={<AlertTriangle size={16} />}
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <PnLChart data={analytics?.pnlOverTime || []} />
            <VolumeChart data={analytics?.volumeBySymbol || []} />
          </div>
          <TradesTable trades={trades.slice(0, 8)} />
        </>
      }
    </div>
  );
};

export default Dashboard;
