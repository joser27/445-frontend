"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const GamesPopularity = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setGames([]);

    if (!minPrice || !maxPrice) {
      setError("Both minimum and maximum prices are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/getTopPurchasedGames?minPrice=${minPrice}&maxPrice=${maxPrice}`
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
      <div className="text-center text-2xl">
        Games Popularity by Price Range
      </div>
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
                Top Purchased Games:
              </h3>
              <table className="min-w-full bg-white border border-gray-300 text-black">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border-b">Game Name</th>
                    <th className="px-4 py-2 border-b">Price</th>
                    <th className="px-4 py-2 border-b">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-2 border-b">{game.name}</td>
                      <td className="px-4 py-2 border-b">{game.price}</td>
                      <td className="px-4 py-2 border-b">{game.sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-red-500 text-lg">
              No games found within the specified price range.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GamesPopularity;
