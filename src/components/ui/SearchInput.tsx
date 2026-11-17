import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = ''
}: SearchInputProps) {
  return (
    <label
      className={`group bg-surface border-border hover:border-border-strong focus-within:border-primary focus-within:ring-primary/15 flex h-11 w-full cursor-text items-center gap-2.5 rounded-xl border px-3.5 shadow-xs transition-all duration-200 focus-within:ring-4 ${className}`}
    >
      <Search
        className="text-faint group-focus-within:text-primary h-4 w-4 shrink-0 transition-colors"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
        className="text-text placeholder:text-faint w-full min-w-0 bg-transparent text-sm outline-none focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="text-faint hover:bg-surface-2 hover:text-text flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </label>
  );
}
