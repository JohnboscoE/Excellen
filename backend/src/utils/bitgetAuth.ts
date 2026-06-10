import crypto from 'crypto';

export const generateSignature = (
  timestamp: string,
  method: string,
  requestPath: string,
  body: string,
  secretKey: string
): string => {
  const message = timestamp + method.toUpperCase() + requestPath + body;
  return crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('base64');
};

export const getHeaders = (
  method: string,
  requestPath: string,
  body: string = '',
  credentials?: { apiKey: string; secretKey: string; passphrase: string }
) => {
  const apiKey = credentials?.apiKey || process.env.BITGET_API_KEY!;
  const secretKey = credentials?.secretKey || process.env.BITGET_SECRET_KEY!;
  const passphrase = credentials?.passphrase || process.env.BITGET_PASSPHRASE!;

  const timestamp = Date.now().toString();
  const signature = generateSignature(timestamp, method, requestPath, body, secretKey);

  return {
    'ACCESS-KEY': apiKey,
    'ACCESS-SIGN': signature,
    'ACCESS-TIMESTAMP': timestamp,
    'ACCESS-PASSPHRASE': passphrase,
    'Content-Type': 'application/json',
  };
};