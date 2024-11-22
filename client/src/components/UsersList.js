import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function UsersList() {
  const { users, loading } = useContext(AppContext);

  if (loading) {
    return <p className="text-center text-gray-500">Loading users...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User List</h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                Name
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;
