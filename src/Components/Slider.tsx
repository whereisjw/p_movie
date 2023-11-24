import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../api";
import { useMatch, useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  position: relative;
  height: 500px;
  overflow: hidden;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px 0;
  gap: 5px;
  position: absolute;
  top: 100px;
  width: 100%;
  left: 0;
`;

const rowVars = {
  //window.innerWidth를 사용 이게 픽셀로 주는것보다 더 좋을듯
  start: {
    x: window.innerWidth,
  },
  end: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth,
  },
};

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 360px;
  width: 245px;
  font-size: 50px;
  &:hover img {
    filter: brightness(60%);
  }
  figure {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const boxVars = {
  start: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -50,
    zIndex: 99,
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  position: absolute;
  width: 100%;
  bottom: -80px;
  padding: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  padding-left: 10px;
  height: 80px;
  h4 {
    font-size: 16px;
  }
`;

const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};
const offset = 6;
const Year = styled.span`
  font-size: 12px;
  margin-left: 5px;
`;

const Slider = ({ data }: any) => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((leaving) => !leaving);
  const increaseindex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length;
      const maxIndex = Math.ceil(totalMovies / 6);
      setIndex((prev) => (prev == 2 ? 0 : prev + 1));
    }
  };

  const navigate = useNavigate();
  const onBoxClicked = (id: number) => navigate(`/movies/${id}`);

  return (
    <Wrapper>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVars}
          initial="start"
          animate="end"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}>
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((movie: any, i: any) => (
              <>
                <Box
                  layoutId={movie.id + ""}
                  onClick={() => onBoxClicked(movie.id)}
                  variants={boxVars}
                  whileHover="hover"
                  initial="start"
                  transition={{ type: "tween" }}
                  key={i}>
                  <figure>
                    <img
                      src={
                        movie.backdrop_path
                          ? makeImagePath(movie.poster_path, "w500")
                          : "/no-image.jpg"
                      }
                      alt=""
                    />
                  </figure>
                  <Info variants={infoVars}>
                    <h4>
                      {movie.title}
                      <Year>{movie.release_date.split("-")[0]}</Year>
                    </h4>
                  </Info>
                </Box>
              </>
            ))}
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Slider;
