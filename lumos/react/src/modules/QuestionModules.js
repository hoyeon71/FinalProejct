import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_QUESTION = 'question/POST_QUESTION';
export const GET_QUESTION = 'question/GET_QUESTION';
export const GET_QUESTIONS = 'question/GET_QUESTIONS';
export const PUT_QUESTION = 'question/PUT_QUESTION';
export const GET_ALLQUESTIONS = 'question/GET_ALLQUESTIONS';
export const PUT_ANSWER = 'question/PUT_ANSWER';
export const GET_QUESTIONADMIN = 'question/GET_QUESTIONADMIN';
export const GET_NEWQUESTIONCODE = 'question/GET_NEWQUESTIONCODE';
export const DELETE_QUESTION = 'question/DELETE_QUESTION';

/* [구도연] */ export const GET_CLAIM = 'question/GET_CLAIM';

const actions = createActions({
    [POST_QUESTION]: () => {},
    [GET_QUESTION]: () => {},
    [GET_QUESTIONS]: () => {},
    [PUT_QUESTION]: () => { },
    [GET_ALLQUESTIONS]: () => {},
    [PUT_ANSWER]: () => {},
    [GET_QUESTIONADMIN]: () => {},
    [GET_NEWQUESTIONCODE]: () => {},
    [GET_CLAIM]: () => {},
    [DELETE_QUESTION]: () => {}

});

/* 리듀서 */
const questionReducer = handleActions(
    {
        
        [POST_QUESTION]: (state, { payload }) => {

            return payload;
        },
        [GET_QUESTION]: (state, { payload }) => {
            
            return payload;
        },  
        [GET_QUESTIONS]: (state, { payload }) => {

            return payload;
        },
        [PUT_QUESTION]: (state, { payload }) => {

            return payload;
        },
        [GET_ALLQUESTIONS]: (state, { payload }) => {

            return payload;
        },
        [PUT_ANSWER]: (state, { payload }) => {

            return payload;
        },
        [GET_QUESTIONADMIN]: (state, { payload }) => {

            return payload;
        },
        [GET_NEWQUESTIONCODE]: (state, { payload }) => {

            return payload;
        },    
        [GET_CLAIM]: (state, { payload }) => {

            return payload;
        },    
        [DELETE_QUESTION]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default questionReducer;