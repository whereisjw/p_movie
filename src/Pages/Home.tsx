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
import { MdLocalMovies } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import Category from "../Components/Category";
import { MdMovieCreation, MdMovieEdit } from "react-icons/md";
import { BiSolidCameraMovie } from "react-icons/bi";
import { relative } from "path";
const Wrapper = styled(motion.div)`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
  overflow-x: hidden;
  background-image: url("./line-pattern.png");
  background-size: 17px;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/* makeImagePath */
const Banner = styled.div`
  position: relative;
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
`;
const OriginalTitle = styled(motion.h3)`
  font-size: 16;
  margin: 7px 10px;
  z-index: 1;
`;
const Title = styled(motion.h2)`
  font-size: 70px;
  margin-bottom: 10px;
  z-index: 1;
`;

const Overview = styled(motion.p)`
  font-size: 14px;
  width: 50%;
  line-height: 150%;
  z-index: 1;
`;

const ButtonBox = styled.div`
  display: flex;
  div {
    margin-right: 20px;
  }
`;

const PlayButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.white.darker};
  color: ${(props) => props.theme.white.lighter};
  width: 100px;
  height: 40px;
  margin-top: 20px;
  background: transparent;
  z-index: 1;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  &:hover {
    color: ${(props) => props.theme.red};
    border: 1px solid ${(props) => props.theme.red};
    scale: 1.2;
  }
`;

const Wrap = styled.div`
  position: relative;
`;

const BannerFig = styled(motion.div)`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid black;
  position: absolute;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;
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

const rowVars = {
  //window.innerWidth를 사용 이게 픽셀로 주는것보다 더 좋을듯
  start: {
    x: window.innerWidth,
    filter: "brightness(200%)",
  },
  end: {
    x: 0,
    filter: "brightness(40%)",

    transition: { duration: 1 },
  },
  exit: {
    x: window.innerWidth,
    filter: "brightness(100%)",
  },
};

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

  const [index, setIndex] = useState(0);
  const handleIndexClick = () => {
    setIndex((index) => (index > 2 ? 0 : index + 1));
  };

  let HomeLoading = topPending || popPending || nowPending;
  return (
    <>
      {HomeLoading ? (
        <div>로딩중...</div>
      ) : (
        <Wrapper
          initial={{ backgroundPosition: "0 0" }}
          animate={{
            backgroundPosition: "0 -100%",
          }}
          transition={{ ease: "easeIn", repeat: Infinity, duration: 100 }}>
          {popPending ? (
            <Loader>로딩중</Loader>
          ) : (
            <>
              <Wrap>
                <Banner>
                  <AnimatePresence initial={false}>
                    <BannerFig
                      key={index}
                      variants={rowVars}
                      initial="start"
                      animate="end"
                      exit="exit"
                      transition={{ duration: 1 }}
                      style={{
                        backgroundImage: `url(${makeImagePath(
                          popData?.results[index].backdrop_path || ""
                        )})`,
                      }}></BannerFig>
                  </AnimatePresence>
                  <OriginalTitle
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 5 }}>
                    {popData?.results[index].original_title}
                  </OriginalTitle>
                  <Title
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 5 }}>
                    {popData?.results[index].title}
                  </Title>
                  <Overview
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 5 }}>
                    {popData?.results[index].overview}
                  </Overview>
                  <ButtonBox>
                    <PlayButton
                      onClick={() =>
                        navigate(`/movies/${popData?.results[index].id}`)
                      }
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 5 }}>
                      <CiPlay1 />
                      티저 재생
                    </PlayButton>
                    <PlayButton
                      onClick={handleIndexClick}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 5 }}>
                      <MdLocalMovies />
                      영화 추천
                    </PlayButton>
                  </ButtonBox>
                </Banner>
                <Cate>
                  <BiSolidCameraMovie />
                  <span>현재 상영 영화</span>
                </Cate>

                <Slider data={nowData && nowData} />
                <Cate>
                  <MdMovieEdit />
                  <span>평점 높은 영화</span>
                </Cate>
                <Slider data={topData && topData} />

                <Cate>
                  <MdMovieCreation />
                  <span>이달의 추천 영화</span>
                </Cate>
                <Slider data={popData && popData} />
                <AnimatePresence>
                  {bigMovieMatch ? <></> : null}
                </AnimatePresence>
              </Wrap>
              <Outlet />
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Home;
