import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=731d7c0a`;
    const response = await fetch(url);

    const responseJson = await response.json();
    if (responseJson.Search) setMovies(responseJson.Search);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movies-app-favorites')
    );

    setFavorites(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movies-app-favorites', JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    if (
      favorites.length === 0 ||
      !favorites.find((favorite) => favorite.imdbID === movie.imdbID)
    ) {
      const newFavoriteList = [...favorites, movie];
      setFavorites(newFavoriteList);
      saveToLocalStorage(newFavoriteList);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row d-flex align-items-center">
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoritesComponent={AddFavorites}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row d-flex align-items-center">
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoritesComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
};

export default App;
