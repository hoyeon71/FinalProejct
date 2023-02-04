import { 
    GET_MEMBER
  , PUT_MEMBER
  , POST_LOGIN
  , POST_REGISTER
  , GET_MEMBERLIST
  
} from '../modules/MemberModule';
import axios from 'axios';

/** =========================마이페이지 프로필 조회 [전진이]================================= */
export const callGetMemberAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/profileUpdate/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[MemberAPICalls] callGetMemberAPI SUCCESS');
            dispatch({ type: GET_MEMBER,  payload: result.data });
        }
        
    };
}

/** =========================마이페이지 프로필 수정 [전진이]================================= */
export const callMemberUpdateAPI = ({form}) => {
    console.log('[MemberAPICalls] callMemberUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/profileUpdate`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callMemberUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_MEMBER,  payload: result });
        
    };    
}


/** =========================로그인[전진이]================================= */
export const callLoginAPI = ({form}) => {
  const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/auth/login`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Access-Control-Allow-Origin": "*"      
          },
          body: JSON.stringify({
              memberId: form.memberId,
              memberPassword: form.memberPassword
          })
      })
      .then(response => response.json());

      console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
      if(result.status === 200){
          window.localStorage.setItem('accessToken', result.data.accessToken);            
      }
      dispatch({ type: POST_LOGIN,  payload: result });
      
  };
}
/** =========================로그아웃[전진이]========================= */
export const callLogoutAPI = () => { 
    
  return async (dispatch, getState) => {            

      dispatch({ type: POST_LOGIN,  payload: '' });        
      console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
  };
}

/** =========================회원가입[전진이]================================ */
export const callRegisterAPI = ({form}) => {
  const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/auth/signup`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "*/*"
          },
          body: JSON.stringify({
              memberId: form.memberId,
              memberPassword: form.memberPassword,
              memberName: form.memberName,
              memberBirth: form.memberBirth,
              memberGen: form.memberGen,
              memberPhone: form.memberPhone,
              memberEmail: form.memberEmail,
              memberAdsNum: form.memberAdsNum,
              memberAds: form.memberAds,
              memberAdsDetail: form.memberAdsDetail                
          })
      })
      .then(response => response.json());

      console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);        
      
      if(result.status === 201){
          dispatch({ type: POST_REGISTER,  payload: result });
      }        
  };
}

//=======================ID 중복체크[전진이]==============================//
//response가 존재하면, return_value = response, response가 존재하지 않으면, return value = true
export const idCheckAPI = async(memberId) => {
    let return_value;
    await axios.get('http://localhost:8080/auth/check?memberId=' + memberId
       
    )
    .then((response) => {
        console.log(response.data);
        return_value = response.data;
    })
    .catch(function (error) {
        console.log(error);
        console.log(memberId);
        return_value = true;
    });
    return return_value
};



export const callGetMemberListAPI = ({currentPage}) => {
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/memberList?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/memberList`;
    }
    console.log(currentPage);
    console.log('[MemberAPICalls] requestURL : ', requestURL);

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
        if (result.status === 200) {
            console.log('[QuestionAPICalls] callQuestionListAPI RESULT : ', result);
            dispatch({ type: GET_MEMBERLIST, payload: result.data });
        }
        
    };
}
