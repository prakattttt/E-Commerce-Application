import { Search } from "lucide-react";

import type { ICategory } from "../../shop/types/categories.types";

interface ProductFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: ICategory[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const ProductFilterBar = ({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFilterBarProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          placeholder="Search products..."
          onChange={(e) => onSearchChange(e.target.value)}
          value={search}
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
      >
        {categories.map((category) => (
          <option key={category._id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilterBar;
