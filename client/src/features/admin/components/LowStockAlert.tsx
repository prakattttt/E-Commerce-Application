import { AlertTriangle } from "lucide-react";

const LowStockAlert = () => {
  return (
    <div className="mt-8 rounded-2xl bg-secondary p-5">
      <div className="mb-2 flex items-center gap-2">
        <AlertTriangle size={18} className="text-warning" />

        <h3 className="font-semibold">Low Stock Alert</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        All products currently have sufficient stock.
      </p>
    </div>
  );
};

export default LowStockAlert;
