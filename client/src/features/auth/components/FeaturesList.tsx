import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/index";
import { features } from "../data/features";

const FeaturesList = () => {
  return (
    <motion.ul
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
      className="relative z-10 space-y-4"
    >
      {features.map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="flex items-center gap-3 text-sm text-white/80"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Icon size={18} />
          </span>

          {text}
        </li>
      ))}
    </motion.ul>
  );
};

export default FeaturesList;
