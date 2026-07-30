import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductBreadcrumbProps {
  category: {
    name: string;
    slug: string;
  };

  productName: string;
}

const ProductBreadcrumb = ({
  category,
  productName,
}: ProductBreadcrumbProps) => {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <Link
        to="/"
        className="transition-colors hover:text-primary"
      >
        Home
      </Link>

      <ChevronRight size={15} />

      <Link
        to="/products"
        className="transition-colors hover:text-primary"
      >
        Products
      </Link>

      <ChevronRight size={15} />

      <Link
        to={`/categories/${category.slug}`}
        className="transition-colors hover:text-primary"
      >
        {category.name}
      </Link>

      <ChevronRight size={15} />

      <span className="font-medium text-foreground">
        {productName}
      </span>
    </nav>
  );
};

export default ProductBreadcrumb;