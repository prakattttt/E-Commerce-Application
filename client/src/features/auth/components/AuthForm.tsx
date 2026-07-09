import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "../../../animations";

import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto px-6 py-10">
      <motion.div
        key={mode}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-x lg:border- lg:bg-transparen lg:shadow-none"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="font-head text-3xl font-bold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          <p className="mt-2 text-muted-foreground">
            {mode === "login"
              ? "Sign in to continue shopping."
              : "Join thousands of happy shoppers."}
          </p>
        </motion.div>

        <div className="mt-8">
          {mode === "login" ? (
            <LoginForm switchMode={() => setMode("register")} />
          ) : (
            <RegisterForm switchMode={() => setMode("login")} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
