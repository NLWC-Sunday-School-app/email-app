import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


export function useListEmailServices({ search = '', page_size = 10, page = 1 }) {



    const { data, error, isLoading, mutate } = useSWR(`/user/services/list?search=${search}&page_size=${page_size}&page=${page}`)

    const user = data?.data?.data
    return {
        user,
        isLoading,
        isError: error,
        mutate
    }
}

export function useFetchSingleService({ uuid }) {
    const { data, error, isLoading, mutate } = useSWR((uuid && uuid != 'undefined') ? `/user/services/${uuid}/view` : null)
    return {
        data: data?.data?.data,
        isLoading,
        isError: error,
        mutate
    }
}
// 1b640f0f-b29a-468f-a043-afa094e14224

export function useEditSingleService({ uuid, name, accessKey, secretAccessKey, region, configSetName, apiKey, webhookKey, domain, zone, smtpHost, smtpPort, encryption, userName, password }) {
    const { data, error, isLoading } = publicAxios.post(`/user/services/${uuid}/edit`, {
        name,
        accessKey,
        secretAccessKey,
        region,
        configSetName,
        apiKey,
        webhookKey,
        domain,
        zone,
        smtpHost,
        smtpPort,
        encryption,
        userName,
        password
    })
    return {
        data: data?.data?.data,
        isLoading,
        isError: error,
        mutate
    }
}
