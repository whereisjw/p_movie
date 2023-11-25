import React from "react";
import styled from "styled-components";
import { RiMovie2Fill } from "react-icons/ri";
import { getSimilar, makeImagePath } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  padding: 20px;
  font-size: 18px;
`;

const TitleLine = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.white.darker};
  flex: 1;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
    font-weight: bold;
    font-size: 20px;
  }
  span:first-child {
    padding-right: 2px;
  }
  span:nth-child(2) {
    font-size: 15px;
  }
`;

const FigureBox = styled.figure`
  padding-bottom: 20px;
  margin-top: 20px;
  display: flex;
  width: 100%;
  overflow-x: scroll;
  figure {
    width: 250px;
    height: 140px;
    flex-shrink: 0;
    margin-right: 5px;
    border: 2px solid ${(props) => props.theme.white.darker};
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Similar = ({ id: string }) => {
  const params = useParams();
  const {
    isPending: SimilarLoading,
    error: SimilarError,
    data: SimilarData,
  } = useQuery({
    queryKey: ["SimilarData"],
    queryFn: () => getSimilar(params.id),
  });

  return (
    <Wrapper>
      <Title>
        <span>
          <RiMovie2Fill />
          유사한영화들
        </span>
        <span>({SimilarData?.results.length})</span>
        <TitleLine></TitleLine>
      </Title>
      <FigureBox>
        {SimilarData?.results.map((movie) => (
          <figure key={movie.id}>
            <img
              src={
                movie.backdrop_path
                  ? makeImagePath(movie.backdrop_path, "w500")
                  : "/no-image.jpg"
              }
              alt=""
            />
          </figure>
        ))}
      </FigureBox>
    </Wrapper>
  );
};

export default Similar;
