import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";

import { registerUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

import Error from "../../../components/common/Error";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { fadeUp } from "../../../animations";

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);

      login(response.user);

      toast.success("User registered successfully");

      navigate("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full name */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <label className="mb-2 block text-sm font-medium">Full name</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <User size={18} className="text-muted-foreground" />

          <input
            {...register("name")}
            placeholder="John Doe"
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        {errors.name && <Error message={errors.name.message!} />}
      </motion.div>

      {/* Email */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <label className="mb-2 block text-sm font-medium">Email</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <Mail size={18} className="text-muted-foreground" />

          <input
            {...register("email")}
            placeholder="you@example.com"
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        {errors.email && <Error message={errors.email.message!} />}
      </motion.div>

      {/* Password */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <label className="mb-2 block text-sm font-medium">Password</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <Lock size={18} className="text-muted-foreground" />

          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className="w-full bg-transparent px-3 py-3 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-muted-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && <Error message={errors.password.message!} />}
      </motion.div>

      {/* Submit */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Create account
        </button>
      </motion.div>

      {/* Login link */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="ml-2 font-semibold text-primary hover:underline"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </form>
  );
};

export default RegisterForm;
