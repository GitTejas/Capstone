import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function MovieList() {
    const { movies, loading } = useContext(AppContext);

    if (loading) {
        return <p>Loading movies...</p>;
    }

    return (
        <div>
            <h2>Movie List</h2>
            {movies.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Release Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.release_year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MovieList;