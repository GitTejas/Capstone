import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function MembersList() {
  const { members, loading } = useContext(AppContext);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading members...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Members List</h2>
      {members.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No members found.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-lg rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Weight (kg)</th>
              <th className="p-3 text-left">Height (cm)</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                key={member.id} // Assuming each member has a unique `id`
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white hover:bg-gray-200'}
              >
                <td className="p-3">{member.name}</td>
                <td className="p-3">{member.age}</td>
                <td className="p-3">{member.weight}</td>
                <td className="p-3">{member.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MembersList;
