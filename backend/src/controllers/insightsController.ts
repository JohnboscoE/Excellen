import { Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

export const generateInsights = async (req: Request, res: Response) => {
  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    const { analytics } = req.body;

    const prompt = `
You are a professional crypto trading analyst. Analyze this trader's performance data and return a JSON object with exactly this structure:
{
  "summary": "2-3 sentence overall assessment of the trader's performance",
  "insights": [
    { "type": "positive|warning|neutral", "title": "short title", "body": "2 sentence insight" },
    { "type": "positive|warning|neutral", "title": "short title", "body": "2 sentence insight" },
    { "type": "positive|warning|neutral", "title": "short title", "body": "2 sentence insight" },
    { "type": "positive|warning|neutral", "title": "short title", "body": "2 sentence insight" },
    { "type": "positive|warning|neutral", "title": "short title", "body": "2 sentence insight" }
  ]
}

Trader data:
- Total Trades: ${analytics.totalTrades}
- Total PnL: $${analytics.totalPnl}
- Win Rate: ${analytics.winRate}%
- Total Volume: $${analytics.totalVolume}
- Total Fees: $${analytics.totalFees}
- Average Trade Size: $${analytics.avgTradeSize}
- Best Asset: ${analytics.bestAsset}
- Worst Asset: ${analytics.worstAsset}
- Symbol breakdown: ${JSON.stringify(analytics.symbolMetrics)}

Return ONLY the JSON object. No markdown, no explanation, no backticks.
    `;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = (message.content[0] as any).text;
    const parsed = JSON.parse(text);
    res.json({ code: '00000', data: parsed });
  } catch (error: any) {
    console.error('Insights error:', error.message);
    res.status(500).json({ error: error.message });
  }
};