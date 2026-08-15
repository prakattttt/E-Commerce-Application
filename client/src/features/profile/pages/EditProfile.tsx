import { ArrowLeft, Save, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";
import useAuth from "../../auth/hooks/useAuth";
import {
  editProfileSchema,
  type EditProfileFormValues,
} from "../types/schemas/profile.schema";
import { updateProfile } from "../api/profile.api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

const EditProfile = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      const response = await updateProfile({
        name: data.name,
        email: data.email,
      });

      if (user) {
        setUser({
          ...user,
          name: data.name,
          email: data.email,
        });
      }

      navigate(-1);

      toast.success(response.message);
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
          <UserRound size={23} />
        </div>

        <h1 className="font-display text-3xl font-bold">Edit Profile</h1>

        <p className="mt-2 text-muted-foreground">
          Update your personal information.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              {...register("name")}
              className={`w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-start gap-3 border-t border-border pt-6">
            <Link
              to="/profile"
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

              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default EditProfile;
