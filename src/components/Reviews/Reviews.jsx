import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Notiflix from 'notiflix';
import { fetchReviews } from '../fetchFunctions';
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const reviews = await fetchReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    };
    fetchMovies();
  }, [movieId]);

  return (
    <section>
      <ul>
        {' '}
        {reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))
        ) : (
          <p>We don't have any reviews for this movie</p>
        )}
      </ul>
    </section>
  );
};
export default Reviews;
