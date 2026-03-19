import useSWR from 'swr';
import { useAxios } from '../context/AxiosContext';

export function useFetchDashboardOverview() {
    const { publicAxios } = useAxios();

    const fetcher = (url) => publicAxios.get(url).then((res) => res.data);

    const { data, error, isLoading, mutate } = useSWR(
        'user/dashboard/overview',
        fetcher
    );

    return {
        data: data?.data,
        isLoading,
        isError: error,
        mutate
    };
}
