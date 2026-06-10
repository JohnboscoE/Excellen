import axios from 'axios';

const BASE_URL = 'https://excellen-production.up.railway.app/api';

interface ApiCredentials {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

export const api = axios.create({
  baseURL: BASE_URL,
});

const getAuthHeaders = (credentials: ApiCredentials) => ({
  'x-api-key': credentials.apiKey,
  'x-secret-key': credentials.secretKey,
  'x-passphrase': credentials.passphrase,
});

export const fetchAccountInfo = async (credentials: ApiCredentials) => {
  const res = await api.get('/trades/account', {
    headers: getAuthHeaders(credentials),
  });
  return res.data.data;
};

export const fetchSpotTrades = async (credentials: ApiCredentials) => {
  const res = await api.get('/trades/spot', {
    headers: getAuthHeaders(credentials),
  });
  return res.data.data;
};

export const fetchFuturesTrades = async (credentials: ApiCredentials) => {
  const res = await api.get('/trades/futures', {
    headers: getAuthHeaders(credentials),
  });
  return res.data.data;
};

export const fetchAnalytics = async (credentials: ApiCredentials) => {
  const res = await api.get('/trades/analytics', {
    headers: getAuthHeaders(credentials),
  });
  return res.data.data;
};