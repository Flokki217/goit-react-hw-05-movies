import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Notiflix from 'notiflix';
import { fetchCredits } from '../fetchFunctions';
import css from './CastStyle.module.css';
const Cast = () => {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const actors = await fetchCredits(movieId);
        if (actors.length > 0) {
          setActors(actors);
        }
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchActors();
  }, [movieId]);
  return (
    <section>
      <ul className={css.list}>
        {actors.map(({ profile_path, id, name, character }) => (
          <li className={css.item} key={id}>
            {profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt="Actor"
                width={80}
                height={110}
              />
            )}

            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Cast;
