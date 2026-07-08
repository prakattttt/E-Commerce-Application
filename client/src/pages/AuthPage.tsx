import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useState } from "react";
import { fadeUp, scaleIn } from "../animations/index";

const features = [
  {
    icon: Truck,
    text: "Free shipping on every order over $50",
  },
  {
    icon: ShieldCheck,
    text: "Buyer protection on every purchase, no exceptions",
  },
  {
    icon: Star,
    text: "Rated 4.9 by over 20,000 shoppers",
  },
];

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-background lg:grid lg:grid-cols-2">
      {/* LEFT PANEL */}
      <div className="relative hidden h-full overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 lg:flex lg:flex-col lg:justify-between lg:p-12 text-primary-foreground">
        <div className="pointer-events-none absolute -left-20 -top-20 h-90 w-90 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -right-20 h-90 w-90 rounded-full bg-fuchsia-300/20 blur-3xl" />

        {/* Brand */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold backdrop-blur">
            S
          </div>

          <span className="font-head text-xl font-semibold">
            Shop<span className="text-yellow-300">Sphere</span>
          </span>
        </motion.div>

        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="relative z-10 max-w-md"
        >
          <h1 className="font-head text-5xl font-bold leading-tight">
            Everything you need,
            <br />
            nothing you don't.
          </h1>

          <p className="mt-5 leading-7 text-white/75">
            One account gets you tracked orders, saved addresses, and a cart
            that remembers everything you love.
          </p>
        </motion.div>

        {/* Features */}
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

        {/* Review */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mt-5 relative z-10 rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur"
        >
          <p className="text-sm">
            "Checkout took me under a minute, and tracking actually works."
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300 text-xs font-bold text-black">
              PN
            </div>

            <span className="text-xs text-white/70">
              Priya N · Verified buyer
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL */}
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
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            {mode === "login" && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="text-right"
              >
                <button className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </button>
              </motion.div>
            )}

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
    </section>
  );
};

export default AuthPage;
