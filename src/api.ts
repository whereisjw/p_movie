import axios from "axios";
//  https://image.tmdb.org/t/p/original/이미지.jpg
// https://image.tmdb.org/t/p/w500/이미지.jpg

const myKey = "a17fc435835739879e88d78b9c75c21d";
const BASE_URL = "https://api.themoviedb.org/3";
export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

interface IDetail {
  title: string;
  original_title: string;
  overview: string;
  vote_average: string;
}

interface IMovie {
  id: number;
  original_title: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number | string;
  release_date: string;
}

export interface IGetMovie {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getNowPlaying() {
  return axios
    .get(
      `${BASE_URL}/movie/now_playing?language=ko-KR&page=1sort_by=popularity.desc&api_key=${myKey}`
    )
    .then((res) => res.data);
}

export function getPopular() {
  return axios
    .get(
      `${BASE_URL}/movie/popular?language=ko-KR&page=1sort_by=popularity.desc&api_key=${myKey}`
    )
    .then((res) => res.data);
}

export function getTop_rated() {
  return axios
    .get(
      `${BASE_URL}/movie/top_rated?language=ko-KR&page=1sort_by=popularity.desc&api_key=${myKey}`
    )
    .then((res) => res.data);
}
//upcoming

export function getUpcoming() {
  return axios
    .get(
      `${BASE_URL}/movie/upcoming?language=ko-KR&page=1&sort_by=popularity.descapi_key=${myKey}`
    )
    .then((res) => res.data);
}

export function getVideos(id: any) {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${myKey}`)
    .then((res) => res.data);
}

export function getDetail(id: any) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${myKey}&language=ko-KR`
  );
}
