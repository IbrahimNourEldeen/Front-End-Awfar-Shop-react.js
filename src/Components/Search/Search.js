import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <input
      type="text"
      placeholder="Search for products..."
      value={searchTerm}
      onChange={handleInputChange}
      className="form-control rounded-pill"
    />
  );
};

export default Search;
