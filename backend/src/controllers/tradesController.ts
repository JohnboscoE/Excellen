import { Request, Response } from 'express';
import axios from 'axios';
import { getHeaders } from '../utils/bitgetAuth';
import { BITGET_BASE_URL, ENDPOINTS } from '../config/bitget';
import { mockSpotTrades, mockFuturesTrades, mockAccountInfo } from '../utils/mockData';
import { computeAnalytics } from '../utils/analytics';

const USE_MOCK = true;

const getCredentials = (req: Request) => ({
  apiKey: req.headers['x-api-key'] as string,
  secretKey: req.headers['x-secret-key'] as string,
  passphrase: req.headers['x-passphrase'] as string,
});

const isDemoMode = (req: Request) =>
  req.headers['x-api-key'] === 'demo';

export const getSpotTrades = async (req: Request, res: Response) => {
  if (USE_MOCK) return res.json({ code: '00000', data: mockSpotTrades });
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
  if (USE_MOCK) return res.json({ code: '00000', data: mockFuturesTrades });
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
  if (USE_MOCK) return res.json({ code: '00000', data: mockAccountInfo });
  try {
    const creds = getCredentials(req);
    const path = ENDPOINTS.ACCOUNT_INFO;
    const headers = getHeaders('GET', path, '', creds);
    const response = await axios.get(`${BITGET_BASE_URL}${path}`, { headers });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const allTrades = [...mockSpotTrades, ...mockFuturesTrades] as any[];
    const result = computeAnalytics(allTrades);
    res.json({ code: '00000', data: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};