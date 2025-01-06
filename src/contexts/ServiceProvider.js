"use client";

import { createContext, useContext } from "react";

const contextData = createContext();
export const ServiceContext = ({children}) => {
    return <contextData.Provider value={{  }}>{children}</contextData.Provider>
}

export const useServiceContext = () => useContext(contextData);