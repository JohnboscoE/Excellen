import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connect";
import LandingPage from "./pages/LandingPage";
import AIInsights from "./pages/AIInsights";
import Trades from "./pages/Trades";
import Analytics from "./pages/Analytics";

interface Credentials {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

type Screen = "landing" | "connect" | "app";

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [activePage, setActivePage] = useState("dashboard");

  const isDemo = credentials?.apiKey === "demo";

  // ── Screen 1: Landing ──────────────────────────────────────────────────
  if (screen === "landing") {
    return (
      <LandingPage
        onConnect={() => setScreen("connect")}
        onDemo={() => {
          setCredentials({
            apiKey: "demo",
            secretKey: "demo",
            passphrase: "demo",
          });
          setScreen("app");
        }}
      />
    );
  }

  // ── Screen 2: Connect (API key form) ───────────────────────────────────
  if (screen === "connect" || !credentials) {
    return (
      <Connect
        onConnect={(creds) => {
          setCredentials(creds);
          setScreen("app");
        }}
      />
    );
  }

  // ── Screen 3: App (dashboard, trades, analytics, ai) ──────────────────
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard credentials={credentials} />;
      case "trades":
        return <Trades credentials={credentials} />;
      case "analytics":
        return <Analytics credentials={credentials} />;
      case "ai":
        return <AIInsights credentials={credentials} />;
      default:
        return (
          <div className="flex items-center justify-center h-screen">
            <p className="text-muted">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex bg-background min-h-screen overflow-x-hidden">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <div className="ml-0 md:ml-56 flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Navbar
          onDisconnect={() => {
            setCredentials(null);
            setScreen("landing");
            setActivePage("dashboard");
          }}
          isDemo={isDemo}
        />
        <main className="flex-1 min-w-0">{renderPage()}</main>
      </div>
    </div>
  );
};

export default App;
