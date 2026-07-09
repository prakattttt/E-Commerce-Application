import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

interface Props {
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const commonClasses =
  "group ml-4 inline-flex h-9 items-center justify-center gap-2 rounded-xl lg:border-2 lg:border-primary/50 border-border bg-card/80 lg:px-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 active:scale-95";

const AuthButton = ({ isAuthenticated, logout }: Props) => {
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

  return (
    <button onClick={logout} className={commonClasses}>
      <LogOut
        size={18}
        className="transition-transform duration-300 group-hover:-rotate-12"
      />

      <span className="hidden font-medium lg:inline">Log Out</span>
    </button>
  );
};

export default AuthButton;
