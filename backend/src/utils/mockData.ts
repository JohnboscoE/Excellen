export const mockSpotTrades = [
  // BTC trades
  { tradeId: '1', symbol: 'BTCUSDT', side: 'buy', price: '62450.50', size: '0.05', fee: '3.12', feeDetail: { feeCoin: 'USDT' }, cTime: '1714500000000' },
  { tradeId: '2', symbol: 'BTCUSDT', side: 'sell', price: '63100.00', size: '0.05', fee: '3.15', feeDetail: { feeCoin: 'USDT' }, cTime: '1714600000000' },
  { tradeId: '3', symbol: 'BTCUSDT', side: 'buy', price: '61200.00', size: '0.08', fee: '4.89', feeDetail: { feeCoin: 'USDT' }, cTime: '1714700000000' },
  { tradeId: '4', symbol: 'BTCUSDT', side: 'sell', price: '63800.00', size: '0.08', fee: '5.10', feeDetail: { feeCoin: 'USDT' }, cTime: '1714800000000' },
  { tradeId: '5', symbol: 'BTCUSDT', side: 'buy', price: '60500.00', size: '0.1', fee: '6.05', feeDetail: { feeCoin: 'USDT' }, cTime: '1714900000000' },
  { tradeId: '6', symbol: 'BTCUSDT', side: 'sell', price: '62000.00', size: '0.1', fee: '6.20', feeDetail: { feeCoin: 'USDT' }, cTime: '1715000000000' },

  // ETH trades
  { tradeId: '7', symbol: 'ETHUSDT', side: 'buy', price: '3420.00', size: '0.5', fee: '1.71', feeDetail: { feeCoin: 'USDT' }, cTime: '1714520000000' },
  { tradeId: '8', symbol: 'ETHUSDT', side: 'sell', price: '3515.00', size: '0.5', fee: '1.75', feeDetail: { feeCoin: 'USDT' }, cTime: '1714620000000' },
  { tradeId: '9', symbol: 'ETHUSDT', side: 'buy', price: '3280.00', size: '1', fee: '3.28', feeDetail: { feeCoin: 'USDT' }, cTime: '1714720000000' },
  { tradeId: '10', symbol: 'ETHUSDT', side: 'sell', price: '3190.00', size: '1', fee: '3.19', feeDetail: { feeCoin: 'USDT' }, cTime: '1714820000000' },
  { tradeId: '11', symbol: 'ETHUSDT', side: 'buy', price: '3100.00', size: '2', fee: '6.20', feeDetail: { feeCoin: 'USDT' }, cTime: '1714920000000' },
  { tradeId: '12', symbol: 'ETHUSDT', side: 'sell', price: '3350.00', size: '2', fee: '6.70', feeDetail: { feeCoin: 'USDT' }, cTime: '1715020000000' },

  // SOL trades
  { tradeId: '13', symbol: 'SOLUSDT', side: 'buy', price: '142.30', size: '10', fee: '1.42', feeDetail: { feeCoin: 'USDT' }, cTime: '1714540000000' },
  { tradeId: '14', symbol: 'SOLUSDT', side: 'sell', price: '138.90', size: '10', fee: '1.38', feeDetail: { feeCoin: 'USDT' }, cTime: '1714640000000' },
  { tradeId: '15', symbol: 'SOLUSDT', side: 'buy', price: '130.00', size: '20', fee: '2.60', feeDetail: { feeCoin: 'USDT' }, cTime: '1714740000000' },
  { tradeId: '16', symbol: 'SOLUSDT', side: 'sell', price: '148.00', size: '20', fee: '2.96', feeDetail: { feeCoin: 'USDT' }, cTime: '1714840000000' },

  // BNB trades
  { tradeId: '17', symbol: 'BNBUSDT', side: 'buy', price: '580.00', size: '2', fee: '1.16', feeDetail: { feeCoin: 'USDT' }, cTime: '1714560000000' },
  { tradeId: '18', symbol: 'BNBUSDT', side: 'sell', price: '595.00', size: '2', fee: '1.19', feeDetail: { feeCoin: 'USDT' }, cTime: '1714660000000' },
  { tradeId: '19', symbol: 'BNBUSDT', side: 'buy', price: '560.00', size: '3', fee: '1.68', feeDetail: { feeCoin: 'USDT' }, cTime: '1714760000000' },
  { tradeId: '20', symbol: 'BNBUSDT', side: 'sell', price: '545.00', size: '3', fee: '1.63', feeDetail: { feeCoin: 'USDT' }, cTime: '1714860000000' },

  // XRP trades
  { tradeId: '21', symbol: 'XRPUSDT', side: 'buy', price: '0.52', size: '5000', fee: '2.60', feeDetail: { feeCoin: 'USDT' }, cTime: '1714580000000' },
  { tradeId: '22', symbol: 'XRPUSDT', side: 'sell', price: '0.58', size: '5000', fee: '2.90', feeDetail: { feeCoin: 'USDT' }, cTime: '1714680000000' },
  { tradeId: '23', symbol: 'XRPUSDT', side: 'buy', price: '0.55', size: '8000', fee: '4.40', feeDetail: { feeCoin: 'USDT' }, cTime: '1714780000000' },
  { tradeId: '24', symbol: 'XRPUSDT', side: 'sell', price: '0.53', size: '8000', fee: '4.24', feeDetail: { feeCoin: 'USDT' }, cTime: '1714880000000' },

  // DOGE trades
  { tradeId: '25', symbol: 'DOGEUSDT', side: 'buy', price: '0.138', size: '20000', fee: '2.76', feeDetail: { feeCoin: 'USDT' }, cTime: '1714590000000' },
  { tradeId: '26', symbol: 'DOGEUSDT', side: 'sell', price: '0.152', size: '20000', fee: '3.04', feeDetail: { feeCoin: 'USDT' }, cTime: '1714690000000' },
  { tradeId: '27', symbol: 'DOGEUSDT', side: 'buy', price: '0.145', size: '15000', fee: '2.17', feeDetail: { feeCoin: 'USDT' }, cTime: '1714790000000' },
  { tradeId: '28', symbol: 'DOGEUSDT', side: 'sell', price: '0.141', size: '15000', fee: '2.11', feeDetail: { feeCoin: 'USDT' }, cTime: '1714890000000' },

  // ADA trades
  { tradeId: '29', symbol: 'ADAUSDT', side: 'buy', price: '0.45', size: '10000', fee: '4.50', feeDetail: { feeCoin: 'USDT' }, cTime: '1714595000000' },
  { tradeId: '30', symbol: 'ADAUSDT', side: 'sell', price: '0.48', size: '10000', fee: '4.80', feeDetail: { feeCoin: 'USDT' }, cTime: '1714695000000' },

  // AVAX trades
  { tradeId: '31', symbol: 'AVAXUSDT', side: 'buy', price: '34.20', size: '50', fee: '1.71', feeDetail: { feeCoin: 'USDT' }, cTime: '1714598000000' },
  { tradeId: '32', symbol: 'AVAXUSDT', side: 'sell', price: '37.80', size: '50', fee: '1.89', feeDetail: { feeCoin: 'USDT' }, cTime: '1714698000000' },
  { tradeId: '33', symbol: 'AVAXUSDT', side: 'buy', price: '32.00', size: '80', fee: '2.56', feeDetail: { feeCoin: 'USDT' }, cTime: '1714798000000' },
  { tradeId: '34', symbol: 'AVAXUSDT', side: 'sell', price: '30.50', size: '80', fee: '2.44', feeDetail: { feeCoin: 'USDT' }, cTime: '1714898000000' },

  // LINK trades
  { tradeId: '35', symbol: 'LINKUSDT', side: 'buy', price: '13.40', size: '200', fee: '2.68', feeDetail: { feeCoin: 'USDT' }, cTime: '1714599000000' },
  { tradeId: '36', symbol: 'LINKUSDT', side: 'sell', price: '14.90', size: '200', fee: '2.98', feeDetail: { feeCoin: 'USDT' }, cTime: '1714699000000' },

  // DOT trades
  { tradeId: '37', symbol: 'DOTUSDT', side: 'buy', price: '7.20', size: '500', fee: '3.60', feeDetail: { feeCoin: 'USDT' }, cTime: '1714601000000' },
  { tradeId: '38', symbol: 'DOTUSDT', side: 'sell', price: '6.80', size: '500', fee: '3.40', feeDetail: { feeCoin: 'USDT' }, cTime: '1714701000000' },

  // MATIC trades
  { tradeId: '39', symbol: 'MATICUSDT', side: 'buy', price: '0.72', size: '8000', fee: '5.76', feeDetail: { feeCoin: 'USDT' }, cTime: '1714602000000' },
  { tradeId: '40', symbol: 'MATICUSDT', side: 'sell', price: '0.79', size: '8000', fee: '6.32', feeDetail: { feeCoin: 'USDT' }, cTime: '1714702000000' },
];

