import { AlertTriangle, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ConfirmationProps {
  open: boolean;
  confirmationCode: string;
  enteredCode: string;
  loading?: boolean;
  onCodeChange: (code: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const Confirmation = ({
  open,
  confirmationCode,
  enteredCode,
  loading = false,
  onCodeChange,
  onConfirm,
  onClose,
}: ConfirmationProps) => {
  const isCodeValid = enteredCode === confirmationCode;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !loading) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground disabled:opacity-50"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error/10 text-error">
              <AlertTriangle size={24} />
            </div>

            {/* Heading */}
            <h2 className="mt-5 font-display text-2xl font-bold">
              Confirm account deletion
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This is your final confirmation. Enter the code below to
              permanently delete your account.
            </p>

            {/* Confirmation code */}
            <div className="mt-6 rounded-2xl border border-error/20 bg-error/5 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Confirmation code
              </p>

              <p className="mt-2 select-none font-mono text-2xl font-bold tracking-[0.3em] text-error">
                {confirmationCode}
              </p>
            </div>

            {/* Input */}
            <div className="mt-6">
              <label
                htmlFor="confirmationCode"
                className="mb-2 block text-sm font-semibold"
              >
                Enter the code
              </label>

              <input
                id="confirmationCode"
                type="text"
                value={enteredCode}
                onChange={(event) =>
                  onCodeChange(event.target.value.toUpperCase())
                }
                placeholder="Enter confirmation code"
                autoComplete="off"
                spellCheck={false}
                disabled={loading}
                className={`w-full rounded-xl border bg-background px-4 py-3 font-mono text-sm uppercase tracking-widest outline-none transition focus:border-error focus:ring-2 focus:ring-error/10 ${
                  enteredCode && !isCodeValid ? "border-error" : "border-border"
                }`}
              />

              {enteredCode && !isCodeValid && (
                <p className="mt-1.5 text-xs text-error">
                  The confirmation code does not match.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loading || !isCodeValid}
                onClick={onConfirm}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-error px-5 py-3 text-sm font-semibold text-white transition hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />

                {loading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Confirmation;
