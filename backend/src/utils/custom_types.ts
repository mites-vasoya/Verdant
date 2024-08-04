export interface ApiResponse {
    status: 0 | 1;
    message: string;
    data?: any;
}

export interface responseWithData {
    error: boolean,
    message: string,
    data?: any;
}

export interface returnWithData extends responseWithData {
}

export let returnWithDataDefault: returnWithData = {
    error: true,
    message: "",
    data: []
}
