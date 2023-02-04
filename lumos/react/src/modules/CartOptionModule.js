import {createActions, handleActions} from 'redux-actions';

const initialState = [];

/* 결제 버튼 클릭 */
export const GET_OPTION = 'cart/GET_OPTION';

const actions = createActions({
    [GET_OPTION] : () => {},
});

const cartoptionReducer = handleActions(
    {
        [GET_OPTION] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default cartoptionReducer;