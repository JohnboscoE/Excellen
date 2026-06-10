import React from "react";
import { LogOut, Wifi } from "lucide-react";

interface NavbarProps {
  onDisconnect: () => void;
  isDemo: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onDisconnect, isDemo }) => {
  return (
    <div className="h-14 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
        <span className="text-muted text-xs">
          {isDemo ? "Demo Mode — Mock Data" : "Connected to Bitget"}
        </span>
      </div>
      <button
        onClick={onDisconnect}
        className="flex items-center gap-2 text-muted hover:text-negative transition-colors text-xs font-medium"
      >
        <LogOut size={14} />
        Disconnect
      </button>
    </div>
  );
};

export default Navbar;
