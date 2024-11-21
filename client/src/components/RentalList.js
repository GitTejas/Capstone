import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function RentalList() {
    const { rentals, loading } = useContext(AppContext);

    if (loading) {
        return <p>Loading rentals...</p>;
    }

    return (
        <div>
            <h2>Rental List</h2>
            {rentals.length === 0 ? (
                <p>No rentals found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Rental ID</th>
                            <th>User</th>
                            <th>Movie</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map((rental) => (
                            <tr key={rental.id}>
                                <td>{rental.id}</td>
                                <td>{rental.user_id}</td>
                                <td>{rental.movie_id}</td>
                                <td>
                                    {rental.due_date && !isNaN(new Date(rental.due_date)) 
                                        ? new Date(rental.due_date).toLocaleDateString() 
                                        : 'Invalid Date'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RentalList;
