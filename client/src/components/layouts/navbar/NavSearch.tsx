import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import useNav from "../../../hooks/useNav";
import useDebounce from "../../../features/auth/hooks/useDebounce";
import { searchProducts } from "../../../features/shop/api/products.api";
import type { IProduct } from "../../../features/shop/types/products.types";
import { getErrorMessage } from "../../../utils/getErrorMessage";

const NavSearch = () => {
  const { isTransparent } = useNav();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 600);

  const [products, setProducts] = useState<IProduct[]>([]);

  const showDropdown = debouncedSearch.trim() !== "";

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    const fetchProducts = async () => {
      try {
        const data = await searchProducts(debouncedSearch);

        setProducts(data.products);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  return (
    <div ref={wrapperRef} className="relative hidden md:block">
      <Search
        size={16}
        className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
          isTransparent ? "text-black/70" : "text-muted-foreground"
        }`}
      />

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className={`h-9 w-44 rounded-full border border-border bg-card py-1.5 pl-9 pr-4 text-sm text-foreground transition-all duration-300 ease-in-out focus:w-64 focus:border-muted-foreground focus:outline-none ${
          isTransparent
            ? "placeholder:text-black/80"
            : "placeholder:text-muted-foreground"
        }`}
      />

      {showDropdown && (
        <div className="absolute top-12 z-50 w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {products.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No products found
            </div>
          ) : (
            products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product.slug}`}
                onClick={() => {
                  setSearch("");
                }}
                className="flex items-center gap-3 p-3 transition hover:bg-secondary"
              >
                <img
                  src={product.imageCover.url}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />

                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium">{product.name}</p>

                  <p className="text-sm text-muted-foreground">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NavSearch;
