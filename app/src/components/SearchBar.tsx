interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      data-testid="search-input"
      className="search-input"
      type="text"
      placeholder="Search tasks by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
