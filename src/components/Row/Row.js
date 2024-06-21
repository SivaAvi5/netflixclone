import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../helpers/axios";
// import YouTube from "youtube-react";
// import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLarge = false }) => {
  const [movies, setMovies] = useState([]);
  // const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      console.log(isLarge, request);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  // const opts = {
  //   height: "390",
  //   width: "100%",
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLarge && "row__posterLarge"}`}
            src={`${base_url}${
              isLarge ? movie.poster_path : movie.poster_path
            }`}
            alt={movie.name}
            // onClick={() => handleClick(movie)}
          />
        ))}
        {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
      </div>
    </div>
  );
};

export default Row;
