import { useQuery } from "@tanstack/react-query";
import { motion, useScroll } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDetail, getVideos } from "../api";
import axios from "axios";
import Similar from "./Similar";
const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 560px;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow-x: hidden;
  overflow-y: scroll;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 99;
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
  font-size: 15px;
  line-height: 150%;
  word-spacing: 5px;
`;

const DetailList = styled.ul`
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 17px;
  .adult {
    color: ${(props) => props.theme.red};
    font-weight: bold;
  }
  li {
    display: flex;
    align-items: center;
    span:last-child::after {
      content: "";
    }
    span::after {
      content: ",";
    }
  }
  li:last-child::after {
    content: "";
  }
  li::after {
    content: "|";
    margin: 0 5px;
    color: ${(props) => props.theme.white.lighter};
    font-weight: lighter;
  }
  strong {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const Modal = () => {
  const navigate = useNavigate();
  const overLayCLick = () => navigate("/");
  const { scrollY, scrollYProgress } = useScroll();
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["getVideos"],
    queryFn: () => getVideos(id),
  });
  const {
    isPending: detailPending,
    error: detailError,
    data: detailData,
  } = useQuery({
    queryKey: ["getDetail"],
    queryFn: () => getDetail(id),
  });

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
            <BigTitle>{detailData?.data.title}</BigTitle>

            <DetailList>
              <li>
                <strong>
                  {detailData?.data.release_date.split("-").join(".")}
                </strong>
                개봉
              </li>
              <li>
                {detailData?.data.genres.slice(0, 3).map((v: any) => (
                  <span>{v.name}</span>
                ))}
              </li>
              <li>
                <strong>{detailData?.data.runtime}</strong>분
              </li>
              <li className="adult">
                {detailData?.data.adult ? "청소년관람불가" : "청소년관람가능"}
              </li>
            </DetailList>
            <BigOverView>{detailData?.data.overview}</BigOverView>
            <Similar id={id}></Similar>
          </>
        </BigMovie>
      )}
    </>
  );
};

export default Modal;
