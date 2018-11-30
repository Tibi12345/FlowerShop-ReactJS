export const API_REQUEST = "[app] API Request";

export const apiRequest = (method, url, body, onSucces, onError) => ({
    type: API_REQUEST,
    payload: body,
    meta: { method, url, onSucces, onError }
});