import { MovieList } from 'components/MovieList/MovieList';
import css from './HomeStyle.module.css';
const Home = () => {
  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList />
    </div>
  );
};

export default Home;
