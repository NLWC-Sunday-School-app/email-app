"use client"
import React, { useContext, useEffect, useState } from 'react'

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const AuthContext = React.createContext({})

export function useAuth() { return useContext(AuthContext) }

export function AuthContextProvider({ children }) {

    const [loggedinUser, setLoggedinUser] = useState({})

    useEffect(() => {
        if (localStorage.getItem('loggedinUser')) {
            setLoggedinUser(JSON.parse(localStorage.getItem('loggedinUser')))
        }
        // localStorage.setItem('loggedinUser', JSON.stringify({ name: "focus", email: "fola.aremu@gmail.com" }))
    }, [])
    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthContext.Provider value={{ loggedinUser, setLoggedinUser }}>
                {children}
            </AuthContext.Provider>
        </LocalizationProvider>
    )
}
