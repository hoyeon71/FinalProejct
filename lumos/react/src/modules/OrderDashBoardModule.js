import {createActions, handleActions} from 'redux-actions';

const initialState = [];

/* 주문 목록 조회 */
export const GET_DASHBOARD          = 'dashboard/GET_DASHBOARD';

const actions = createActions({
    [GET_DASHBOARD] : () => {}
});

const dashBoardReducer = handleActions(
    {
        [GET_DASHBOARD] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default dashBoardReducer;