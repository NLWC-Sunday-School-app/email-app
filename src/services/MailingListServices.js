import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


export function useListMailingList({ search = '', page_size = 10, page = 1 }) {
    const { data, error, isLoading, mutate } = useSWR(`/user/mailing-list/list?search=${search}&page_size=${page_size}&page=${page}`)

    const user = data?.data
    return {
        data: user,
        isLoading,
        isError: error,
        mutate
    }
}

export function useFetchSingleMailingList({ uuid }) {
    const { data, error, isLoading, mutate } = useSWR((uuid && uuid != 'undefined') ? `/user/mailing-list/${uuid}/view` : null)
    return {
        data: data?.data?.data,
        isLoading,
        isError: error,
        mutate
    }
}

export function useFetchSingleMailingListSubscribers({ uuid, search = '', page_size = 10, page = 1, type = 'contacts' }) {
    // console.log(uuid)
    const { data, error, isLoading, mutate } = useSWR((uuid && uuid != 'undefined') ? `/user/mailing-list/${uuid}/subscriber/list?search=${search}&page_size=${page_size}&page=${page}&type=${type}` : null)

    return {
        data: data?.data,
        isLoading,
        isError: error,
        mutate
    }
}

export function useCreateMailingList({ name }) {
    const { data, error, isLoading } = useSWR(`/user/mailing-list/create?name=${name}`)
    return {
        data: data?.data?.data,
        isLoading,
        isError: error
    }
}
