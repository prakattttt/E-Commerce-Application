import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) => {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none transition focus:border-primary"
      />
    </div>
  );
};

export default SearchBar;
