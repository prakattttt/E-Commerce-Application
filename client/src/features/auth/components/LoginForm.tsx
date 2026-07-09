import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { loginUser } from "../api/auth.api";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { fadeUp } from "../../../animations";
import { motion } from "framer-motion";
import Error from "../../../components/common/Error";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";

interface Props {
  switchMode: () => void;
}

const LoginForm = ({ switchMode }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data);
      toast.success("User registered successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
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

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <label className="mb-2 block text-sm font-medium">Password</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4">
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
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && <Error message={errors.password.message!} />}
      </motion.div>

      <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground">
        Sign in
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?
        <button
          type="button"
          onClick={switchMode}
          className="ml-2 font-semibold text-primary hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
