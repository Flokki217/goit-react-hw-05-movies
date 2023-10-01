import SearchInput from 'components/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchBySearch } from 'components/fetchFunctions';
import Notiflix from 'notiflix';
import css from './MoviesStyle.module.css';
const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';
  const [searchQuery, setSearchQuery] = useState(movieName ? movieName : '');
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (form.value === '') return;
    setSearchQuery(movieName);
    updateQueryString(movieName);
    form.reset();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!searchQuery) {
          return;
        }
        const movies = await fetchBySearch(searchQuery);
        setMovies(movies);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  const updateQueryString = query => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  return (
    <div>
      <div>
        <SearchInput onSubmit={handleSubmit} onChange={updateQueryString} />
      </div>
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

export default Movies;
