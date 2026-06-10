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

export interface AccountInfo {
  userId: string;
  totalBalance: string;
  availableBalance: string;
  frozenBalance: string;
  totalPnl: string;
  winRate: string;
  totalTrades: number;
  avgSlippage: string;
}

export interface SymbolMetrics {
  symbol: string;
  totalTrades: number;
  totalVolume: number;
  totalFees: number;
  pnl: number;
  winRate: number;
}

export interface Analytics {
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