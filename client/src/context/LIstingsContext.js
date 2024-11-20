import React, { createContext, useState, useEffect } from 'react';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [games, setGames] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, gamesData, storesData] = await Promise.all([
          fetch('/listings').then((res) => res.json()),
          fetch('/games').then((res) => res.json()),
          fetch('/stores').then((res) => res.json()),
        ]);
        setListings(listingsData);
        setGames(gamesData);
        setStores(storesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, games, stores, setListings }}>
      {children}
    </ListingsContext.Provider>
  );
};
