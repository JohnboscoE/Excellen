export const mockSpotTrades = [
  { tradeId: '1', symbol: 'BTCUSDT', side: 'buy', price: '62450.50', size: '0.05', fee: '3.12', feeDetail: { feeCoin: 'USDT' }, cTime: '1717200000000' },
  { tradeId: '2', symbol: 'BTCUSDT', side: 'sell', price: '63100.00', size: '0.05', fee: '3.15', feeDetail: { feeCoin: 'USDT' }, cTime: '1717286400000' },
  { tradeId: '3', symbol: 'ETHUSDT', side: 'buy', price: '3420.00', size: '0.5', fee: '1.71', feeDetail: { feeCoin: 'USDT' }, cTime: '1717372800000' },
  { tradeId: '4', symbol: 'ETHUSDT', side: 'sell', price: '3515.00', size: '0.5', fee: '1.75', feeDetail: { feeCoin: 'USDT' }, cTime: '1717459200000' },
  { tradeId: '5', symbol: 'SOLUSDT', side: 'buy', price: '142.30', size: '10', fee: '1.42', feeDetail: { feeCoin: 'USDT' }, cTime: '1717545600000' },
  { tradeId: '6', symbol: 'SOLUSDT', side: 'sell', price: '138.90', size: '10', fee: '1.38', feeDetail: { feeCoin: 'USDT' }, cTime: '1717632000000' },
  { tradeId: '7', symbol: 'BTCUSDT', side: 'buy', price: '61200.00', size: '0.08', fee: '4.89', feeDetail: { feeCoin: 'USDT' }, cTime: '1717718400000' },
  { tradeId: '8', symbol: 'BTCUSDT', side: 'sell', price: '63800.00', size: '0.08', fee: '5.10', feeDetail: { feeCoin: 'USDT' }, cTime: '1717804800000' },
  { tradeId: '9', symbol: 'BNBUSDT', side: 'buy', price: '580.00', size: '2', fee: '1.16', feeDetail: { feeCoin: 'USDT' }, cTime: '1717891200000' },
  { tradeId: '10', symbol: 'BNBUSDT', side: 'sell', price: '595.00', size: '2', fee: '1.19', feeDetail: { feeCoin: 'USDT' }, cTime: '1717977600000' },
];

export const mockFuturesTrades = [
  { tradeId: '11', symbol: 'BTCUSDT', side: 'buy', price: '62000.00', size: '0.1', fee: '6.20', profit: '320.00', cTime: '1717200000000' },
  { tradeId: '12', symbol: 'BTCUSDT', side: 'sell', price: '63200.00', size: '0.1', fee: '6.32', profit: '-150.00', cTime: '1717286400000' },
  { tradeId: '13', symbol: 'ETHUSDT', side: 'buy', price: '3380.00', size: '1', fee: '3.38', profit: '210.00', cTime: '1717372800000' },
  { tradeId: '14', symbol: 'ETHUSDT', side: 'sell', price: '3290.00', size: '1', fee: '3.29', profit: '-180.00', cTime: '1717459200000' },
  { tradeId: '15', symbol: 'SOLUSDT', side: 'buy', price: '145.00', size: '20', fee: '2.90', profit: '95.00', cTime: '1717545600000' },
];

export const mockAccountInfo = {
  userId: '8545990684',
  totalBalance: '12450.80',
  availableBalance: '8320.50',
  frozenBalance: '4130.30',
  totalPnl: '1243.60',
  winRate: '62',
  totalTrades: 15,
  avgSlippage: '0.12',
};