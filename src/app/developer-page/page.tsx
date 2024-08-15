"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const DeveloperPage = () => {
  const [devName, setDevName] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const developers = [
    "EpicGames",
    "FutureWorks",
    "PixelCraze",
    "Techie Games",
    "RetroGems",
    "CodeMasters",
    "ArcadiaSoft",
    "UnityHouse",
    "IndieDream",
  ];

  const handleSearch = async () => {
    setError("");
    setGames([]);

    if (!devName) {
      setError("Developer name is required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/getDevPages?devName=${devName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch developer's games.");
      }
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="text-center text-2xl">Developer's Games</div>
      <div className="container mx-auto mt-4 px-4">
        <div className="mb-4">
          <label
            htmlFor="devName"
            className="block text-sm font-medium text-gray-700"
          >
            Developer Name
          </label>
          <select
            id="devName"
            name="devName"
            value={devName}
            onChange={(e) => setDevName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          >
            <option value="" disabled>
              Select a developer
            </option>
            {developers.map((developer, index) => (
              <option key={index} value={developer}>
                {developer}
              </option>
            ))}
          </select>
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
          {games.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Games by {devName}:
              </h3>
              <table className="min-w-full bg-white border border-gray-300 text-black">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border-b">Game Name</th>
                    <th className="px-4 py-2 border-b">Player Count</th>
                    <th className="px-4 py-2 border-b">Average Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-2 border-b">{game.game}</td>
                      <td className="px-4 py-2 border-b">
                        {game.player_count}
                      </td>
                      <td className="px-4 py-2 border-b">{game.avg_rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-red-500 text-lg">
              No games found for the developer.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeveloperPage;
