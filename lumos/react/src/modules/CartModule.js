import {createActions, handleActions} from 'redux-actions';

const initialState = [];

/* 주문 상품 추가 (장바구니 조회 및 생성) */
export const POST_ITEM      = 'cart/POST_ITEM';

/* 주문 상품 조회 (장바구니 조회 및 생성) */
export const GET_ORDER      = 'cart/GET_ORDER';

/* 주문 수량 수정 */
export const PUT_ITEM       = 'cart/PUT_ITEM';

/* 주문 제품 삭제 */
export const DELETE_ITEM    = 'cart/DELETE_ITEM';

/* 결제 버튼 클릭 */
export const PUT_ORDER      = 'cart/PUT_ORDER';

const actions = createActions({
    [POST_ITEM] : () => {},
    [GET_ORDER] : () => {},
    [PUT_ITEM] : () => {},
    [DELETE_ITEM] : () => {},
    [PUT_ORDER] : () => {}
});

const cartReducer = handleActions(
    {
        [POST_ITEM] : (state, { payload }) => {
            return payload;
        },
        [GET_ORDER] : (state, { payload }) => {
            return payload;
        },
        [PUT_ITEM] : (state, { payload }) => {
            return payload;
        },
        [DELETE_ITEM] : (state, { payload }) => {
            return payload;
        },
        [PUT_ORDER] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default cartReducer;