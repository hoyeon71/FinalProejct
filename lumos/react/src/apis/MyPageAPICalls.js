import {GET_MYORDER} from '../modules/MyOrderModule';

/* [회원] 주문 내역 조회 */
export const callMyOrderListAPI = ({memberId}) => {
    console.log("▷ [callMyOrderListAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/mypage/order/${memberId}`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            } 
        })
        .then(response => response.json());
        if(result.status === 200) dispatch({type: GET_MYORDER,  payload: result.data});
    };
};