import React from 'react';

export default function MovieList({
  movies,
  favoritesComponent,
  handleFavoritesClick
}) {
  const FavoritesComponent = favoritesComponent;
  return (
    <>
      {movies.map((movie, index) => (
        <div
          key={movie.imdbID}
          className="movie-poster d-flex justify-content-start m-3"
        >
          <img src={movie.Poster} alt="movie"></img>
          <div
            className="overlay d-flex align-items-center justify-content-center"
            onClick={() => handleFavoritesClick(movie)}
          >
            <FavoritesComponent />
          </div>
        </div>
      ))}
    </>
  );
}
