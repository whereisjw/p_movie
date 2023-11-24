import { useQuery } from "@tanstack/react-query";
import { motion, useScroll } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getVideos } from "../api";
import axios from "axios";
const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 560px;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;

  left: 0;
  right: 0;
  margin: 0 auto;
`;

const BigFigure = styled.figure`
  width: 100%;
  height: 315px;
  border: 1px solid whitesmoke;
`;

const BigCover = styled.img`
  width: 100%;
  height: 100%;
`;

const BigTitle = styled.h3`
  padding: 10px;
  font-size: 28px;
  position: relative;
  top: -60px;
`;

const BigOverView = styled.p`
  padding: 20px;
  position: relative;
  top: -60px;
`;

const Modal = () => {
  const navigate = useNavigate();
  const overLayCLick = () => navigate("/");
  const { scrollY, scrollYProgress } = useScroll();
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getVideos(id),
  });

  /*   console.log(data.data.results[0].key); */

  return (
    <>
      {" "}
      <OverLay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={overLayCLick}
      />
      {isPending ? (
        <p>로딩중...</p>
      ) : (
        <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={id}>
          <>
            <BigFigure>
              {data?.results[1] ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${data?.results[1].key}`}
                  allowFullScreen
                />
              ) : (
                <BigCover src="/no-image.jpg"></BigCover>
              )}
            </BigFigure>
            <BigTitle></BigTitle>
            <BigOverView></BigOverView>
          </>
        </BigMovie>
      )}
    </>
  );
};

export default Modal;
