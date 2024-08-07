import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
    const [value, setValue] = useState([]); // Existing array state
    const [isEnable, setIsEnable] = useState(false); // New boolean state
    const [accordianFetched, setAccordianFetched] = useState(false);
    const [useridd, setUseridd] = useState(''); // New string state
    const [isAsk, setIsAsk] = useState(false); // New boolean state

    return (
        <MyContext.Provider value={{ value, setValue, isEnable, setIsEnable,accordianFetched,setAccordianFetched,useridd,setUseridd,isAsk,setIsAsk }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
