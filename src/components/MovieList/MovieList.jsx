import { fetchPopularMovies } from '../fetchFunctions';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import css from './MovieListStyle.module.css';
export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const fetchTrandingMovies = async () => {
      try {
        const results = await fetchPopularMovies();
        setMovies(results);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchTrandingMovies();
  }, []);

  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link
              className={css.link}
              to={`/movies/${id}`}
              state={{ from: location }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
