import {createActions, handleActions} from 'redux-actions';

const initialState = [];

/* 주문 목록 조회 */
export const GET_MYORDER        = 'mypage/GET_MYORDER';

const actions = createActions({
    [GET_MYORDER] : () => {}
});

const myOrderReducer = handleActions(
    {
        [GET_MYORDER] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default myOrderReducer;