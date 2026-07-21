import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeletePopupProps {
  open: boolean;

  itemName: string;

  itemType?: string;

  loading?: boolean;

  onClose: () => void;

  onDelete: () => void;
}

const DeletePopup = ({
  open,
  itemName,
  itemType = "item",
  loading = false,
  onClose,
  onDelete,
}: DeletePopupProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card p-7 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-lg p-2 transition hover:bg-secondary"
            >
              <X size={18} />
            </button>

            {/* Warning Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
              <AlertTriangle size={30} />
            </div>

            {/* Title */}
            <h2 className="mt-5 text-center font-display text-2xl font-bold">
              Delete {itemType}
            </h2>

            {/* Description */}
            <p className="mt-3 text-center text-muted-foreground">
              Are you sure you want to delete
            </p>

            <p className="mt-1 text-center font-semibold">"{itemName}"</p>

            <p className="mt-3 text-center text-sm text-error">
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl border border-border py-3 font-medium transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={onDelete}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-error py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={18} />

                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeletePopup;
