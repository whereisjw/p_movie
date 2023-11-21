import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../api";
const Wrapper = styled.div`
  position: relative;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
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

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  color: tomato;
  font-size: 50px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const offset = 6;
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
  return (
    <Wrapper onClick={increaseindex}>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVars}
          initial="start"
          animate="end"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}>
          {data.results
            .slice(offset * index, offset * index + offset)
            .map((movie: any, i: any) => (
              <Box
                bgphoto={
                  movie.backdrop_path
                    ? makeImagePath(movie.backdrop_path, "w500")
                    : "/no-image.jpg"
                }
                key={i}></Box>
            ))}
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Slider;
