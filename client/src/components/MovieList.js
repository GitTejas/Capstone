import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function MovieList() {
  const { movies, loading } = useContext(AppContext);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading movies...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Movie List</h2>
      {movies.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No movies found.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-lg rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Genre</th>
              <th className="p-3 text-left">Release Year</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr
                key={movie.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white hover:bg-gray-200'}
              >
                <td className="p-3">{movie.title}</td>
                <td className="p-3">{movie.genre}</td>
                <td className="p-3">{movie.release_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MovieList;
