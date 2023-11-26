import React from "react";
import styled from "styled-components";
import { RiMovie2Fill } from "react-icons/ri";
import { getCredits, getSimilar, getTvSimilar, makeImagePath } from "../api";
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
    width: 170px;

    flex-shrink: 0;
    margin-right: 5px;
    border: 2px solid ${(props) => props.theme.white.darker};
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const CreditBox = styled.figure`
  padding-bottom: 20px;
  margin-top: 20px;
  display: flex;

  overflow-x: scroll;
  figcaption {
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 110px;
    height: 40px;
    h3 {
      font-size: 12px;
    }
    h2 {
      font-size: 13px;
    }
  }
  figure {
    width: 110px;
    flex-shrink: 0;
    margin-right: 5px;
    border: 2px solid ${(props) => props.theme.white.darker};
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const TvSimilar = ({ id: string }) => {
  const params = useParams();
  const {
    isPending: SimilarLoading,
    error: SimilarError,
    data: SimilarData,
  } = useQuery({
    queryKey: ["SimilarData"],
    queryFn: () => getTvSimilar(params.id),
  });

  const {
    isPending: creditLoading,
    error: creditError,
    data: creditData,
  } = useQuery({
    queryKey: ["creditData"],
    queryFn: () => getCredits(params.id),
  });

  return (
    <Wrapper>
      <Title>
        <span>
          <RiMovie2Fill />
          출연진
        </span>

        <TitleLine></TitleLine>
      </Title>
      <CreditBox>
        {creditLoading ? (
          <p>로딩중뀨</p>
        ) : (
          creditData.slice(0, 8).map((cast, index) => (
            <div key={cast.id}>
              <figure>
                <img
                  src={
                    cast.profile_path
                      ? makeImagePath(cast.profile_path, "w500")
                      : "/no-image.jpg"
                  }
                  alt=""
                />
              </figure>
              <figcaption>
                <h3>{cast.original_name}</h3>
                <h2>{cast.character ? cast.character : "엑스트라"} 역</h2>
              </figcaption>
            </div>
          ))
        )}
      </CreditBox>
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
          <>
            <figure key={movie.id}>
              <img
                src={
                  movie.poster_path
                    ? makeImagePath(movie.poster_path, "w500")
                    : "/no-image.jpg"
                }
                alt=""
              />
            </figure>
          </>
        ))}
      </FigureBox>
    </Wrapper>
  );
};

export default TvSimilar;
