import { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { fetchDetails } from '../components/fetchFunctions';
import { Suspense } from 'react';
import Notiflix from 'notiflix';
import css from './MovieDetails.module.css';
const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(
    location.state?.from ?? '/'
  );

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await fetchDetails(movieId);
        setMovie(movie);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    getMovie();
    if (!location.state?.from) {
      setPreviousLocation(location.pathname);
    }
  }, [movieId, location]);

  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    genres,
    id,
  } = movie;
  const shouldDisplayInfo =
    poster_path &&
    title &&
    release_date &&
    vote_average &&
    overview &&
    genres &&
    genres.length > 0;

  return (
    <>
      {shouldDisplayInfo ? (
        <>
          <Link className={css.btn} to={previousLocation}>
            Go back
          </Link>
          <div className={css.wrapp}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt="Movie poster"
              width={300}
              height={400}
            />
            <div>
              <h1>
                {title} {`(${release_date.split('-')[0]})`}
              </h1>
              <p>User Score: {Number(vote_average).toFixed(1)}</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h3>Genres</h3>
              <div>
                {genres.map(({ id, name }) => (
                  <p key={id}>{name}</p>
                ))}
              </div>
            </div>
          </div>
          <div></div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link
                  className={css.link}
                  to={`/movies/${id}/cast`}
                  state={{ from: location }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  className={css.link}
                  to={`/movies/${id}/reviews`}
                  state={{ from: location }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense fallback={<div>Loading info...</div>}>
              <div></div>
              <Outlet />
            </Suspense>
          </div>
        </>
      ) : (
        <div>No information</div>
      )}
    </>
  );
};

export default MovieDetails;
