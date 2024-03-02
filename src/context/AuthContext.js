"use client"
import React, { useContext, useEffect, useState } from 'react'

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from 'react-toastify';
import { usePathname, useRouter, redirect } from 'next/navigation';
import nProgress from 'nprogress';

export const AuthContext = React.createContext({})

export function useAuth() { return useContext(AuthContext) }

export function AuthContextProvider({ children }) {

    const router = useRouter();
    const pathname = usePathname();
    const [loggedinUser, setLoggedinUser] = useState({})
    const [accesstoken, setAccesstoken] = useState("")
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN')
        const user = (localStorage.getItem('loggedinUser') && localStorage.getItem('loggedinUser') != 'undefined') ? JSON.parse(localStorage.getItem('loggedinUser')) : {}
        setLoggedinUser(user)
        setAccesstoken(token)
        if (!token) {
            if (pathname.startsWith("/app")) {
                redirect(`/auth/login`);
            }
            //check current route
        }
    }, [])


    useEffect(() => {
        if (accesstoken) {
            // localStorage.setItem('ACCESS_TOKEN', accesstoken)
        }
    }, [accesstoken])

    useEffect(() => {
        if (loggedinUser) {
            // localStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
        }
    }, [loggedinUser])

    useEffect(() => {
        if (isLoading) {
            nProgress.start();
        } else {
            nProgress.done()
        }
    }, [isLoading])
    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthContext.Provider value={{ loggedinUser, setLoggedinUser, isLoading, setisLoading, accesstoken, setAccesstoken }}>
                {children}
            </AuthContext.Provider>
        </LocalizationProvider>
    )
}
