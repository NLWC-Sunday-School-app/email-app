import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


export function useListTemplates({ fetchDelay = 0 } = {}) {
    const [items, setItems] = React.useState([{ name: "No Template" }]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [shouldFetch, setShouldFetch] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const limit = 10; // Number of items per page, adjust as necessary


    const { data, error } = useSWR(shouldFetch ? null : `/user/template/list?page_size=${limit}&page=${page}`)
    if (data) {
        console.log(data?.data)
        setHasMore(data?.data?.meta?.current_page !== data?.data?.meta?.last_page);
        // Append new results to existing ones
        // setItems((prevItems) => [...prevItems, ...data.data]);
    }



    const loadTemplates = async (page) => {
        const controller = new AbortController();
        const { signal } = controller;

        try {
            setIsLoading(true);

            if (page > 1) {
                // Delay to simulate network latency
                await new Promise((resolve) => setTimeout(resolve, fetchDelay));
            } else {
            }

            // let res = await fetch(
            //     `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${limit}`,
            //     { signal },
            // );

            // const { data, error, isLoading } = useSWR(`/user/template/list?page_size=${limit}&page=${page}`)



            // let json = await res.json();


            // if (data) {
            //     let json = data
            //     console.log(json)
            //     setHasMore(json?.meta?.current_page !== json?.meta?.last_page);
            //     // Append new results to existing ones
            //     setItems((prevItems) => [...prevItems, ...json.data]);

            // }

        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                console.error("There was an error with the fetch operation:", error);
            }
        } finally {
            setIsLoading(false);
            setShouldFetch(false);
        }
    };

    React.useEffect(() => {
        setShouldFetch(true);
        loadTemplates(page);
    }, []);

    const onLoadMore = () => {
        const newPage = page + 1;

        setPage(newPage);
        setShouldFetch(true);
        loadTemplates(newPage);
    };

    return {
        items,
        hasMore,
        isLoading,
        onLoadMore,
    };
};

export function useListAllTemplates({ search, page_size = 10, page = 1 }) {
    const { data, error, isLoading, mutate } = useSWR(`/user/template/list?search=${search}&page_size=${page_size}&page=${page}`)

    const user = data?.data
    return {
        user,
        isLoading,
        isError: error,
        mutate
    }
}

export function useFetchSingleTemplate({ uuid }) {
    const { data, error, isLoading, mutate } = useSWR((uuid && uuid != 'undefined') ? `/user/template/${uuid}/view` : null)
    return {
        data: data?.data?.data,
        isLoading,
        isError: error,
        mutate
    }
}

// 1b640f0f-b29a-468f-a043-afa094e14224
