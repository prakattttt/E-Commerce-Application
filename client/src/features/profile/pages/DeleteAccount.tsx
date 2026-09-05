import { ArrowLeft, AlertTriangle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";

import {
  deleteAccountSchema,
  type DeleteAccountFormValues,
} from "../types/schemas/profile.schema";

import useAuth from "../../auth/hooks/useAuth";

import { generateCode } from "../../../utils/generateCode";
import { getErrorMessage } from "../../../utils/getErrorMessage";

import Confirmation from "../components/Confirmation";
import { deleteAccount } from "../api/profile.api";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [confirmationCode, setConfirmationCode] = useState("");

  const [enteredCode, setEnteredCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleDeleteClick = () => {
    const code = generateCode();

    setConfirmationCode(code);
    setEnteredCode("");
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    if (isSubmitting) return;

    setShowConfirmation(false);
    setEnteredCode("");
  };

  const onSubmit = async (data: DeleteAccountFormValues) => {
    if (enteredCode !== confirmationCode) {
      toast.error("Confirmation code does not match.");
      return;
    }

    try {
      const response = await deleteAccount({
        password: data.password,
      });

      toast.success(response.message || "Account deleted successfully");

      setShowConfirmation(false);

      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10"
      >
        {/* Back */}
        <Link
          to="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Back to Settings
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-error/10 text-error">
            <Trash2 size={23} />
          </div>

          <h1 className="font-display text-3xl font-bold">Delete Account</h1>

          <p className="mt-2 text-muted-foreground">
            Permanently remove your ShopSphere account and its associated data.
          </p>
        </div>

        {/* Content */}
        <div className="rounded-3xl border border-error/20 bg-card p-6 shadow-sm sm:p-8">
          {/* Warning */}
          <div className="rounded-2xl border border-error/20 bg-error/5 p-5">
            <div className="flex gap-4">
              <AlertTriangle size={22} className="mt-0.5 shrink-0 text-error" />

              <div>
                <h2 className="font-semibold text-error">
                  This action cannot be undone
                </h2>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Deleting your account will permanently remove your profile and
                  account data. Your cart will also be removed.
                </p>
              </div>
            </div>
          </div>

          {/* Password form */}
          <div className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                Current Password
              </label>

              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter your current password"
                className={`w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                  errors.password ? "border-error" : "border-border"
                }`}
              />

              {errors.password && (
                <p className="mt-1.5 text-xs text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row">
              <Link
                to="/profile/settings"
                className="rounded-xl border border-border px-5 py-3 text-center text-sm font-semibold transition hover:bg-secondary"
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={handleSubmit(handleDeleteClick)}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-error px-5 py-3 text-sm font-semibold text-white transition hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Confirmation popup */}
      <Confirmation
        open={showConfirmation}
        confirmationCode={confirmationCode}
        enteredCode={enteredCode}
        loading={isSubmitting}
        onCodeChange={setEnteredCode}
        onConfirm={handleSubmit(onSubmit)}
        onClose={handleCloseConfirmation}
      />
    </>
  );
};

export default DeleteAccount;
