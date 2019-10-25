import React from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
interface IConfig {
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: any;
}
interface IState<T> {
    data: T | undefined;
    headers: any;
    isComplete: boolean;
    isPending: boolean;
    statusCode?: string;
    statusText?: string;
    hasError: boolean;
    errorInfo?: AxiosError;
}
export declare function createAsyncEndpoint<T>(baseURL: string): (config: IConfig) => (import("axios").Canceler | IState<T> | React.Dispatch<React.SetStateAction<AxiosRequestConfig | undefined>>)[];
export {};
