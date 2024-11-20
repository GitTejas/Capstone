import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const fetchGames = async () => {
        try {
            const response = await fetch("/games");
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error(error);
        }
    };

    const addOrUpdateGame = async (game) => {
        // Add logic for adding/updating a game
    };

    const deleteGame = async (id) => {
        // Add logic for deleting a game
    };

    return (
        <GameContext.Provider
            value={{ games, sortBy, setSortBy, fetchGames, addOrUpdateGame, deleteGame }}
        >
            {children}
        </GameContext.Provider>
    );
};
