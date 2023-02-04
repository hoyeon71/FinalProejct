import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';

import {callMyOrderListAPI} from '../../apis/MyPageAPICalls';
import MyOrder from '../../components/mypage/MyOrder';
import {decodeJwt} from '../../utils/tokenUtils';

export default function OrderList() {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const orderList  = useSelector(state => state.myOrderReducer);  
    const dispatch = useDispatch();
    
    // console.log("orderListorderListorderList", orderList);

    useEffect(
        () => {
            dispatch(callMyOrderListAPI({
                memberId: token.sub
            }));
        },[]
    )
    
    return (
        <>
            <MyOrder orderList={orderList}/>
        </>
    )
}