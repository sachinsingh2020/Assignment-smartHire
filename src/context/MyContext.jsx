// MyContext.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    return (
        <MyContext.Provider value={{ notes, setNotes }}>
            {children}
        </MyContext.Provider>
    );
};


