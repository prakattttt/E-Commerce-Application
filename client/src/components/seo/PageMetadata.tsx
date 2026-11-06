import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

const PageMetadata = ({ title, description, children }: Props) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </>
);

export default PageMetadata;