export const mockFuturesTrades = [
  { tradeId: '41', symbol: 'BTCUSDT', side: 'buy', price: '62000.00', size: '0.1', fee: '6.20', profit: '320.00', cTime: '1714503000000' },
  { tradeId: '42', symbol: 'BTCUSDT', side: 'sell', price: '63200.00', size: '0.1', fee: '6.32', profit: '-150.00', cTime: '1714603000000' },
  { tradeId: '43', symbol: 'BTCUSDT', side: 'buy', price: '59800.00', size: '0.2', fee: '11.96', profit: '480.00', cTime: '1714703000000' },
  { tradeId: '44', symbol: 'BTCUSDT', side: 'sell', price: '61500.00', size: '0.2', fee: '12.30', profit: '-220.00', cTime: '1714803000000' },

  { tradeId: '45', symbol: 'ETHUSDT', side: 'buy', price: '3380.00', size: '1', fee: '3.38', profit: '210.00', cTime: '1714523000000' },
  { tradeId: '46', symbol: 'ETHUSDT', side: 'sell', price: '3290.00', size: '1', fee: '3.29', profit: '-180.00', cTime: '1714623000000' },
  { tradeId: '47', symbol: 'ETHUSDT', side: 'buy', price: '3150.00', size: '2', fee: '6.30', profit: '560.00', cTime: '1714723000000' },
  { tradeId: '48', symbol: 'ETHUSDT', side: 'sell', price: '3400.00', size: '2', fee: '6.80', profit: '-90.00', cTime: '1714823000000' },

  { tradeId: '49', symbol: 'SOLUSDT', side: 'buy', price: '145.00', size: '20', fee: '2.90', profit: '95.00', cTime: '1714543000000' },
  { tradeId: '50', symbol: 'SOLUSDT', side: 'sell', price: '138.00', size: '20', fee: '2.76', profit: '-140.00', cTime: '1714643000000' },
  { tradeId: '51', symbol: 'SOLUSDT', side: 'buy', price: '128.00', size: '30', fee: '3.84', profit: '420.00', cTime: '1714743000000' },

  { tradeId: '52', symbol: 'BNBUSDT', side: 'buy', price: '570.00', size: '5', fee: '2.85', profit: '125.00', cTime: '1714563000000' },
  { tradeId: '53', symbol: 'BNBUSDT', side: 'sell', price: '555.00', size: '5', fee: '2.77', profit: '-75.00', cTime: '1714663000000' },

  { tradeId: '54', symbol: 'XRPUSDT', side: 'buy', price: '0.54', size: '10000', fee: '5.40', profit: '180.00', cTime: '1714583000000' },
  { tradeId: '55', symbol: 'XRPUSDT', side: 'sell', price: '0.51', size: '10000', fee: '5.10', profit: '-120.00', cTime: '1714683000000' },

  { tradeId: '56', symbol: 'AVAXUSDT', side: 'buy', price: '33.00', size: '100', fee: '3.30', profit: '240.00', cTime: '1714593000000' },
  { tradeId: '57', symbol: 'AVAXUSDT', side: 'sell', price: '35.50', size: '100', fee: '3.55', profit: '-60.00', cTime: '1714693000000' },

  { tradeId: '58', symbol: 'LINKUSDT', side: 'buy', price: '13.80', size: '300', fee: '4.14', profit: '310.00', cTime: '1714594000000' },
  { tradeId: '59', symbol: 'DOGEUSDT', side: 'buy', price: '0.142', size: '25000', fee: '3.55', profit: '175.00', cTime: '1714596000000' },
  { tradeId: '60', symbol: 'MATICUSDT', side: 'sell', price: '0.75', size: '10000', fee: '7.50', profit: '-85.00', cTime: '1714697000000' },
];

export const mockAccountInfo = {
  userId: '8545990684',
  totalBalance: '48320.75',
  availableBalance: '31240.50',
  frozenBalance: '17080.25',
  totalPnl: '3842.60',
  winRate: '64',
  totalTrades: 60,
  avgSlippage: '0.09',
};