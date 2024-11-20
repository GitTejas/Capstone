import React, { createContext, useContext, useState, useEffect } from "react";

const StoresContext = createContext();

export const StoresProvider = ({ children }) => {
    const [stores, setStores] = useState([]);

    // Fetching stores data when the provider mounts
    useEffect(() => {
        fetch("/stores")
            .then((response) => response.json())
            .then((data) => setStores(data))
            .catch((error) => console.error("Error fetching stores:", error));
    }, []);

    const addStore = (newStore) => {
        fetch("/stores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStore),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to add store");
                return response.json();
            })
            .then((addedStore) => setStores((prevStores) => [...prevStores, addedStore]))
            .catch((error) => console.error("Error adding store:", error));
    };

    return (
        <StoresContext.Provider value={{ stores, addStore }}>
            {children}
        </StoresContext.Provider>
    );
};

export const useStoresContext = () => useContext(StoresContext);
