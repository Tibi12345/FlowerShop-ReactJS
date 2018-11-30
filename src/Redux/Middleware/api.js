import { API_REQUEST } from "../Actions/api"
 
// this middleware cares only for API calls
export const api = ({ dispatch }) => next => action => {
    if (action.type === API_REQUEST) {
        const { method, url, onSucces, onError } = action.meta;

        fetch(url, { method })
        .then(response => response.json())
        .then(data => dispatch({ type: onSucces, payload: data }))
        .catch(error => dispatch({ type: onError, payload: error }));
    }
    return next(action);
};