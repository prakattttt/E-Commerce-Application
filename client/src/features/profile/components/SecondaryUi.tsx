import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LogIn, UserRound } from "lucide-react";

import { fadeUp, scaleIn } from "../../../animations";

const SecondaryUi = () => {
  return (
    <section className="flex min-h-[calc(100vh)] items-center px-6 py-16">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <UserRound size={16} />
            Account required
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Sign in to continue
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Sign in to access this page and get the most out of your ShopSphere
            account.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/login"
              className="btn-primary inline-flex items-center gap-2"
            >
              <LogIn size={18} />
              Sign In
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/shop"
              className="text-sm font-semibold text-muted-foreground transition-colors border-2 border-muted p-3 rounded-xl hover:text-primary"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create one
            </Link>
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="hidden justify-center lg:flex"
        >
          <div className="flex h-72 w-72 items-center justify-center rounded-full bg-secondary">
            <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-card shadow-sm">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
                <UserRound size={46} className="text-primary" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecondaryUi;
