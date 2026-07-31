import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizes = {
  sm: {
    container: "h-12 w-12",
    icon: 18,
  },
  md: {
    container: "h-16 w-16",
    icon: 24,
  },
  lg: {
    container: "h-24 w-24",
    icon: 34,
  },
};

const Loader = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoaderProps) => {
  const current = sizes[size];

  const content = (
    <div className="flex flex-col items-center gap-5">
      <div className={`relative ${current.container}`}>
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-[3px] border-primary/20 border-t-primary"
        />

        {/* Pulse Circle */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
          }}
          className="absolute inset-2 flex items-center justify-center rounded-full bg-primary/10"
        >
          <ShoppingBag
            size={current.icon}
            className="text-primary"
            strokeWidth={2.2}
          />
        </motion.div>
      </div>

      <motion.p
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="text-sm font-medium text-muted-foreground"
      >
        {text}
      </motion.p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;