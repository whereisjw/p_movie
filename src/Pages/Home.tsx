import React from "react";
import { IGetMovie, getNowPlaying } from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { makeImagePath } from "./../api";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/* makeImagePath */
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;
const OriginalTitle = styled.h3`
  font-size: 20px;
`;
const Title = styled.h2`
  font-size: 70px;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 35px;
  width: 50%;
`;

const Home = () => {
  const { isPending, error, data } = useQuery<IGetMovie>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  return (
    <Wrapper>
      {isPending ? (
        <Loader>로딩중 뀨</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <OriginalTitle>{data?.results[0].original_title}</OriginalTitle>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider />
        </>
      )}
    </Wrapper>
  );
};

export default Home;
