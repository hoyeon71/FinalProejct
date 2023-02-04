import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';

import {callOrderDetailAPI} from '../../apis/OrderAPICalls';

import HeadLine from '../../components/order_detail/HeadLine';
import Delivery from '../../components/order_detail/Delivery';
import OrderProcessingHistory from '../../components/order_detail/OrderProcessingHistory';
import Consignee from '../../components/order_detail/Consignee';
import OrderProduct from '../../components/order_detail/OrderProduct';
import Payment from '../../components/order_detail/Payment';
import Orderer from '../../components/order_detail/Orderer';

import OrderDetailCSS from './OrderDetail.module.css';

import LoginModal from '../../components/common/LoginModal';
import {decodeJwt} from '../../utils/tokenUtils';
import ErrorMindol from '../ErrorMindol';

export default function OrderDetail() {

    console.log("▶ OrderDetail ◀");

    const [loginModal, setLoginModal] = useState(false); 
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const isAdmin = token.auth.includes("ROLE_ADMIN");
    const dispatch = useDispatch();
    const params = useParams();
    const order  = useSelector(state => state.orderReducer); 
    // console.log("▶ OrderDetail ◀ order type", typeof(order));

    useEffect(
        () => {
            if (token.exp * 1000 < Date.now()) {
                alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
                setLoginModal(true);
                return;
            }
            dispatch(callOrderDetailAPI({	
                orderCode: params.orderCode
            }));
        }
        ,[]
    );

    /* 
        ▼ 아래 적힌 조건식의 이유
        1. 아무것도 적지 않은 경우
            마운트 시점에 order는 이전페이지의 데이터가 넘어옴 (스토어에 있던 기존 데이터)
            ∴ 아래의 컴포넌트가 오류를 발생시켜 useEffect 자체가 동작하지 않고,
            그로인해 새로운 state를 얻어올 수 없어 페이지를 만들지 못함
        2. !Array.isArray(order.data)
            첫 번째 시점에 기존 스토어의 데이터(리스트)가, 두 번째 시점엔(객체)가 넘어옴
            ∴ 첫 번째 시점(페이지 입장)과 두 번째 시점(F5)을 order.data가 배열인지 여부로 판단할 경우
            첫 번째 시점은 이전 페이지의 데이터(배열)이기에 당연히 막을 수 있지만,
            두 번째 시점의 데이터는 빈 배열로 넘어오기에 또한 컴포넌트가 렌더링 되지 않음
        3. order.orderCode === params.orderCode
            해당 페이지와 관련하여 고정 불변한 값으로 true, false의 기준으로 삼기에 용이함
        4. order.orderCode
            3번의 축약형
    */

    return (
        <>
            {loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            {
                isAdmin
                ?
                <>
                    {order.orderCode &&
                    <div className={OrderDetailCSS.boxing}>
                        {console.log("▶ OrderDetail ◀ rendering component")}
                        <div className={OrderDetailCSS.header}>
                            <HeadLine key={order.orderCode} order={order}/>
                        </div>
                        <div className={OrderDetailCSS.content}>
                            <div className={OrderDetailCSS.left}>
                                <div className={OrderDetailCSS.leftTh}>
                                    <Delivery key={order.orderCode} order={order}/>
                                </div>
                                <div className={OrderDetailCSS.leftTh}>
                                    <Consignee key={order.orderCode} order={order}/>
                                </div>
                                <div>
                                    <OrderProduct key={order.orderCode} order={order}/>
                                </div>
                            </div>
                            <div className={OrderDetailCSS.right}>
                                <div>
                                    <Payment key={order.orderCode} order={order}/>
                                </div>
                                <div>
                                    <Orderer key={order.orderCode} order={order}/>
                                </div>
                                <div>
                                    <OrderProcessingHistory key={order.orderCode} order={order}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </>
                :
                <ErrorMindol/>
            }
        </>
    )
}