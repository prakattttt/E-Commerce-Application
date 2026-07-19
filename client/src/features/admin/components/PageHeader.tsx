import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold">{title}</h1>

        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      {action}
    </div>
  );
};

export default PageHeader;
