import {
    GET_ORDER,
    GET_ORDERDETAIL,
    PUT_DELEVERYCP,
    PUT_DATE
} from '../modules/OrderModule';
import {GET_DASHBOARD} from '../modules/OrderDashBoardModule';
import {GET_CLAIM} from '../modules/QuestionModules';

/* [관리자] 주문 대시보드 */
export const callOrderDashBoardAPI = () => {
    console.log("▷ [callOrderDashBoardAPI]");
    
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-dashboard`;

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
        if(result.status === 200) dispatch({type: GET_DASHBOARD,  payload: result.data});
    };
};

/* [관리자] 주문 대시보드 */
export const callClaimDashBoardClaimAPI = () => {
    console.log("▷ [callClaimDashBoardClaimAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question-dashboard`;

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
        if(result.status === 200) dispatch({type: GET_CLAIM,  payload: result.data});
    };
};

/* [관리자] 주문 내역 조회 */
export const callOrderListAPI = ({currentPage}) => {
    console.log("▷ [callOrderListAPI]");

    let requestURL;
    if(currentPage !== undefined || currentPage !== null) requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management?offset=${currentPage}`;
    else requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management`;

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
        if(result.status === 200) dispatch({type: GET_ORDER,  payload: result.data});
    };
};

/* [관리자] 주문 내역 검색 결과 조회 */
export const callOrderSearchAPI = ({searchDate, searchTitle, searchValue}) => {
    console.log("▷ [callOrderSearchAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/search?s1=${searchDate}&s2=${searchTitle}&s3=${searchValue}`;

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
        dispatch({type: GET_ORDER, payload: result.data});
        // result.status === 200 구문 대신 화면단에서 삼 항 연산자를 사용하여 막을 수 있도록 함
    };
    
};

/* [관리자] 주문 내역 상세 조회 */
export const callOrderDetailAPI = ({orderCode}) => {
    console.log("▷ [callOrderDetailAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/${orderCode}`;

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
        if(result.status === 200) dispatch({type: GET_ORDERDETAIL,  payload: result.data});
    };
};

/* [관리자] 주문 내역 택배사 및 송장번호 입력 */
export const callDeliveryCpUpdateAPI = ({orderCode, form}) => {
    console.log("▷ [callDeliveryCpUpdateAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/${orderCode}/delivery-update`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());
        dispatch({ type: PUT_DELEVERYCP,  payload: result });
    };
};

/* [관리자] 발주확인, 배송완료처리, 주문취소처리, 반품접수, 반품완료처리 */
export const callHistoryUpdateAPI = ({orderCode, updateKind}) => {
    console.log("▷ [callHistoryUpdateAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/${orderCode}/history-update/${updateKind}`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        dispatch({ type: PUT_DATE,  payload: result });
    };
};