import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../helpers/axios";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLarge = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const YOUTUBE_API_KEY = "AIzaSyC18wu8GFtrqNVOqQq_tg9IxGKBMppJS1I"; 

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movie.name} trailer&type=video&key=${YOUTUBE_API_KEY}`
        );
        const videoId = response.data.items[0]?.id?.videoId;
        setTrailerUrl(videoId);
      } catch (error) {
        console.error(`Error fetching trailer: ${error.message}`);
      }
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLarge && "row__posterLarge"}`}
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;

