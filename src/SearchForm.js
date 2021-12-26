import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { query, handleChangeQuery } = useGlobalContext();
  return (
    <form className="search-form">
      <h2>search hacker news</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={handleChangeQuery}
      />
    </form>
  );
};

export default SearchForm;
