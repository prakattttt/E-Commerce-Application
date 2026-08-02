import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { fadeUp } from "../../../animations";
import { faqData } from "../demo/data";

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {faqData.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={item.question}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className={`overflow-hidden rounded-3xl border bg-card transition-all duration-300 ${
              isOpen
                ? "border-primary/30 shadow-xl shadow-primary/5"
                : "border-border hover:border-primary/20 hover:shadow-md"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between gap-5 px-7 py-6 text-left transition-colors hover:bg-secondary/40"
            >
              <h3 className="text-lg font-semibold leading-7">
                {item.question}
              </h3>

              <motion.div
                animate={{
                  rotate: isOpen ? 180 : 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  isOpen
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-primary"
                }`}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border bg-secondary/20 px-7 py-6">
                    <p className="leading-8 text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FAQComponent;
