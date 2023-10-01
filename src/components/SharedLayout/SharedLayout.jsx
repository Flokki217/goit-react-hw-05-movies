import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import css from './style.module.css';
const SharedLayout = () => {
  return (
    <div>
      <nav className={css.navigation}>
        <NavLink className={css.link} to="/">
          Home
        </NavLink>
        <NavLink className={css.link} to="/movies">
          Movies
        </NavLink>
      </nav>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          {' '}
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default SharedLayout;
