import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const Search = () => {
  const keyword = useSearchParams();

  return <div>Search</div>;
};

export default Search;
