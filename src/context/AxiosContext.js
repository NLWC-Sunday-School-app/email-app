"use client"
import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
// import { Next13NProgress, Link } from 'nextjs13-progress';
import { redirect, useRouter } from 'next/navigation';
// import nProgress from 'nprogress';
import { useAuth } from './AuthContext';
import { SWRConfig } from 'swr';

export const AxiosContext = createContext({});


export function useAxios() { return useContext(AxiosContext) }
export const AxiosProvider = ({ children }) => {
    // const authContext = useContext(AuthContext);

    const { accesstoken, isLoading, setisLoading, loggedinUser, setLoggedinUser } = useAuth();
    const router = useRouter()

    const requestInterceptor = config => {
        setisLoading(true)
        if (config?.dontShowLoader) {

        } else {
        }

        const token = localStorage.getItem('ACCESS_TOKEN');
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['ngrok-skip-browser-warning'] = `69420`;
        // console.log(config)
        // return new Promise(resolve => setTimeout(() => resolve(config), 1000));
        return config;
    };
    const responseInterceptor = config => {
        setisLoading(false)
        // console.log(config)
        return config;
    };

    const responseErrorHandler = error => {

        setisLoading(false)

        const orignalConfig = error.config;
        if (error?.response?.status === 401) {
            localStorage.setItem("ACCESS_TOKEN", "");
            localStorage.setItem("loggedinUser", JSON.stringify({}));
            router.push(`/auth/login`);
            console.log('User is unauthorized....')
            // return refreshTokeAPICall()
        }


        if (error.code != "ERR_CANCELED") {
            toast.error(error?.response?.data?.message ?? "An error occured", {
                theme: "colored",
                transition: Bounce,
            });

        }
        console.log(error?.response?.data)
        return Promise.reject(error);
    };

    const requestErrorHandler = error => {
        setisLoading(false)
        // setshowLoaderID(false)
        // toast.show(error?.response?.data?.message ?? "Kindly login to continue", data);
        // return Promise.reject(error);
    };


    const publicAxios = axios.create({
        // baseURL: 'https://8960-102-67-1-16.ngrok-free.app/api',
        // baseURL: 'http://127.0.0.1:8234/api',
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api',
    });

    publicAxios.interceptors.request.use(requestInterceptor, requestErrorHandler);
    publicAxios.interceptors.response.use(responseInterceptor, responseErrorHandler);

    if (typeof window !== 'undefined') {
    }

    return (
        <AxiosContext.Provider
            value={{
                publicAxios
            }
            }>
            <SWRConfig value={{ fetcher: publicAxios.get }}>

                {children}
            </SWRConfig>
        </AxiosContext.Provider >
    );
};