import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import api from "../libs/axios";

type UseAxios<ResponseType> = {
    cancel: () => void;
    data: ResponseType | null;
    error: AxiosError | null;
    loaded: boolean
};

const useAxios = <ResponseType>(
    url: string,
    method: string,
    payload: any
): UseAxios<ResponseType> => {
    const [data, setData] = useState<ResponseType | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    const controllerRef = useRef(new AbortController());

    const cancel = () => controllerRef.current.abort();

    useEffect(() => {
        (async () => {
            try {
                const response = await api.request<ResponseType>({
                    data: payload,
                    signal: controllerRef.current.signal,
                    method,
                    url,
                });

                setData(response.data);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return { cancel, data, error, loaded };
};

export default useAxios