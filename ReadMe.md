# ExcelLens

> A trading execution analyzer and performance dashboard built on the Bitget API.

## What It Does

ExcelLens connects to your Bitget account and gives you a clear picture of your trading execution quality — something Bitget's native interface doesn't provide out of the box.

### Features

- **Dashboard** — Real-time overview of PnL, win rate, volume, fees, best/worst assets
- **Trades** — Full trade history with filtering by symbol, side, and type
- **Analytics** — Deep per-asset breakdown with PnL, win rate, and fee analysis charts
- **AI Insights** — Qwen-powered analysis of your execution patterns and actionable recommendations
- **Demo Mode** — Try the full app without a Bitget account
- **Multi-user** — Bring your own API keys, nothing is stored server-side

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS + Recharts
- **Backend:** Node.js + Express + TypeScript
- **AI:** Alibaba Cloud Qwen (`qwen-plus`)
- **Exchange:** Bitget REST API

## Getting Started

### Prerequisites
- Node.js 18+
- Bitget account with API keys (read-only recommended)
- Alibaba Cloud API key (DashScope)

### Installation

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Fill in your credentials in .env
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `backend/.env`:
```bash
BITGET_API_KEY=your_bitget_api_key
BITGET_SECRET_KEY=your_bitget_secret_key
BITGET_PASSPHRASE=your_bitget_passphrase
ALIBABA_API_KEY=your_alibaba_cloud_api_key
PORT=5000
```

## AI Insights

ExcelLens uses **Alibaba Cloud Qwen** (`qwen-plus`) via the DashScope OpenAI-compatible endpoint to analyze your trade history and surface execution quality insights. The model receives your aggregated analytics — win rate, PnL, fees, asset breakdown — and returns structured insights with specific, actionable recommendations.

The AI layer runs entirely on the backend. Your trade data is sent to Qwen only when you explicitly click "Generate Insights" and is never stored or logged.

## Security

- API keys are never stored — they exist only for the duration of your session
- Use read-only Bitget API keys with no withdrawal permissions
- Never commit your `.env` file

## Track

Built for the **Trading Infrastructure** track of the Bitget Hackathon 2026.

ExcelLens is infrastructure tooling for traders — it sits on top of Bitget's API and surfaces execution quality metrics that help traders understand and improve their performance.

## Verified Usage

Real logs from the live Railway deployment showing the backend processing authenticated requests in production: [docs/usage-logs.md](./docs/usage-logs.md)