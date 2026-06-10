# ExcelLens

> A trading execution analyzer and performance dashboard built on the Bitget API.

## What It Does

ExcelLens connects to your Bitget account and gives you a clear picture of your trading execution quality — something Bitget's native interface doesn't provide out of the box.

### Features

- **Dashboard** — Real-time overview of PnL, win rate, volume, fees, best/worst assets
- **Trades** — Full trade history with filtering by symbol, side, and type
- **Analytics** — Deep per-asset breakdown with PnL, win rate, and fee analysis charts
- **AI Insights** — Claude-powered analysis of your execution patterns and actionable recommendations
- **Demo Mode** — Try the full app without a Bitget account
- **Multi-user** — Bring your own API keys, nothing is stored server-side

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS + Recharts
- **Backend:** Node.js + Express + TypeScript
- **AI:** Anthropic Claude API
- **Exchange:** Bitget REST API

## Getting Started

### Prerequisites
- Node.js 18+
- Bitget account with API keys (read-only recommended)
- Anthropic API key

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

BITGET_API_KEY=your_bitget_api_key
BITGET_SECRET_KEY=your_bitget_secret_key
BITGET_PASSPHRASE=your_bitget_passphrase
ANTHROPIC_API_KEY=your_anthropic_api_key
PORT=5000

## Security

- API keys are never stored — they exist only for the duration of your session
- Use read-only Bitget API keys with no withdrawal permissions
- Never commit your `.env` file

## Track

Built for the **Trading Infrastructure** track of the Bitget Hackathon 2026.

ExcelLens is infrastructure tooling for traders — it sits on top of Bitget's API and surfaces execution quality metrics that help traders understand and improve their performance.