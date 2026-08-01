import { Link } from "react-router-dom";
import { UserRound, LogIn } from "lucide-react";

const SecondaryUi = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <UserRound size={40} className="text-primary" />
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold">
          You're not signed in
        </h1>

        <p className="mt-3 leading-7 text-muted-foreground">
          Sign in to view your orders, wishlist, saved addresses and manage your
          account.
        </p>

        <Link
          to="/auth"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <LogIn size={18} />
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default SecondaryUi;
