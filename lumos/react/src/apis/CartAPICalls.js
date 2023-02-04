import {
    POST_ITEM,
    GET_ORDER,
    PUT_ITEM,
    DELETE_ITEM,
    PUT_ORDER
} from '../modules/CartModule';
import {GET_OPTION} from '../modules/CartOptionModule';

/* 장바구니 상품 추가 및 신규 생성 */
export const callPostItemAPI = ({memberId, form}) => {
    console.log("▷ [callPostItemAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());
        dispatch({ type: POST_ITEM,  payload: result });
    };    
};

/* 장바구니 조회 */
export const callCartDetailAPI = ({memberId}) => {
    console.log("▷ [callCartDetailAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}`;

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

/* 장바구니 제품 옵션 정보 */
export const callProductOptionAPI = () => {
    console.log("▷ [callProductOptionAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/option-info`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200) dispatch({ type: GET_OPTION,  payload: result.data});
    };
};

/* 장바구니 제품 수량 수정 */
export const callAmountUpdateAPI = ({memberId, opCode, amount}) => {
    console.log("▷ [callAmountUpdateAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}/amount-update/${opCode}/${amount}`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        dispatch({ type: PUT_ITEM,  payload: result });
    };
};

/* 장바구니 상품 삭제 */
export const callItemDeleteAPI = ({memberId, orderPdNum}) => {
    console.log("▷ [callItemDeleteAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}/item-delete/${orderPdNum}`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            } 
        })
        .then(response => response.json());
        if(result.status === 200) dispatch({type: DELETE_ITEM,  payload: result.data});
    };
};

/* 결제 버튼 클릭 */
export const callPurchaseAPI = ({orderCode, form}) => {
    console.log("▷ [callPurchaseAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${orderCode}/purchase`;

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
        dispatch({ type: PUT_ORDER,  payload: result });
    };    
};