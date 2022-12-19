import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import { FaCloudDownloadAlt, FaHeart, FaStar } from 'react-icons/fa';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className={styles.container}>
          {/* <img
            className={styles.background}
            id="background"
            src={movie.background_image_original}
            alt={`background image of ${movie.title}`}
          /> */}
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${movie.background_image_original})` }}
          ></div>
          <div className={styles.content__container}>
            <img id="cover" src={movie.large_cover_image} alt={`cover of ${movie.title}`} />
            <div className={styles.content}>
              <div className={styles.title}>
                <h1>{movie.title}</h1>
                <h2>{movie.year}</h2>
              </div>
              <div className={styles.user__likes}>
                <span className={styles.star}>
                  <FaStar style={{ color: 'gold' }} />
                  &nbsp;{movie.rating}
                </span>
                <span className={styles.download}>
                  <FaCloudDownloadAlt style={{ color: 'skyblue' }} />
                  &nbsp;{Number(movie.download_count).toLocaleString('en')}
                </span>
                <span className={styles.like}>
                  <FaHeart style={{ color: 'red' }} />
                  &nbsp;{Number(movie.like_count).toLocaleString('en')}
                </span>
              </div>
              <div className={styles.summary}>
                <h4>Runtime - {movie.runtime}m</h4>
                <p>{movie.description_full}</p>
              </div>
            </div>
            <ul className={styles.genres}>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
