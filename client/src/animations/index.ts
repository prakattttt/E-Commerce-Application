import type { Variants } from "framer-motion";

export const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};