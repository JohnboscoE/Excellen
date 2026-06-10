export interface Trade {
  tradeId: string;
  symbol: string;
  side: 'buy' | 'sell';
  price: string;
  size: string;
  fee: string;
  profit?: string;
  cTime: string;
}

export interface SymbolMetrics {
  symbol: string;
  totalTrades: number;
  totalVolume: number;
  totalFees: number;
  pnl: number;
  winRate: number;
}

export interface AnalyticsResult {
  totalTrades: number;
  totalVolume: number;
  totalFees: number;
  totalPnl: number;
  winRate: number;
  avgTradeSize: number;
  bestAsset: string;
  worstAsset: string;
  symbolMetrics: SymbolMetrics[];
  pnlOverTime: { date: string; pnl: number }[];
  volumeBySymbol: { symbol: string; volume: number }[];
  tradesByDay: { date: string; count: number }[];
}

export const computeAnalytics = (trades: Trade[]): AnalyticsResult => {
  if (!trades.length) {
    return {
      totalTrades: 0,
      totalVolume: 0,
      totalFees: 0,
      totalPnl: 0,
      winRate: 0,
      avgTradeSize: 0,
      bestAsset: 'N/A',
      worstAsset: 'N/A',
      symbolMetrics: [],
      pnlOverTime: [],
      volumeBySymbol: [],
      tradesByDay: [],
    };
  }

  // Group trades by symbol
  const symbolMap: Record<string, Trade[]> = {};
  trades.forEach((t) => {
    const bucket = symbolMap[t.symbol];
    if (bucket) {
      bucket.push(t);
    } else {
      symbolMap[t.symbol] = [t];
    }
  });

  // Compute per-symbol metrics
  const symbolMetrics: SymbolMetrics[] = Object.entries(symbolMap).map(
    ([symbol, symTrades]) => {
      const buys = symTrades.filter((t) => t.side === 'buy');
      const sells = symTrades.filter((t) => t.side === 'sell');

      // Match buys and sells to compute PnL
      let pnl = 0;
      const pairs = Math.min(buys.length, sells.length);
      for (let i = 0; i < pairs; i++) {
        const buyTrade = buys[i];
        const sellTrade = sells[i];
        if (!buyTrade || !sellTrade) continue;

        const buyVal = parseFloat(buyTrade.price) * parseFloat(buyTrade.size);
        const sellVal = parseFloat(sellTrade.price) * parseFloat(sellTrade.size);
        pnl += sellVal - buyVal;
      }

      // If trade has explicit profit field (futures)
      symTrades.forEach((t) => {
        if (t.profit) pnl += parseFloat(t.profit);
      });

      const totalVolume = symTrades.reduce(
        (sum, t) => sum + parseFloat(t.price) * parseFloat(t.size),
        0
      );
      const totalFees = symTrades.reduce(
        (sum, t) => sum + parseFloat(t.fee),
        0
      );
      const winRate = pairs > 0
        ? (sells.filter((sellTrade, i) => {
            const buyTrade = buys[i];
            if (!buyTrade) return false;

            const buyPrice = parseFloat(buyTrade.price);
            const sellPrice = parseFloat(sellTrade.price);
            return sellPrice > buyPrice;
          }).length / pairs) * 100
        : 0;

      return { symbol, totalTrades: symTrades.length, totalVolume, totalFees, pnl, winRate };
    }
  );

  // Overall metrics
  const totalTrades = trades.length;
  const totalVolume = symbolMetrics.reduce((s, m) => s + m.totalVolume, 0);
  const totalFees = symbolMetrics.reduce((s, m) => s + m.totalFees, 0);
  const totalPnl = symbolMetrics.reduce((s, m) => s + m.pnl, 0);
  const winRate = symbolMetrics.reduce((s, m) => s + m.winRate, 0) / symbolMetrics.length;
  const avgTradeSize = totalVolume / totalTrades;

  const bestAsset = [...symbolMetrics].sort((a, b) => b.pnl - a.pnl)[0]?.symbol || 'N/A';
  const worstAsset = [...symbolMetrics].sort((a, b) => a.pnl - b.pnl)[0]?.symbol || 'N/A';

  // PnL over time
  let runningPnl = 0;
  const pnlOverTime = trades
    .slice()
    .sort((a, b) => parseInt(a.cTime) - parseInt(b.cTime))
    .map((t) => {
      if (t.profit) runningPnl += parseFloat(t.profit);
      return {
        date: new Date(parseInt(t.cTime)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        pnl: parseFloat(runningPnl.toFixed(2)),
      };
    });

  // Volume by symbol
  const volumeBySymbol = symbolMetrics.map((m) => ({
    symbol: m.symbol,
    volume: parseFloat(m.totalVolume.toFixed(2)),
  }));

  // Trades by day
  const dayMap: Record<string, number> = {};
  trades.forEach((t) => {
    const day = new Date(parseInt(t.cTime)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dayMap[day] = (dayMap[day] || 0) + 1;
  });
  const tradesByDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

  return {
    totalTrades,
    totalVolume: parseFloat(totalVolume.toFixed(2)),
    totalFees: parseFloat(totalFees.toFixed(2)),
    totalPnl: parseFloat(totalPnl.toFixed(2)),
    winRate: parseFloat(winRate.toFixed(2)),
    avgTradeSize: parseFloat(avgTradeSize.toFixed(2)),
    bestAsset,
    worstAsset,
    symbolMetrics,
    pnlOverTime,
    volumeBySymbol,
    tradesByDay,
  };
};