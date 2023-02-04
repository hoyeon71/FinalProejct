import { 
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_LED,
    GET_PRODUCTS_LAMP,
    GET_PRODUCTS_PENDANT,
    GET_PRODUCTS_DOWNLIGHT,
    GET_PRODUCTS_SWITCH,
    POST_PRODUCT,
    PUT_PRODUCT,
    DELETE_PRODUCT
} from '../modules/ProductModule.js';

export const callSearchProductAPI = ({search}) => {
    console.log('[ProduceAPICalls] callSearchProductAPI Call');

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/search?s=${search}`;
    
    console.log('search', search);
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callSearchProductAPI RESULT : ', result);

        dispatch({ type: GET_PRODUCTS,  payload: result.data });
        
    };    
};


export const callProductRegistAPI = ({form}) => {
    console.log('[ProduceAPICalls] callProductRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products`;

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

        console.log('[ProduceAPICalls] callProductRegistAPI RESULT : ', result);

        dispatch({ type: POST_PRODUCT,  payload: result });
        
    };    
}

export const callProductUpdateAPI = ({form}) => {
    console.log('[ProduceAPICalls] callProductUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products`;

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

        console.log('[ProduceAPICalls] callProductUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_PRODUCT,  payload: result });
        
    };    
}

export const callProductDeleteAPI = ({imgNum}) => {
    console.log('[ProduceAPICalls] callProductDeleteAPI Call');

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/${imgNum}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callProductDeleteAPI RESULT : ', result);

        dispatch({ type: DELETE_PRODUCT,  payload: result });
        
    };    
}

export const callProductDetailForAdminAPI = ({imgNum}) => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products-management/${imgNum}`;

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

        console.log('[ProduceAPICalls] callProductDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductDetailAPI SUCCESS');
            dispatch({ type: GET_PRODUCT,  payload: result.data });
        }

    };
}

export const callProductDetailAPI = ({productCode}) => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/${productCode}`;

    return async (dispatch, getState) => {


        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callProductDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductDetailAPI SUCCESS');
            dispatch({ type: GET_PRODUCT,  payload: result.data });
        }
        
    };
}

export const callProductListForAdminAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products-management?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products-management`;
    }
    
    console.log('[ProduceAPICalls] requestURL : ', requestURL);

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
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListForAdminAPI RESULT : ', result);
            dispatch({ type: GET_PRODUCTS,  payload: result.data });
        }
        
    };
}


export const callProductListAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products`;
    }
    
    console.log('[ProduceAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductAPI RESULT : ', result);
            dispatch({ type: GET_PRODUCTS,  payload: result.data });
        }
        
    };
}

export const callProductListForNavAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
            dispatch({ type: GET_PRODUCTS,  payload: result.data });
        }
        
    };
}

export const callProductListAboutLEDAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/led`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_LED,  payload: result.data });
        }
        
    };
}

export const callProductListAboutLAMPAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/lamp`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_LAMP,  payload: result.data });
        }
        
    };
}

export const callProductListAboutPENDANTAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/pendant`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_PENDANT,  payload: result.data });
        }
        
    };
}

export const callProductListAboutDOWNLIGHTAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/downlight`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_DOWNLIGHT,  payload: result.data });
        }
        
    };
}

export const callProductListAboutSWITCHAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/products/switch`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_SWITCH,  payload: result.data });
        }
        
    };
}