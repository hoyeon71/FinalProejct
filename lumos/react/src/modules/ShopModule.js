import {createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_SHOPINFO = 'shop/GET_SHOPINFO';
export const PUT_SHOPINFO = 'shop/PUT_SHOPINFO';

const actions = createActions({
    [GET_SHOPINFO] : () => {},
    [PUT_SHOPINFO] : () => {}
});

const shopReducer = handleActions(
    {
        [GET_SHOPINFO] : (state, { payload }) => {
            return payload;
        },
        [PUT_SHOPINFO] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default shopReducer;