import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

import { fadeUp, scaleIn } from "../animations";

const ErrorPage = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary blur-3xl opacity-70" />
      </div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-xl rounded-4xl border border-border bg-card/80 p-10 text-center shadow-2xl backdrop-blur-xl"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-display text-8xl font-black text-primary"
        >
          404
        </motion.p>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-4 font-display text-4xl font-bold"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-4 max-w-md text-muted-foreground"
        >
          Sorry, the page you're looking for doesn't exist, has been moved, or
          the URL may be incorrect.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium transition hover:bg-secondary"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Search size={16} />
          Looking for something? Try navigating from the homepage.
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ErrorPage;
