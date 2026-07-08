import BrandPanel from "../features/components/BrandPanel";
import AuthForm from "../features/components/AuthForm";

const AuthPage = () => {
  return (
    <section className="h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-background lg:grid lg:grid-cols-2">
      <BrandPanel />

      <AuthForm />
    </section>
  );
};

export default AuthPage;
