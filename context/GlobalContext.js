'use client'
import { createContext, useContext, useState } from "react";

// Create Context
const GlobalContext = createContext()

// Create Provider
export function GlobalProvider({children}){
    const [unReadCount, setUnreadCount] = useState(0)

    return (
        <GlobalContext.Provider value={{
            unReadCount,
            setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext(){
    return useContext(GlobalContext)
}