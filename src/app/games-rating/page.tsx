"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const GamePage: React.FC = () => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minRating, setMinRating] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [ageRestrictionToggle, setAgeRestrictionToggle] =
    useState<boolean>(false);
  const [games, setGames] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    setError("");
    setGames([]);

    if (!minPrice || !maxPrice || !minRating || !genre) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/getGame?minPrice=${minPrice}&maxPrice=${maxPrice}&minRating=${minRating}&genre=${genre}&ageRestrictionToggle=${ageRestrictionToggle}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch games.");
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
      <div className="text-center text-2xl">Filter Games</div>
      <div className="container mx-auto mt-4 px-4">
        <div className="mb-4">
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Enter minimum price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Maximum Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Enter maximum price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minRating"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Rating
          </label>
          <input
            type="number"
            id="minRating"
            name="minRating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder="Enter minimum rating"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Select Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          >
            <option value="">Choose a genre</option>
            <option value="RPG">RPG</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Racing">Racing</option>
            <option value="Survival">Survival</option>
            <option value="Shooter">Shooter</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="ageRestrictionToggle"
            className="block text-sm font-medium text-gray-700"
          >
            Only Show Games with Age Restriction &lt; 18
          </label>
          <input
            type="checkbox"
            id="ageRestrictionToggle"
            name="ageRestrictionToggle"
            checked={ageRestrictionToggle}
            onChange={(e) => setAgeRestrictionToggle(e.target.checked)}
            className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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
          {games.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">Filtered Games:</h3>
              <table className="min-w-full bg-white border border-gray-300 text-black">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border-b">Game Name</th>
                    <th className="px-4 py-2 border-b">Price</th>
                    <th className="px-4 py-2 border-b">Rating</th>
                    <th className="px-4 py-2 border-b">Genre</th>
                    <th className="px-4 py-2 border-b">Age Restrictions</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-2 border-b">{game.name}</td>
                      <td className="px-4 py-2 border-b">{game.price}</td>
                      <td className="px-4 py-2 border-b">{game.rating}</td>
                      <td className="px-4 py-2 border-b">{game.genre}</td>
                      <td className="px-4 py-2 border-b">
                        {game.age_restrictions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-red-500 text-lg">
              No games found with the specified criteria.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GamePage;
