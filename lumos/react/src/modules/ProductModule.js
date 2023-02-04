import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_PRODUCT            = 'product/GET_PRODUCT';
export const GET_PRODUCTS           = 'product/GET_PRODUCTS';
export const GET_PRODUCTS_LED       = 'product/GET_PRODUCTS_LED';
export const GET_PRODUCTS_LAMP      = 'product/GET_PRODUCTS_LAMP';
export const GET_PRODUCTS_PENDANT   = 'product/GET_PRODUCTS_PENDANT';
export const GET_PRODUCTS_DOWNLIGHT = 'product/GET_PRODUCTS_DOWNLIGHT';
export const GET_PRODUCTS_SWITCH    = 'product/GET_PRODUCTS_SWITCH';
export const POST_PRODUCT           = 'product/POST_PRODUCT';
export const PUT_PRODUCT            = 'product/PUT_PRODUCT';
export const DELETE_PRODUCT         = 'product/DELETE_PRODUCT';

const actions = createActions({
    [GET_PRODUCT]: () => {},
    [GET_PRODUCTS]: () => {},
    [GET_PRODUCTS_LED]: () => {},
    [GET_PRODUCTS_LAMP]: () => {},
    [GET_PRODUCTS_PENDANT]: () => {},
    [GET_PRODUCTS_DOWNLIGHT]: () => {},
    [GET_PRODUCTS_SWITCH]: () => {},
    [POST_PRODUCT]: () => {},
    [PUT_PRODUCT]: () => {},
    [DELETE_PRODUCT]: () => {}
});

/* 리듀서 */
const productReducer = handleActions(
    {
        [GET_PRODUCT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_PRODUCTS]: (state, { payload }) => {
            
            return payload;
        },
        [GET_PRODUCTS_LED]: (state, { payload }) => {
            
            return payload;
        },
        [GET_PRODUCTS_LAMP]: (state, { payload }) => {
            
            return payload;
        },
        [GET_PRODUCTS_PENDANT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_PRODUCTS_DOWNLIGHT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_PRODUCTS_SWITCH]: (state, { payload }) => {
            
            return payload;
        },
        [POST_PRODUCT]: (state, { payload }) => {

            return payload;
        },
        [PUT_PRODUCT]: (state, { payload }) => {

            return payload;
        },
        [DELETE_PRODUCT]: (state, { payload }) => {

            return payload;
        }           
    },
    initialState
);



export default productReducer;