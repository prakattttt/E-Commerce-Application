import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { fadeUp } from "../../../animations";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  index: number;
}

const StatCard = ({ title, value, icon: Icon, color, index }: StatCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={index}
      className="rounded-3xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className={`rounded-2xl bg-secondary p-4 ${color}`}>
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
