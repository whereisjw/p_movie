import React from "react";
import styled from "styled-components";
import { MdMovieCreation } from "react-icons/md";

const Cate = styled.div`
  margin: 0 auto;
  width: 80%;
  font-size: 24px;
  display: flex;
  align-items: center;
  span {
    font-weight: bold;
  }
`;

const Category = () => {
  return (
    <Cate>
      <MdMovieCreation />
      <span>현재 인기 영화</span>
    </Cate>
  );
};

export default Category;
