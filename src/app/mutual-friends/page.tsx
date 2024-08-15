"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const MutualFriends = () => {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [mutualFriends, setMutualFriends] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setMutualFriends([]);

    if (!username1 || !username2) {
      setError("Both usernames are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/getMutualFriends?username1=${username1}&username2=${username2}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch mutual friends.");
      }
      const data = await response.json();
      setMutualFriends(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="text-center text-2xl">
        Find common friends between two users
      </div>
      <div className="container mx-auto mt-4 px-4">
        <div className="mb-4">
          <label
            htmlFor="username1"
            className="block text-sm font-medium text-gray-700"
          >
            Username 1
          </label>
          <input
            type="text"
            id="username1"
            name="username1"
            value={username1}
            onChange={(e) => setUsername1(e.target.value)}
            placeholder="Enter first username"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username2"
            className="block text-sm font-medium text-gray-700"
          >
            Username 2
          </label>
          <input
            type="text"
            id="username2"
            name="username2"
            value={username2}
            onChange={(e) => setUsername2(e.target.value)}
            placeholder="Enter second username"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="mt-6">
          {mutualFriends.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">Mutual Friends:</h3>
              <table className="min-w-full bg-white border border-gray-300 text-black">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border-b">Username</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Age</th>
                    <th className="px-4 py-2 border-b">Most Played Game</th>
                  </tr>
                </thead>
                <tbody>
                  {mutualFriends.map((friend, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-2 border-b">
                        {friend.mutual_friend}
                      </td>
                      <td className="px-4 py-2 border-b">{friend.status}</td>
                      <td className="px-4 py-2 border-b">{friend.age}</td>
                      <td className="px-4 py-2 border-b">
                        {friend.most_played_game}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-red-500 text-lg">
              No common friends found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MutualFriends;
