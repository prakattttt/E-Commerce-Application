import { motion } from "framer-motion";

import BrandPanel from "../features/auth/components/BrandPanel";
import LoginForm from "../features/auth/components/LoginForm";
import { fadeUp, scaleIn } from "../animations";

const LoginPage = () => {
  return (
    <section className="pt-10 grid min-h-screen lg:grid-cols-2">
      {/* Left side */}
      <BrandPanel />

      {/* Right side */}
      <div className="flex h-full items-center justify-center overflow-y-auto px-6 py-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl lg:border-0 lg:bg-transparent lg:shadow-none"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <h2 className="font-head text-3xl font-bold">Welcome back</h2>

            <p className="mt-2 text-muted-foreground">
              Sign in to continue shopping.
            </p>
          </motion.div>

          <div className="mt-8">
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginPage;
