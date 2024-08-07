import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
    const [value, setValue] = useState([]); // Existing array state
    const [isEnable, setIsEnable] = useState(false); // New boolean state
    const [useridd, setUseridd] = useState(''); // New string state
    const [contextExample, setContextExample] = useState("Sharing Context");

    return (
        <MyContext.Provider value={{ value, setValue, isEnable, setIsEnable,useridd,setUseridd,contextExample, setContextExample }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
