import { Toaster as SonnerToaster } from "sonner";
import {
  CheckCircle,
  XCircle,
  LoaderCircle,
  Info,
  TriangleAlert,
} from "lucide-react";

const Toaster = () => {
  return (
    <SonnerToaster
      position="bottom-right"
      duration={2000}
      icons={{
        success: <CheckCircle className="text-success" />,
        error: <XCircle className="text-error" />,
        loading: <LoaderCircle className="animate-spin text-primary" />,
        info: <Info className="text-info" />,
        warning: <TriangleAlert className="text-warning" />,
      }}
    />
  );
};

export default Toaster;
