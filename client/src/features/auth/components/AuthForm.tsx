import { motion } from "framer-motion";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { fadeUp, scaleIn } from "../../../animations";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto px-6 py-10">
      <motion.div
        key={mode}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl lg:border-0 lg:bg-transparent lg:shadow-none"
      >
        {/* Header */}
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

        <form className="mt-8 space-y-5">
          {/* Full Name */}
          {mode === "register" && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <label className="mb-2 block text-sm font-medium">
                Full name
              </label>

              <div className="flex items-center rounded-xl border border-border bg-background px-4 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                <User size={18} className="text-muted-foreground" />

                <input
                  placeholder="John Doe"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* Email */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <label className="mb-2 block text-sm font-medium">Email</label>

            <div className="flex items-center rounded-xl border border-border bg-background px-4 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
              <Mail size={18} className="text-muted-foreground" />

              <input
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <label className="mb-2 block text-sm font-medium">Password</label>

            <div className="flex items-center rounded-xl border border-border bg-background px-4 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
              <Lock size={18} className="text-muted-foreground" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          {/* Forgot password */}
          {mode === "login" && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-right"
            >
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </button>
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90"
          >
            {mode === "login" ? "Sign in" : "Create account"}
          </motion.button>
        </form>

        {/* Switch mode */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="ml-2 font-semibold text-primary hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
