import { ArrowLeft, Lock, Save } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../types/schemas/profile.schema";
import { changePassword } from "../api/profile.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const response = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success(response.message);

      reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl px-6 py-10"
    >
      <Link
        to="/profile"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft size={17} />
        Back to Settings
      </Link>

      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Lock size={23} />
        </div>

        <h1 className="font-display text-3xl font-bold">Change Password</h1>

        <p className="mt-2 text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm font-semibold"
            >
              Current Password
            </label>

            <input
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
              className={`w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.currentPassword ? "border-destructive" : "border-border"
              }`}
            />

            {errors.currentPassword && (
              <p className="mt-1.5 text-xs text-error">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-semibold"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              {...register("newPassword")}
              className={`w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.newPassword ? "border-destructive" : "border-border"
              }`}
            />

            {errors.newPassword && (
              <p className="mt-1.5 text-xs text-error">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.confirmPassword ? "border-error" : "border-border"
              }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-error">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
            Use at least 8 characters. A combination of letters, numbers, and
            symbols is recommended.
          </div>

          <div className="flex justify-start gap-3 border-t border-border pt-6">
            <Link
              to="/profile/settings"
              className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Save size={17} />
              {isSubmitting ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default ChangePassword;
