import { Link } from "react-router-dom";
import { Save } from "lucide-react";

interface FormActionsProps {
  cancelTo: string;
  onSave?: () => void;
  saveLabel?: string;
}

const FormActions = ({ cancelTo, onSave, saveLabel = "Save" }: FormActionsProps) => {
  return (
    <div className="flex flex-col-reverse gap-4 border-t border-border pt-8 sm:flex-row sm:justify-end">
      <Link
        to={cancelTo}
        className="rounded-xl border border-border px-8 py-3 text-center font-medium transition hover:bg-secondary"
      >
        Cancel
      </Link>

      <button
        type="button"
        onClick={onSave}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-medium text-primary-foreground transition hover:opacity-90"
      >
        <Save size={18} />
        {saveLabel}
      </button>
    </div>
  );
};

export default FormActions;
