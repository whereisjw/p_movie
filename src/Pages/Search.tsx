import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const Search = () => {
  const { search } = useLocation();
  const keyword = useSearchParams();
  console.log(search.split("=")[1]);

  return <div>Search</div>;
};

export default Search;
