import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  positive?: boolean;
  negative?: boolean;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  positive,
  negative,
  icon,
}) => {
  const valueColor =
    positive ? "text-positive"
    : negative ? "text-negative"
    : "text-accent";

  return (
    <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-muted text-sm font-medium uppercase tracking-wider">
          {title}
        </span>
        {icon && <span className="text-muted">{icon}</span>}
      </div>
      <span className={`text-2xl font-bold ${valueColor}`}>{value}</span>
      {subtitle && <span className="text-muted text-xs">{subtitle}</span>}
    </div>
  );
};

export default StatCard;
