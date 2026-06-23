import React from "react";
import { LayoutDashboard, ArrowLeftRight, BarChart2, Cpu } from "lucide-react";

interface SidebarProps {
  active: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onNavigate }) => {
  // Store the component definitions directly instead of instantiated elements
  const links = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { id: "trades", label: "Trades", icon: ArrowLeftRight },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "ai", label: "AI Insights", icon: Cpu },
  ];

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="h-screen w-56 bg-surface border-r border-border flex-col fixed left-0 top-0 z-40 hidden md:flex">
        <div className="p-6 border-b border-border">
          <span className="text-accent font-bold text-xl tracking-tight">
            Excel<span className="text-white">Lens</span>
          </span>
          <p className="text-muted text-xs mt-1">Execution Analyzer</p>
        </div>
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full ${
                  active === link.id ?
                    "bg-accent/10 text-accent border border-accent/20"
                  : "text-muted hover:text-white hover:bg-surface2"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-muted text-xs">Powered by Bitget API</p>
        </div>
      </div>

      {/* ── Mobile bottom nav ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border flex md:hidden">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors ${
                active === link.id ? "text-accent" : "text-muted"
              }`}
            >
              <Icon size={20} />
              {link.label}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
