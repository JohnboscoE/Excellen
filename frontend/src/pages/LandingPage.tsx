import React, { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  Activity,
  Shield,
  Zap,
  BarChart2,
  Brain,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface LandingPageProps {
  onConnect: () => void;
  onDemo: () => void;
}

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target: number, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((ease * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return { value, ref };
}

// ── Stat ticker item ───────────────────────────────────────────────────────
function TickerStat({
  label,
  prefix = "",
  suffix = "",
  target,
  decimals = 0,
  color = "text-white",
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  target: number;
  decimals?: number;
  color?: string;
}) {
  const { value, ref } = useCounter(target, 1800, decimals);
  return (
    <div className="flex flex-col items-center px-6 py-3 border-r border-border last:border-r-0">
      <span className="text-xs text-muted uppercase tracking-widest mb-1 font-medium">
        {label}
      </span>
      <span ref={ref} className={`font-mono text-lg font-semibold ${color}`}>
        {prefix}
        {decimals > 0 ?
          value.toFixed(decimals)
        : Math.round(value).toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:border-accent/40 hover:bg-surface2 transition-all duration-200 group">
      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/15 transition-colors">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-sm mb-1.5">{title}</h3>
      <p className="text-muted text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Step row ──────────────────────────────────────────────────────────────
function StepRow({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 py-5 border-b border-border last:border-b-0">
      <span className="font-mono text-xs text-accent font-bold pt-0.5 min-w-[24px]">
        {num}
      </span>
      <div>
        <h4 className="text-white text-sm font-semibold mb-1">{title}</h4>
        <p className="text-muted text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── AI insight row ────────────────────────────────────────────────────────
function InsightRow({
  tag,
  tagColor,
  text,
}: {
  tag: string;
  tagColor: string;
  text: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 items-start py-3 border-b border-border last:border-b-0">
      <span
        className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mt-0.5 shrink-0 ${tagColor}`}
      >
        {tag}
      </span>
      <p className="text-muted text-xs leading-relaxed">{text}</p>
    </div>
  );
}

// ── Mini sparkline SVG ────────────────────────────────────────────────────
function Sparkline() {
  const pts = [10, 28, 18, 42, 35, 55, 48, 62, 58, 75, 68, 88, 80, 95];
  const w = 200;
  const h = 56;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map((v) => h - (v / 100) * h);
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const fill = `${d} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-14"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#sparkGrad)" />
      <path
        d={d}
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Mini bar chart SVG ────────────────────────────────────────────────────
function BarChart() {
  const data = [
    { label: "BTC", val: 88, color: "#F59E0B" },
    { label: "ETH", val: 62, color: "#F59E0B" },
    { label: "SOL", val: 44, color: "#2A2A2A" },
    { label: "LINK", val: 30, color: "#2A2A2A" },
    { label: "AVAX", val: 18, color: "#2A2A2A" },
  ];
  return (
    <div className="flex items-end gap-2 h-14">
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-sm"
            style={{
              height: `${(d.val / 100) * 48}px`,
              background: d.color,
              opacity: d.color === "#F59E0B" ? 0.85 : 0.4,
            }}
          />
          <span className="text-muted font-mono" style={{ fontSize: 9 }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Dashboard preview mockup ───────────────────────────────────────────────
function DashboardPreview() {
  const stats = [
    { label: "Total PnL", value: "+$4,218", color: "text-positive" },
    { label: "Win Rate", value: "68.4%", color: "text-positive" },
    { label: "Volume", value: "$142K", color: "text-white" },
    { label: "Fees", value: "-$318", color: "text-negative" },
  ];

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Window chrome */}
      <div className="bg-surface2 border-b border-border px-4 py-2.5 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-negative/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-accent/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-positive/70" />
        <span className="mx-auto font-mono text-muted text-xs">
          excellen.vercel.app/dashboard
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Stat row */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-surface2 border border-border rounded-lg p-2.5"
            >
              <div className="text-muted text-[10px] mb-1">{s.label}</div>
              <div className={`font-mono text-sm font-semibold ${s.color}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface2 border border-border rounded-lg p-3">
            <div className="text-muted text-[10px] mb-2">Cumulative PnL</div>
            <Sparkline />
          </div>
          <div className="bg-surface2 border border-border rounded-lg p-3">
            <div className="text-muted text-[10px] mb-2">Asset Performance</div>
            <BarChart />
          </div>
        </div>

        {/* Trades table stub */}
        <div className="bg-surface2 border border-border rounded-lg p-3">
          <div className="text-muted text-[10px] mb-2">Recent Trades</div>
          {[
            { pair: "BTCUSDT", side: "BUY", pnl: "+$182.40", pos: true },
            { pair: "ETHUSDT", side: "SELL", pnl: "+$94.10", pos: true },
            { pair: "SOLUSDT", side: "BUY", pnl: "-$38.70", pos: false },
          ].map((t) => (
            <div
              key={t.pair + t.pnl}
              className="flex items-center justify-between py-1.5 border-b border-border last:border-b-0"
            >
              <span className="font-mono text-[10px] text-white">{t.pair}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  t.side === "BUY" ?
                    "bg-positive/10 text-positive"
                  : "bg-negative/10 text-negative"
                }`}
              >
                {t.side}
              </span>
              <span
                className={`font-mono text-[10px] ${
                  t.pos ? "text-positive" : "text-negative"
                }`}
              >
                {t.pnl}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main landing page component ────────────────────────────────────────────
const LandingPage: React.FC<LandingPageProps> = ({ onConnect, onDemo }) => {
  return (
    <div className="bg-background min-h-screen text-white overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-background text-xs font-black">EL</span>
            </div>
            <span className="font-bold text-white tracking-tight">
              ExcelLens
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-muted text-sm hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how"
              className="text-muted text-sm hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#ai"
              className="text-muted text-sm hover:text-white transition-colors"
            >
              AI Insights
            </a>
          </div>

          <button
            onClick={onConnect}
            className="flex items-center gap-1.5 bg-accent text-background text-sm font-bold px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Launch App <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
          <span className="text-muted text-xs font-medium">
            Built on Bitget API · Trading Infrastructure Track
          </span>
        </div>

        <h1 className="font-black text-5xl md:text-6xl leading-[1.05] tracking-tight mb-5">
          Know your <span className="text-accent">execution</span>
          <br />
          edge
        </h1>

        <p className="text-muted text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          ExcelLens connects to your Bitget account and surfaces the execution
          quality metrics your exchange doesn't show you, powered by AI
          analysis.
        </p>

        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={onConnect}
            className="flex items-center gap-2 bg-accent text-background font-bold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 active:scale-95 transition-all"
          >
            Connect API Keys <ArrowRight size={15} />
          </button>
          <button
            onClick={onDemo}
            className="flex items-center gap-2 border border-border text-muted text-sm px-6 py-3 rounded-xl hover:border-accent/40 hover:text-white transition-all"
          >
            Try Demo Mode
          </button>
        </div>

        {/* Live metrics ticker */}
        <div className="inline-flex bg-surface border border-border rounded-xl overflow-hidden mb-2">
          <TickerStat
            label="Win Rate"
            target={68.4}
            decimals={1}
            suffix="%"
            color="text-positive"
          />
          <TickerStat
            label="Total PnL"
            prefix="+$"
            target={4218}
            color="text-positive"
          />
          <TickerStat label="Trades" target={374} suffix=" orders" />
          <TickerStat
            label="Fees"
            prefix="-$"
            target={318}
            color="text-negative"
          />
        </div>
        <p className="text-muted text-[11px]">
          Simulated metrics — connect your API keys to see yours
        </p>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <DashboardPreview />
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-border"
      >
        <div className="mb-10">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">
            What you get
          </span>
          <h2 className="text-3xl font-black tracking-tight mt-2 mb-3">
            Your trading data, finally legible
          </h2>
          <p className="text-muted text-sm max-w-md leading-relaxed">
            Six views your exchange doesn't give you — from execution quality to
            AI-driven pattern recognition.
          </p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          <FeatureCard
            icon={<BarChart2 size={16} />}
            title="Dashboard"
            desc="Real-time PnL, win rate, volume, fees, and best/worst asset overview — your trading health at a glance."
          />
          <FeatureCard
            icon={<Activity size={16} />}
            title="Trade History"
            desc="Full trade log with filtering by symbol, side, and type. Every fill, every entry, every exit — searchable."
          />
          <FeatureCard
            icon={<TrendingUp size={16} />}
            title="Deep Analytics"
            desc="Per-asset breakdown with PnL, win rate, and fee analysis charts. Know which pairs are carrying you."
          />
          <FeatureCard
            icon={<Brain size={16} />}
            title="AI Insights"
            desc="Claude-powered analysis of your execution patterns with concrete, actionable recommendations."
          />
          <FeatureCard
            icon={<Zap size={16} />}
            title="Demo Mode"
            desc="Try the full dashboard with realistic sample data — no Bitget account or API keys required."
          />
          <FeatureCard
            icon={<Shield size={16} />}
            title="Zero Storage"
            desc="Bring your own API keys. Nothing stored server-side — keys live only for the duration of your session."
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="border-t border-border py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest">
                How it works
              </span>
              <h2 className="text-3xl font-black tracking-tight mt-2 mb-6">
                Up and running in three steps
              </h2>
              <div>
                <StepRow
                  num="01"
                  title="Connect your Bitget API"
                  desc="Enter your read-only API key, secret, and passphrase. No withdrawal permissions needed — we never touch your funds."
                />
                <StepRow
                  num="02"
                  title="We fetch and analyze your trades"
                  desc="ExcelLens pulls your trade history directly from the Bitget API and computes execution quality metrics in real time."
                />
                <StepRow
                  num="03"
                  title="Get AI-powered insights"
                  desc="Claude analyzes your patterns — slippage, timing, asset concentration — and surfaces what's costing you edge."
                />
              </div>
              <div className="flex items-center gap-5 mt-6">
                {["Read-only API only", "No keys stored", "Session-scoped"].map(
                  (t) => (
                    <div
                      key={t}
                      className="flex items-center gap-1.5 text-xs text-muted"
                    >
                      <span className="text-positive">✓</span> {t}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* API flow visual */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-4">
                Live request flow
              </p>
              {[
                {
                  method: "GET",
                  path: "/api/spot/trade/fills",
                  status: "200 OK",
                  color: "text-positive",
                },
                {
                  method: "GET",
                  path: "/api/mix/order/history",
                  status: "200 OK",
                  color: "text-positive",
                },
                {
                  method: "POST",
                  path: "/v1/messages  (Claude AI)",
                  status: "streaming",
                  color: "text-accent",
                },
              ].map((r) => (
                <div
                  key={r.path}
                  className="flex items-center justify-between bg-surface2 border border-border rounded-lg px-3 py-2.5 font-mono text-xs"
                >
                  <span className="text-muted mr-2">{r.method}</span>
                  <span className="text-white flex-1">{r.path}</span>
                  <span className={r.color}>{r.status}</span>
                </div>
              ))}

              <p className="text-muted text-[10px] pt-2 pb-1">
                Computed metrics
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  "Win Rate",
                  "Avg Hold Time",
                  "Fee Drag",
                  "Asset PnL",
                  "Best/Worst",
                  "Exec Score",
                ].map((m) => (
                  <div
                    key={m}
                    className="bg-accent/10 border border-accent/20 rounded px-2 py-1.5 text-accent text-[10px] font-medium"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI INSIGHTS ── */}
      <section id="ai" className="border-t border-border py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest">
                AI Insights
              </span>
              <h2 className="text-3xl font-black tracking-tight mt-2 mb-4">
                Claude reads your trade history
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-6 max-w-sm">
                Not just charts — actual reasoning. ExcelLens feeds your
                execution data to Claude and returns specific, actionable
                analysis of what's costing you.
              </p>
              <div className="space-y-2.5">
                {[
                  "Slippage pattern detection",
                  "Over-trading identification",
                  "Fee-to-return ratio warnings",
                  "Best-performing time windows",
                  "Asset concentration risk flags",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <ChevronRight size={13} className="text-accent shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* AI card */}
            <div className="bg-background border border-border rounded-xl overflow-hidden">
              <div className="bg-surface2 border-b border-border px-4 py-3 flex items-center gap-2">
                <Brain size={13} className="text-accent" />
                <span className="text-accent text-xs font-bold">
                  Claude Analysis — Last 30 days
                </span>
              </div>
              <div className="p-4">
                <InsightRow
                  tag="Watch"
                  tagColor="bg-accent/10 text-accent"
                  text={
                    <>
                      <strong className="text-white">73% of your losses</strong>{" "}
                      occur in the first 2 minutes. Consider wider entry buffers
                      or waiting for price confirmation.
                    </>
                  }
                />
                <InsightRow
                  tag="Strong"
                  tagColor="bg-positive/10 text-positive"
                  text={
                    <>
                      <strong className="text-white">BTC and ETH pairs</strong>{" "}
                      account for 81% of your gains. Your edge is significantly
                      stronger on majors vs altcoins.
                    </>
                  }
                />
                <InsightRow
                  tag="Cost"
                  tagColor="bg-negative/10 text-negative"
                  text={
                    <>
                      <strong className="text-white">
                        Fees are $318 this month
                      </strong>{" "}
                      — eroding ~7.2% of gross profit. Switching to limit
                      entries could recover ~$180/month.
                    </>
                  }
                />
                <InsightRow
                  tag="Pattern"
                  tagColor="bg-surface2 text-muted border border-border"
                  text={
                    <>
                      <strong className="text-white">
                        Tue 09:00–11:00 UTC
                      </strong>{" "}
                      is your highest win-rate window (82%). You trade 3× less
                      here than in your worst hours.
                    </>
                  }
                />
              </div>
              <p className="text-right text-[10px] text-muted px-4 pb-3">
                Sample — connect your account to generate yours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMO BANNER ── */}
      <section className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-surface border border-accent/20 rounded-xl px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="text-white font-black text-xl mb-1">
                No Bitget account? Try Demo Mode
              </h3>
              <p className="text-muted text-sm">
                The full dashboard with realistic sample data — no keys, no
                signup.
              </p>
            </div>
            <button
              onClick={onDemo}
              className="shrink-0 flex items-center gap-2 bg-accent text-background font-bold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 active:scale-95 transition-all"
            >
              Try Demo <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="border-t border-border py-20 text-center">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tight mb-3">
            Ready to know your edge?
          </h2>
          <p className="text-muted text-sm mb-8 leading-relaxed">
            Connect your Bitget API keys and get your first insights in under 60
            seconds.
          </p>
          <button
            onClick={onConnect}
            className="flex items-center gap-2 bg-accent text-background font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-accent/90 active:scale-95 transition-all mx-auto mb-4"
          >
            Connect API Keys <ArrowRight size={15} />
          </button>
          <p className="text-muted text-xs">
            Read-only keys · Nothing stored · Free to use
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
              <span className="text-background text-[10px] font-black">EL</span>
            </div>
            <span className="text-muted text-xs">© 2026 ExcelLens</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/JohnboscoE/Excellen"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-muted text-xs hover:text-white transition-colors"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.bitget.com/api-doc/common/intro"
              target="_blank"
              rel="noreferrer"
              className="text-muted text-xs hover:text-white transition-colors"
            >
              Bitget API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
