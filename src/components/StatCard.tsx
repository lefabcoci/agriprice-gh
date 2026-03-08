import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
}

const StatCard = ({ title, value, icon: Icon, subtitle }: StatCardProps) => (
  <div className="rounded-xl border border-border bg-card p-5 text-center card-hover animate-fade-in">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <p className="text-3xl font-serif font-bold text-foreground">{value}</p>
    <p className="mt-1 text-sm font-semibold text-foreground">{title}</p>
    {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
  </div>
);

export default StatCard;
