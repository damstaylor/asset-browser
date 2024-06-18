import { ChangeEvent } from "react";
import Image from "next/image";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="relative">
      <Image
        src="/search.svg"
        alt="Search"
        width={16}
        height={16}
        className="absolute top-7 left-2"
      />
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={handleChange}
        className="mt-4 py-2 pl-8 border rounded w-full"
      />
      {searchTerm && (
        <div
          onClick={() => setSearchTerm("")}
          className="absolute top-5 right-2 text-lg hover:cursor-pointer"
        >
          x
        </div>
      )}
    </div>
  );
};

export default SearchBar;
