import { Request, Response } from 'express';

export const generateInsights = async (req: Request, res: Response) => {
  try {
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

    const response = await fetch(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ALIBABA_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'qwen-plus',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Qwen API error: ${response.status} ${err}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    const parsed = JSON.parse(text);

    res.json({ code: '00000', data: parsed });
  } catch (error: any) {
    console.error('Insights error:', error.message);
    res.status(500).json({ error: error.message });
  }
};