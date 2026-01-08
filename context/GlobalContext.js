'use client'
import { createContext, useContext, useState, useEffect } from "react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";


// Create Context
const GlobalContext = createContext()

// Create Provider
export function GlobalProvider({children}){
    const [unreadCount, setUnreadCount] = useState(0)

    const {data: session} = useSession()


    useEffect(()=> {
        if(session && session.user){
            getUnreadMessageCount().then((res) => {
                if(res.count) setUnreadCount(res.count)
            })
        }
    }, [session])


    return (
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext(){
    return useContext(GlobalContext)
}