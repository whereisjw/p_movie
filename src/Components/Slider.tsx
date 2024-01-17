import { AnimatePresence, easeIn, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../api";
import { useMatch, useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
const Wrapper = styled.div`
  position: relative;
  height: 290px;
  overflow: visible;

  width: 80%;
  margin: 0 auto;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px 0;
  gap: 5px;
  position: absolute;

  top: 0;

  width: 100%;
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

const rowVars2 = {
  //window.innerWidth를 사용 이게 픽셀로 주는것보다 더 좋을듯
  start: {
    x: -window.innerWidth,
  },
  end: {
    x: 0,
  },
  exit: {
    x: +window.innerWidth,
  },
};

const Box = styled(motion.div)`
  position: relative;
  cursor: pointer;
  margin: 0 auto;
  background-color: white;
  height: 240px;
  width: 185px;
  font-size: 50px;
  overflow: hidden;
  &:hover img {
    filter: brightness(120%);
  }
  figure {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      filter: brightness(80%);
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
  bottom: 0;
  padding: 5px;
  background: transparent;
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

const Point = styled.span`
  width: 80px;
  height: 80px;
  position: absolute;
  top: -40px;
  right: -40px;
  background-color: yellow;
  transform: rotate(45deg);
`;

const Number = styled.span`
  position: absolute;
  color: ${(props) => props.theme.white.lighter};

  top: 5px;
  right: 5px;
  font-weight: bold;
  font-size: 17px;
`;

const RightButton = styled.div`
  position: absolute;
  font-size: 50px;
  cursor: pointer;
  width: 55px;
  height: 55px;
  right: -55px;
  top: 50%;
  transform: translateY(-50%);
  filter: brightness(60%);
  &:hover {
    filter: brightness(110%);
  }
`;
const LeftButton = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: 50px;
  width: 55px;
  height: 55px;
  left: -55px;
  top: 50%;
  transform: translateY(-50%);
  filter: brightness(60%);
  &:hover {
    filter: brightness(110%);
  }
`;

const Slider = ({ data }: any) => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((leaving) => !leaving);
  const increaseindex = () => {
    setDirection("r");
    if (leaving) return;
    if (data) {
      toggleLeaving();
      const totalMovies = data?.results.length;
      const maxIndex = Math.ceil(totalMovies / 6);
      setIndex((prev) => (prev == 2 ? 0 : prev + 1));
    }
  };
  const decreaseindex = () => {
    setDirection("l");
    if (leaving) return;
    if (data) {
      toggleLeaving();
      const totalMovies = data?.results.length;
      const maxIndex = Math.ceil(totalMovies / 6);
      setIndex((prev) => (prev == 0 ? 2 : prev - 1));
    }
  };

  const navigate = useNavigate();
  const onBoxClicked = (id: number) => navigate(`/movies/${id}`);
  const [direction, setDirection] = useState("");
  return (
    <Wrapper>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={direction == "r" ? rowVars : rowVars2}
          initial="start"
          animate="end"
          exit="exit"
          transition={{ type: "spring", duration: 2 }}
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
                      <Year>
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : ""}
                      </Year>
                    </h4>
                  </Info>
                  <Point
                    style={{
                      background:
                        movie.vote_average.toFixed(1) >= 8
                          ? "green"
                          : movie.vote_average.toFixed(1) >= 7
                          ? "orange"
                          : "red",
                    }}></Point>
                  <Number>{movie.vote_average.toFixed(1)}</Number>
                </Box>
              </>
            ))}
        </Row>
      </AnimatePresence>
      <RightButton onClick={increaseindex}>
        <FaChevronRight />
      </RightButton>
      <LeftButton onClick={decreaseindex}>
        <FaChevronLeft />
      </LeftButton>
    </Wrapper>
  );
};

export default Slider;
