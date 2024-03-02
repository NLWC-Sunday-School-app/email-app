import React from 'react'
import useSWR from 'swr';
import { useAxios } from "@/context/AxiosContext";



export function useFetchUsers({ search = '', page_size = 10, page = 1 }) {
    const { data, error, isLoading, mutate } = useSWR(`/user/user/list?search=${search}&page_size=${page_size}&page=${page}`)

    const user = data?.data?.data
    return {
        user,
        isLoading,
        isError: error,
        mutate
    }
}

export function useFetchSingleUser(uuid = 1) {
    const { data, error, isLoading } = useSWR(`/user/user/${uuid}/view`)
    const user = data?.data
    return {
        user,
        isLoading,
        isError: error
    }
}

export async function useCreateSingleUser({ first_name, last_name, email }) {

    const { publicAxios } = useAxios();

    const { data, error } = await publicAxios.post(`/user/user/add`, {
        first_name,
        last_name,
        email,
    });
    if (data) {
    }

    return {
        data,
        error
    }
}

