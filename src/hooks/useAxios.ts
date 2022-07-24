import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api from "../libs/axios";

export type AxiosConfig = { [key: string]: any }

type UseAxios<ResponseType> = {
    axiosFetch: (
        url: string,
        method: string,
        data?: AxiosConfig,
        params?: AxiosConfig
    ) => Promise<ResponseType>;
    data: ResponseType | null;
    error: AxiosError | null;
    loaded: boolean;
};

const useAxios = <ResponseType>(): UseAxios<ResponseType> => {
    const [data, setData] = useState<ResponseType | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [controller, setController] = useState<AbortController | null>(null);

    const axiosFetch = async (
        url: string,
        method: string,
        data: AxiosConfig = {},
        params: AxiosConfig = { sortBy: "createdAt", order: "desc" }
    ) => {
        const controller = new AbortController();
        setController(controller);

        try {
            const response = await api.request<ResponseType>({
                data,
                params,
                signal: controller.signal,
                method,
                url,
            });

            setData(response.data);

            return Promise.resolve(response.data);
        } catch (error: any) {
            setError(error);
            return Promise.reject(error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        return () => controller?.abort();
    }, [controller]);

    return { data, error, loaded, axiosFetch };
};

export default useAxios;
