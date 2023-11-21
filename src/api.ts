import axios from "axios";
//  https://image.tmdb.org/t/p/original/이미지.jpg
// https://image.tmdb.org/t/p/w500/이미지.jpg

const myKey = "a17fc435835739879e88d78b9c75c21d";
const BASE_URL = "https://api.themoviedb.org/3";
export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

interface IMovie {
  id: number;
  original_title: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number | string;
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
      `${BASE_URL}/movie/now_playing?language=ko-KR&page=18&api_key=${myKey}`
    )
    .then((res) => res.data);
}
