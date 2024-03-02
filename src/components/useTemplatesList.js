import { useAuth } from "@/context/AuthContext";
import React from "react";
export function useTemplatesList({ fetchDelay = 0 } = {}) {
    const [items, setItems] = React.useState([{ name: "New Template", uuid: "-1" }]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const limit = 10; // Number of items per page, adjust as necessary
    // const page = 1
    const { accesstoken } = useAuth();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accesstoken}`);


    const loadPokemon = async (page) => {
        const controller = new AbortController();
        const { signal } = controller;
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
            signal
        };

        try {
            setIsLoading(true);

            if (page > 1) {
                // Delay to simulate network latency
                await new Promise((resolve) => setTimeout(resolve, fetchDelay));
            } else {
            }

            let res = await fetch(
                `http://127.0.0.1:8234/api/user/template/list?page=${page}&limit=${limit}`,
                requestOptions,
            );


            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            let json = await res.json();
            // console.log(json)

            setHasMore(json?.meta?.current_page !== json?.meta?.last_page);
            // Append new results to existing ones
            // setItems((prevItems) => [...prevItems, ...json.data]);
            setItems((prevItems) => {
                // Extract UUIDs from prevItems
                const existingUUIDs = prevItems.map(item => item.uuid);

                // Filter json.data to exclude items with UUIDs that already exist in prevItems
                const newData = json.data.filter(item => !existingUUIDs.includes(item.uuid));

                // Concatenate prevItems with newData
                return [...prevItems, ...newData];
            });

        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                console.error("There was an error with the fetch operation:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadPokemon(page);
    }, []);

    const onLoadMore = () => {
        const newPage = page + 1;

        setPage(newPage);
        loadPokemon(newPage);
    };

    return {
        items,
        hasMore,
        isLoading,
        onLoadMore,
    };
};
