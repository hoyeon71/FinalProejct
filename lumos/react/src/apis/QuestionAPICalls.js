import {
    POST_QUESTION,
    GET_QUESTION,
    GET_QUESTIONS,
    PUT_QUESTION, 
    GET_ALLQUESTIONS,
    PUT_ANSWER,
    GET_QUESTIONADMIN,
    GET_NEWQUESTIONCODE,
    DELETE_QUESTION
} from '../modules/QuestionModules'

/* 문의사항 등록 */ 
export const callQuestionRegistAPI = ({ form, memberId }) => {
    console.log('[QuestionAPICalls] callQuestionRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question`;
    const requestURL2 = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/newQuestionCode/${memberId}`;
    

    return async (dispatch, getState) => {
        // console.log(form.data.memberId);
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"   
            },
            body: form
        })
        .then();

        console.log('[QuestionAPICalls] callQuestionRegistAPI RESULT : ', result);

        // dispatch({ type: POST_QUESTION,  payload: result });
       
        console.log('[QuestionAPICalls] callNewQuestionCodeAPI requestURL : ', requestURL2);
        // console.log(memberId)
    
        const result2 = await fetch(requestURL2, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result2.status === 200){
            console.log('[QuestionAPICalls] callNewQuestionCodeAPI RESULT : ', result2);
            console.log(result2.data)
            dispatch({ type: GET_NEWQUESTIONCODE,  payload: result2.data });
        }
            
    };       
}

/* 회원별 문의사항 조회 */
  export const callQuestionListAPI = ({memberId, currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/${memberId}?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/${memberId}`;
    }
    console.log(currentPage);
    console.log(memberId);
    console.log('[QuestionAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[QuestionAPICalls] callQuestionListAPI RESULT : ', result);
            dispatch({ type: GET_QUESTIONS,  payload: result.data });
        }
        
    };
}

/* 문의 사항 상세 조회 */ 
export const callQuestionDetailAPI = ({questionCode}) => {
    
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/detail/${questionCode}`;
    
    console.log('[QuestionAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[QuestionAPICalls] callQuestionDetailAPI RESULT : ', result);
            dispatch({ type: GET_QUESTION,  payload: result.data });
        }
        
    };
}

/* 문의사항 수정 */
export const callQuestionUpdateAPI = ({ form }) => {
    console.log('[QuestionAPICalls] callQuestionUpdateAPI Call');
       
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/detail/${form.questionCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*" 
            },  
            body: form
            })
        .then();
        
        console.log('[QuestionAPICalls] callQuestionUpdateAPI RESULT : ', result);
        
        dispatch({ type: PUT_QUESTION,  payload: result });
        
    }
};    

/* 관리자 문의사항 전체 조회  */
export const callAdminQuestionListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/list?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/list`;
    }
    console.log(currentPage);
    console.log('[QuestionAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[QuestionAPICalls] callQuestionListAPI RESULT : ', result);
            dispatch({ type: GET_ALLQUESTIONS,  payload: result.data });
        }
        
    };
}

/* 관리자 문의사항 답변 등록 */
export const callAnswerUpdateAPI = ({ form }) => {
    console.log('[QuestionAPICalls] callAnswerUpdateAPI Call');
       
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/questionAnswer/${form.questionCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify({
                questionStatus: '해결',
                answerContent: form.answerContent,
                questionCode: form.questionCode,
                questionTitle: form.questionTitle,
                questionContent: form.questionContent, 
                newName: form.newName,
                answerContent: form.answerContent,
                questionCategory: form.questionCategory,
            })
            })
        .then();
        
        console.log('[QuestionAPICalls] callAnswerUpdateAPI RESULT : ', result);
        
        dispatch({ type: PUT_ANSWER,  payload: result });
        
    }
};    

/* 관리자 문의 사항 상세 조회 */ 
export const callQuestionDetailAdminAPI = ({questionCode}) => {
    
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/detail/admin/${questionCode}`;
    
    console.log('[QuestionAPICalls] callQuestionDetailAdminAPI requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[QuestionAPICalls] callQuestionDetailAdminAPI RESULT : ', result);
            dispatch({ type: GET_QUESTIONADMIN,  payload: result.data });
        }
        
    };
}

export const callNewQuestionCodeAPI = ({memberId}) => {
    
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/newQuestionCode/${memberId}`;
    
    console.log('[QuestionAPICalls] callNewQuestionCodeAPI requestURL : ', requestURL);
    console.log(memberId)
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[QuestionAPICalls] callNewQuestionCodeAPI RESULT : ', result);
            console.log(result.data)
            dispatch({ type: GET_NEWQUESTIONCODE,  payload: result.data });
        }
        
    };
}

export const callQuestionDeleteAPI = ({questionCode}) => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/delete/${questionCode}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            } 
        })
        .then(response => response.json());

        console.log("[callQuestionDeleteAPI] RESULT : ▶ ", result);
        if(result.status === 200) {
            console.log("[callQuestionDeleteAPI] SUCCESS ◀ ");
            dispatch({type: DELETE_QUESTION,  payload: result.data});
        }
    };
}