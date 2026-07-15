import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { registerUser } from "../api/auth.api";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Error from "../../../components/common/Error";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { fadeUp } from "../../../animations";

interface Props {
  switchMode: () => void;
}

const RegisterForm = ({ switchMode }: Props) => {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  // use react-hook-form together with zod to handle form and validation
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
      login(response);
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
        <label className="mb-2 block text-sm font-medium">Full name</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4">
          <User size={18} className="text-muted-foreground" />

          <input
            {...register("name")}
            placeholder="John Doe"
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        {errors.name && <Error message={errors.name.message!} />}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <label className="mb-2 block text-sm font-medium">Email</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4">
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
        custom={3}
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

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground">
          Create account
        </button>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <p className="text-center text-sm">
          Already have an account?
          <button
            type="button"
            onClick={switchMode}
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
