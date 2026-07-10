import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { toast } from "sonner";
import useNav from "../../../hooks/useNav";

interface Props {
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}
const AuthButton = ({ isAuthenticated, logout }: Props) => {
  const { isTransparent } = useNav();

  const commonClasses = `group ml-3 p-2 inline-flex h-9 items-center justify-center gap-2 rounded-xl lg:border-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
    isTransparent
      ? "border-white/20 text-white hover:bg-white/20"
      : "border-primary/50 bg-card/80 shadow-md hover:border-primary/40 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
  }`;

  if (!isAuthenticated) {
    return (
      <Link to="/auth" className={commonClasses}>
        <User
          size={18}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        <span className="hidden font-medium lg:inline">Sign In</span>
      </Link>
    );
  }

  const handleLogout = async () => {
    await logout();
    toast.success("User logged out successfully")
  };

  return (
    <button onClick={handleLogout} className={commonClasses}>
      <LogOut
        size={18}
        className="transition-transform duration-300 group-hover:-rotate-12"
      />

      <span className="hidden font-medium lg:inline">Log Out</span>
    </button>
  );
};

export default AuthButton;
