import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "./axios";
import requests from "./requests";
const base_img_url = "https://image.tmdb.org/t/p/original/";
const link = '';

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  function truncate(str, n){
    return str?.length> n ? str.substr(0,n-1) + "..." : str;
  }

  const str = movie.overview;
  const truncStr = truncate(str, 290);
  // console.log(str);
  // console.log(truncStr);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div> 
        <h1 className="banner__description">{truncStr}</h1> 
        <div className="banner--fadeBottom"></div>
      </div>
    </header>
  );
}

export default Banner;
