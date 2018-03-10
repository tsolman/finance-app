import {getAllData} from '../managers/apiManager'

export const GET_USERDATA = 'GET_USERDATA';
export const UPDATE_PRICE = 'UPDATE_PRICE';

export function fetch_userdata() {
    return (dispatch) => {
        getAllData().then(data => {
            dispatch({
                type: GET_USERDATA,
                data: data || 'yoyo'
            })
        });

    }
}


export function changePrice(data) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PRICE,
            data: data || 'yoyo'
        })
    }
}