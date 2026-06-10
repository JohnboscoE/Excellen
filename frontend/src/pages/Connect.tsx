import React, { useState } from "react";

interface ConnectProps {
  onConnect: (credentials: {
    apiKey: string;
    secretKey: string;
    passphrase: string;
  }) => void;
}

const Connect: React.FC<ConnectProps> = ({ onConnect }) => {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (!apiKey || !secretKey || !passphrase) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/trades/account", {
        headers: {
          "x-api-key": apiKey,
          "x-secret-key": secretKey,
          "x-passphrase": passphrase,
        },
      });
      const data = await res.json();
      if (data.code === "00000") {
        onConnect({ apiKey, secretKey, passphrase });
      } else {
        setError("Invalid credentials. Please check your API keys.");
      }
    } catch (err) {
      setError("Could not connect to ExcelLens backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-accent">Excel</span>
            <span className="text-white">Lens</span>
          </h1>
          <p className="text-muted text-sm mt-2">
            Connect your Bitget account to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-muted text-xs uppercase tracking-wider block mb-1.5">
              API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Bitget API key"
              className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-muted text-xs uppercase tracking-wider block mb-1.5">
              Secret Key
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter your secret key"
              className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-muted text-xs uppercase tracking-wider block mb-1.5">
              Passphrase
            </label>
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter your passphrase"
              className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && <p className="text-negative text-sm">{error}</p>}
          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-accent hover:bg-amber-400 text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connecting..." : "Connect Account"}
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted text-xs">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            onClick={() =>
              onConnect({
                apiKey: "demo",
                secretKey: "demo",
                passphrase: "demo",
              })
            }
            className="w-full bg-surface2 hover:bg-border text-white font-semibold py-3 rounded-lg transition-colors border border-border"
          >
            Try Demo
          </button>

          <p className="text-muted text-xs text-center">
            Your keys are never stored. They are used only for this session.
          </p>
          <p className="text-muted text-xs text-center">
            Your keys are never stored. They are used only for this session.
          </p>
        </div>

        {/* Security note */}
        <div className="mt-4 bg-surface border border-border rounded-xl p-4">
          <p className="text-muted text-xs leading-relaxed">
            <span className="text-accent font-medium">Security tip:</span> Use
            read-only API keys with no withdrawal permissions. ExcelLens only
            reads your trade data — it never places or cancels orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Connect;
