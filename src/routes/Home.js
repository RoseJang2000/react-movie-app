import { useState, useEffect } from 'react';
import Movie from '../components/Movie';
import LoadingIndicator from '../components/LoadingIndicator';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import axios from 'axios';

import styles from './Home.module.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [sort, setSort] = useState('download_count');
  const [rating, setRating] = useState(8.0);
  const [movies, setMovies] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=${sort}&limit=9&page=${page}`
      )
    ).json();
    setMovies((prev) => [...prev, ...json.data.movies]);
    // setMovies((current) => current.filter((movie) => movie.summary !== ''));
    setLoading(false);

    // await axios
    //   .get(
    //     `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=${sort}&limit=9&page=${page}`
    //   )
    //   .then((resp) => setMovies(resp.data.data.movies.filter((movie) => movie.summary !== '')))
    //   .catch((err) => console.log(err));
    setLoading(false);
  };

  const onSubmit = () => {
    getMovies();
  };

  const onShow = () => {
    setIsShow((current) => !current);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = Math.ceil(document.documentElement.scrollTop);
    const clientHeight = document.documentElement.clientHeight;

    // console.log('scrollTop', scrollTop);
    // console.log('clientHeight', clientHeight);
    // console.log('scrollHeight', scrollHeight);

    if (scrollTop + clientHeight === scrollHeight) {
      console.log('bottom!');
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getMovies();
  }, [sort, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className={styles.container}>
          <div className={isShow ? styles.movies__sort : styles.movie__sort__hidden}>
            <label htmlFor="sort__select">
              Movies sort by&nbsp;
              <select
                id="sort__select"
                type="text"
                value={sort}
                onChange={({ target: { value } }) => setSort(value)}
              >
                <option value="download_count">Downloads</option>
                <option value="date_added">Added</option>
                <option value="year">Year</option>
                <option value="title">Title</option>
                <option value="like_count">Likes</option>
              </select>
            </label>
            <label htmlFor="rating__input">
              Minimum rating&nbsp;
              <input
                id="rating__input"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="0"
                max="10"
              />
              <button onClick={onSubmit}>ok</button>
            </label>
          </div>
          <div className={styles.filter__button__container}>
            <div className={styles.filter__button} onClick={onShow}>
              {isShow ? 'Close' : 'Filter'}{' '}
              {isShow ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
            </div>
          </div>
          <div className={styles.movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                year={movie.year}
                summary={movie.summary}
                genres={movie.genres.slice(0, 3)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
