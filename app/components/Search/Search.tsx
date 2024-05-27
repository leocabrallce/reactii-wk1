"use client";
import { useState, useEffect, useRef } from "react";

type Props = {
  search: string;
  onSearch: (search: string) => void;
};

function Search({ search, onSearch }: Props) {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [inputValue, setInputValue] = useState<string>(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setInputValue(newValue);

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        onSearch(newValue);
      }, 500),
    );
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.metaKey && e.key === "k") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          ref={inputRef}
          type="search"
          name="search"
          id="search"
          value={inputValue}
          onChange={handleSearch}
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
}

export default Search;
