import {createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_COMPANYINFO = 'company/GET_COMPANYINFO';
export const PUT_COMPANYINFO = 'company/PUT_COMPANYINFO';

const actions = createActions({
    [GET_COMPANYINFO] : () => {},
    [PUT_COMPANYINFO] : () => {}
});

const companyReducer = handleActions(
    {
        [GET_COMPANYINFO] : (state, { payload }) => {
            return payload;
        },
        [PUT_COMPANYINFO] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default companyReducer;