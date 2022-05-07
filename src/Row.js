import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_img_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //A snippet of code that runs based on a specific condition.variable
  //everytime the row loads, make a request to tmdb.com
  //if the [] is left blank, run once when row loads, dont load again.
  // if the [] has something inside, eg, [movies] this function runs everytime 'movies' changes
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
//   console.table(movies);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  function toUrl( videoId ) {

		return encodeURI( 'https://www.youtube.com/watch?v=' + videoId )

	}
  const handleClick = (movie) =>{
    if(trailerUrl){
      setTrailerUrl("");
    }
    else{
      movieTrailer(movie?.name || "").then(
        (url)=> {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
  };
  }

  return (
    <div className="row">
      {/* Contains two things-
            1. title
            2. container containing movies posters */}

      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id} //for optimization
            onClick = {()=> {handleClick(movie); console.log(movie?.title)}}
            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_img_url}${isLargeRow ? movie .poster_path: movie.backdrop_path}`}
            alt={movie.name}
          />

        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
