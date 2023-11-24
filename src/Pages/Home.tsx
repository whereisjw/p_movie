import React, { useState, useEffect } from "react";
import {
  IGetMovie,
  getNowPlaying,
  getPopular,
  getTop_rated,
  getVideos,
} from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { makeImagePath } from "./../api";
import Slider from "../Components/Slider";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate, Outlet } from "react-router-dom";
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
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;
const OriginalTitle = styled.h3`
  font-size: 16;
  margin: 7px 10px;
`;
const Title = styled.h2`
  font-size: 70px;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  width: 50%;
  line-height: 150%;
`;

const PlayButton = styled(motion.button)`
  color: ${(props) => props.theme.white.lighter};
  width: 100px;
  height: 40px;
  margin-top: 20px;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.red};
  }
`;
const Home = () => {
  const {
    isPending: nowPending,
    error: nowErr,
    data: nowData,
  } = useQuery<IGetMovie>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  const {
    isPending: popPending,
    error: popErr,
    data: popData,
  } = useQuery<IGetMovie>({
    queryKey: ["popular"],
    queryFn: getPopular,
  });
  const {
    isPending: topPending,
    error: topErr,
    data: topData,
  } = useQuery<IGetMovie>({
    queryKey: ["top_rated"],
    queryFn: getTop_rated,
  });

  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:id");
  const overLayCLick = () => navigate("/");
  const { scrollY, scrollYProgress } = useScroll();
  /*  const clickMovie =
    bigMovieMatch?.params.id &&
    nowData?.results.find((movie) => movie.id + "" == bigMovieMatch.params.id); */

  return (
    <>
      <Wrapper>
        {popPending ? (
          <Loader>로딩중 뀨</Loader>
        ) : (
          <>
            <div>
              <Banner
                bgPhoto={makeImagePath(
                  popData?.results[0].backdrop_path || ""
                )}>
                <OriginalTitle>
                  {popData?.results[0].original_title}
                </OriginalTitle>
                <Title>{popData?.results[0].title}</Title>
                <Overview>{popData?.results[0].overview}</Overview>
                <PlayButton>재생버튼</PlayButton>
              </Banner>

              <Slider data={popData} />
              <Slider data={topData} />
              <Slider data={nowData} />

              <AnimatePresence>{bigMovieMatch ? <></> : null}</AnimatePresence>
            </div>
            <Outlet />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
