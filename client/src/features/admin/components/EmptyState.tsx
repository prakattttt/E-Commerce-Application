interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card py-16 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyState;
