import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_REVIEW     = 'review/GET_REVIEW';
export const GET_REVIEWS    = 'review/GET_REVIEWS';
export const POST_REVIEW    = 'review/POST_REVIEW';
export const PUT_REVIEW     = 'review/PUT_REVIEW';
export const DELETE_REVIEW  = 'review/DELETE_REVIEW';
export const GET_MYREVIEWS  = 'review/GET_MYREVIEW';

const actions = createActions({
    [GET_REVIEW]: () => {},
    [GET_REVIEWS]: () => {},
    [POST_REVIEW]: () => {},
    [PUT_REVIEW]: () => {},
    [DELETE_REVIEW]: () => {},
    [GET_MYREVIEWS]: () => {}
});

const reviewReducer = handleActions(
    {
        [GET_REVIEW]: (state, { payload }) => {
            return payload;
        },
        [GET_REVIEWS]: (state, { payload }) => {
            return payload;
        },
        [POST_REVIEW]: (state, { payload }) => {
            return payload;
        },
        [PUT_REVIEW]: (state, { payload }) => {
            return payload;
        },
        [DELETE_REVIEW]: (state, { payload }) => {
            return payload;
        },
        [GET_MYREVIEWS]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default reviewReducer;