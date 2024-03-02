import React, { useState } from 'react'
import { useAxios } from "@/context/AxiosContext";
import useSWR from 'swr';



export function useFetchMessages({ search = '', status = '', page_size = 10, page = 1 }) {



    const { data, error, isLoading } = useSWR(`/user/messages/list?search=${search}&status=${status}&page_size=${page_size}&page=${page}`)

    const user = data?.data?.data
    return {
        user,
        isLoading,
        isError: error
    }
}
