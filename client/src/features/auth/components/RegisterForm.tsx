import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { registerUser } from "../api/auth.api";
import { User, Mail, Lock } from "lucide-react";
import Error from "../../../components/common/Error";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import useAuth from "../hooks/useAuth";

interface Props {
  switchMode: () => void;
}

const RegisterForm = ({ switchMode }: Props) => {
  const { setUser } = useAuth();

  // use react0hook-form together with zod to handle form and validation
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
      setUser(response);
      toast.success("User registered successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Full name</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4">
          <User size={18} />

          <input
            {...register("name")}
            placeholder="John Doe"
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        {/* custom error encountered through the zod validation */}
        {errors.name && (
          <p className="text-error text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4">
          <Mail size={18} />

          <input
            {...register("email")}
            placeholder="you@example.com"
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        {errors.email && <Error message={errors.email.message!} />}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>

        <div className="flex items-center rounded-xl border border-border bg-background px-4">
          <Lock size={18} />

          <input
            type="password"
            {...register("password")}
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        {errors.password && <Error message={errors.password.message!} />}
      </div>

      <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground">
        Create account
      </button>

      <p className="text-center text-sm">
        Already have an account?
        <button
          type="button"
          onClick={switchMode}
          className="ml-2 text-primary font-semibold"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
