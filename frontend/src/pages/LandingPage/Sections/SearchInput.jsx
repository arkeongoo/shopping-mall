import React from "react";

const SearchInput = ({ searchTerm, onSearch }) => {
  return (
    <input
      className="p-2 border border-gray-300 rounded-md"
      type="search"
      placeholder="Search by typing..."
      onChange={onSearch}
      value={searchTerm}
    />
  );
};

export default SearchInput;
