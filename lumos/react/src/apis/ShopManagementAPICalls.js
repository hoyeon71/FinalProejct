import {GET_COMPANYINFO, PUT_COMPANYINFO} from '../modules/CompanyModule';
import {GET_SHOPINFO, PUT_SHOPINFO} from '../modules/ShopModule';

/* 사업자 정보 */
export const callCompanyInfoAPI = () => {
    console.log("▷ [callCompanyInfoAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/company-management`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                // 푸터 정보 열람 시 주석
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            } 
        })
        .then(response => response.json());
        if(result.status === 200) dispatch({type: GET_COMPANYINFO,  payload: result.data});
    };
};

/* 쇼핑몰 정보 */
export const callShopInfolAPI = () => {
    console.log("▷ [callShopInfolAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/shop-management`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                // 푸터 정보 열람 시 주석
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            } 
        })
        .then(response => response.json());
        if(result.status === 200) dispatch({type: GET_SHOPINFO,  payload: result.data});
    };
};

/* 사업자 정보 저장 */
export const callCompanyInfoUpdateAPI = ({form}) => {
    console.log("▷ [callCompanyInfoUpdateAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/company-management/update`;

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
        dispatch({ type: PUT_COMPANYINFO,  payload: result });
    };
}

/* 쇼핑몰 정보 저장 */
export const callShopInfoUpdateAPI = ({form}) => {
    console.log("▷ [callShopInfoUpdateAPI]");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/shop-management/update`;

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
        dispatch({ type: PUT_SHOPINFO,  payload: result });
    };
}