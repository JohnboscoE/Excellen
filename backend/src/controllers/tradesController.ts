import { Request, Response } from 'express';
import axios from 'axios';
import { getHeaders } from '../utils/bitgetAuth';
import { BITGET_BASE_URL, ENDPOINTS } from '../config/bitget';
import { mockSpotTrades, mockFuturesTrades, mockAccountInfo } from '../utils/mockData';
import { computeAnalytics } from '../utils/analytics';

const getCredentials = (req: Request) => ({
  apiKey: req.headers['x-api-key'] as string,
  secretKey: req.headers['x-secret-key'] as string,
  passphrase: req.headers['x-passphrase'] as string,
});

const isDemoMode = (req: Request) =>
  req.headers['x-api-key'] === 'demo';

export const getSpotTrades = async (req: Request, res: Response) => {
  if (isDemoMode(req)) return res.json({ code: '00000', data: mockSpotTrades });
  try {
    const creds = getCredentials(req);
    const path = ENDPOINTS.SPOT_TRADES;
    const headers = getHeaders('GET', path, '', creds);
    const response = await axios.get(`${BITGET_BASE_URL}${path}`, { headers });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFuturesTrades = async (req: Request, res: Response) => {
  if (isDemoMode(req)) return res.json({ code: '00000', data: mockFuturesTrades });
  try {
    const creds = getCredentials(req);
    const path = `${ENDPOINTS.FUTURES_TRADES}?productType=USDT-FUTURES`;
    const headers = getHeaders('GET', path, '', creds);
    const response = await axios.get(`${BITGET_BASE_URL}${path}`, { headers });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountInfo = async (req: Request, res: Response) => {
  if (isDemoMode(req)) return res.json({ code: '00000', data: mockAccountInfo });
  try {
    const creds = getCredentials(req);
    console.log('Credentials received:', {
      apiKey: creds.apiKey ? creds.apiKey.substring(0, 8) + '...' : 'MISSING',
      secretKey: creds.secretKey ? 'present' : 'MISSING',
      passphrase: creds.passphrase ? 'present' : 'MISSING',
    });
    const path = ENDPOINTS.ACCOUNT_INFO;
    const headers = getHeaders('GET', path, '', creds);
    const response = await axios.get(`${BITGET_BASE_URL}${path}`, { headers });
    console.log('Bitget response:', response.data);
    res.json(response.data);
  } catch (error: any) {
    console.error('Account error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    if (isDemoMode(req)) {
      const allTrades = [...mockSpotTrades, ...mockFuturesTrades] as any[];
      const result = computeAnalytics(allTrades);
      return res.json({ code: '00000', data: result });
    }
    const creds = getCredentials(req);
    const spotPath = ENDPOINTS.SPOT_TRADES;
    const spotHeaders = getHeaders('GET', spotPath, '', creds);
    const spotRes = await axios.get(`${BITGET_BASE_URL}${spotPath}`, { headers: spotHeaders });
    const spotTrades = spotRes.data.data || [];

    const futuresPath = `${ENDPOINTS.FUTURES_TRADES}?productType=USDT-FUTURES`;
    const futuresHeaders = getHeaders('GET', futuresPath, '', creds);
    const futuresRes = await axios.get(`${BITGET_BASE_URL}${futuresPath}`, { headers: futuresHeaders });
    const futuresTrades = futuresRes.data.fillList || [];

    const allTrades = [...spotTrades, ...futuresTrades];
    const result = computeAnalytics(allTrades);
    res.json({ code: '00000', data: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};