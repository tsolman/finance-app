import * as actions from '../actions'
import _ from 'lodash'

let initialState = {
    table_data: [
        //     {
        //     id: null,
        //     username: null,
        //     purchaseDate: null,
        //     stockName: null,
        //     priceBought: null,
        //     currentPrice: null,
        //     volume: null,
        //     profit: null
        // }
    ],
    stocks: [],
    app: {
        isFetching: false,
    }
}

const financeReducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case actions.GET_USERDATA:
            return {
                ...state,
                table_data: action.data
            }
        case actions.UPDATE_PRICE:
            return {
                ...state,
                stocks: action.data.data
            }
        default:
            return {...state}
    }

};
export default financeReducer;
