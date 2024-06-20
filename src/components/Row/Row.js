import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../helpers/axios";

const Row = ({ title, fetchUrl, isLarge = false }) => {
  const [movies, setMovies] = useState([]);

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
  console.log(isLarge, movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
                (<img 
                    key={movie.id}
                    className={`row__poster ${isLarge && 'row__posterLarge'}`}
                    src={`${base_url}${isLarge?movie.poster_path:movie.poster_path}`}
                    alt=""
                />)
                
        )}
      </div>
    </div>
  );
};

export default Row;
