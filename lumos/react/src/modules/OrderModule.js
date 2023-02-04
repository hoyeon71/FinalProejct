import {createActions, handleActions} from 'redux-actions';

const initialState = [];

/* 주문 목록 조회 */
export const GET_ORDER          = 'order/GET_ORDER';

/* 주문 상세 조회 */
export const GET_ORDERDETAIL    = 'order/GET_ORDERDETAIL';

/* [관리자] 택배사 선택 */
export const PUT_DELEVERYCP     = 'order/PUT_DELEVERYCP';

/* [관리자] 상태 처리 날짜 입력 */
export const PUT_DATE           = 'order/PUT_DATE';

const actions = createActions({
    [GET_ORDER] : () => {},
    [GET_ORDERDETAIL] : () => {},
    [PUT_DELEVERYCP] : () => {},
    [PUT_DATE]: () => { },
});

const orderReducer = handleActions(
    {
        [GET_ORDER] : (state, { payload }) => {
            return payload;
        },
        [GET_ORDERDETAIL] : (state, { payload }) => {
            return payload;
        },
        [PUT_DELEVERYCP] : (state, { payload }) => {
            return payload;
        },
        [PUT_DATE] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default orderReducer;