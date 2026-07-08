import { motion } from "framer-motion";
import { scaleIn } from "../../animations/index";

const Testimonial = () => {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative z-10 mt-5 rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur"
    >
      <p className="text-sm">
        "Checkout took me under a minute, and tracking actually works."
      </p>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300 text-xs font-bold text-black">
          PN
        </div>

        <span className="text-xs text-white/70">Priya N · Verified buyer</span>
      </div>
    </motion.div>
  );
};

export default Testimonial;
