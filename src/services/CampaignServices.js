import React, { useState } from 'react'
import { useAxios } from "@/context/AxiosContext";
import useSWR from 'swr';



export function useFetchCampaigns({ search = '', status = 'QUEUED', page_size = 10, page = 1 }) {



    const { data, error, isLoading } = useSWR(`/user/campaign/list?search=${search}&status=${status}&page_size=${page_size}&page=${page}`)

    const user = data?.data?.data
    return {
        user,
        isLoading,
        isError: error
    }
}

export function useCreateCampaign() {
    const { data, error, isLoading } = useSWR(`/user/campaign/create`)

    const user = data?.data?.data
    return {
        user,
        isLoading,
        isError: error
    }
}

export function useViewOneCampaign({ uuid }) {
    const { data, error, isLoading } = useSWR(`/user/campaign/${uuid}/view`);
    return {
        data: data?.data?.data,
        isLoading,
        isError: error
    }
}
export function useDeleteOneCampaign({ uuid }) {
    const { data, error, isLoading } = useSWR(`/user/campaign/${uuid}/delete`);
    return {
        data: data?.data?.data,
        isLoading,
        isError: error
    }
}

export function canEditQueuedCampaign(givenTime) {
    // Get current time
    const currentTime = new Date();

    // Parse given time and convert it to a Date object
    const givenDateTime = new Date(givenTime);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = givenDateTime.getTime() - currentTime.getTime(); // Use getTime() method to get time in milliseconds

    // Convert milliseconds to minutes
    const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);

    // Check if the time difference is at least thirty minutes
    return timeDifferenceMinutes >= 30;
}


export function useGetCampaignReport({ uuid, type, page_size = 10, page = 1, search = '' }) {
    const { data, error, isLoading } = useSWR(`/user/campaign/${uuid}/report?action=${type}&search=${search}&page_size=${page_size}&page=${page}`);
    // console.log(data)
    return {
        data: data?.data,
        isLoading,
        isError: error
    }
}
