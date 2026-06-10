import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connect";
import AIInsights from "./pages/AIInsights";
import Trades from "./pages/Trades";
import Analytics from "./pages/Analytics";

interface Credentials {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

const App: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [activePage, setActivePage] = useState("dashboard");

  const isDemo = credentials?.apiKey === "demo";

  if (!credentials) {
    return <Connect onConnect={setCredentials} />;
  }

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
    <div className="flex bg-background min-h-screen">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <div className="ml-56 flex-1 flex flex-col">
        <Navbar
          onDisconnect={() => {
            setCredentials(null);
            setActivePage("dashboard");
          }}
          isDemo={isDemo}
        />
        <main className="flex-1">{renderPage()}</main>
      </div>
    </div>
  );
};

export default App;
