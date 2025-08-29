import { useMemo, useState } from "react";

// petit util de debounce (sans async/await, donc pas de regenerator)
function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const debouncedSetFilter = useMemo(
    () => debounce((val) => setFilter(val || undefined), 250),
    [setFilter]
  );

  return (
    <span>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        value={value || ""}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          debouncedSetFilter(v);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
