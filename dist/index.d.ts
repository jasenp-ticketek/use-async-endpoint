import { AxiosError } from "axios";
interface IConfig {
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: any;
}
interface IState {
    data: any;
    headers: any;
    isComplete: boolean;
    isPending: boolean;
    statusCode?: string;
    statusText?: string;
    hasError: boolean;
    errorInfo?: AxiosError;
}
export declare function createAsyncEndpoint(baseURL: string): (config: IConfig) => (import("axios").Canceler | IState)[];
export {};
