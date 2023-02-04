import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import Delivery from '../../components/order_detail/Delivery';
import Consignee from '../../components/order_detail/Consignee';
import OrderProduct from '../../components/order_detail/OrderProduct';
import Payment from '../../components/order_detail/Payment';
import Bill from '../../components/cart_detatil/Bill';

import OrderDetailCSS from '../order/OrderDetail.module.css';
import BtnCSS from '../../components/order_detail/Btn.module.css';
import {callPurchaseAPI} from '../../apis/CartAPICalls';
import {callCartDetailAPI} from '../../apis/CartAPICalls';

import LoginModal from '../../components/common/LoginModal';
import {decodeJwt} from '../../utils/tokenUtils';
import ErrorMindol from '../ErrorMindol';

export default function Cart() {

    const [loginModal, setLoginModal] = useState(false); 
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector(state => state.cartReducer);

    const roleAdmin = token.auth.filter(role => {return role == "ROLE_ADMIN"}).length;
    // const isAdmin = decodeJwt(window.localStorage.getItem("accessToken")).auth.includes("ROLE_ADMIN");
    // console.log("관리자 권한 확인 (roleAdmin)", roleAdmin); // 1
    // console.log("관리자 권한 확인 (isAdmin)", isAdmin);     // true

    const [isOrdered, setIsOrdered] = useState(false);
    
    // console.log("토큰 확인", token);

    useEffect(
        () => {
            if (token.exp * 1000 < Date.now()) {
                alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
                setLoginModal(true);
                return;
            }

            dispatch(callCartDetailAPI({	
                memberId: token.sub
            }));  
        }
        ,[]
    );

    const orderSubmitHandler = () => {
        /* [주문자정보 동일 버튼을 위함] 토큰이 만료되었을때 다시 로그인 */
        // 주문 상품정보와 가격은 그대로 노출됨 (모달창의 css로 가리던지 하여야 함)
        if (token.exp * 1000 < Date.now()) {
            alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
            setLoginModal(true);
            return;
        }

        setIsOrdered(!isOrdered);
    }

    /* 뒤로 가기 이벤트 발생 시 */
    // 로그인 여부 확인할지 말지 애매함
    const location = useLocation();
    window.onpopstate = function(event) {
        var previewPage = document.referrer;
        // console.log("이전 페이지로 이동");
        // console.log("previewPage", previewPage);
        // console.log("dsasad", previewPage.indexOf(`/cart/${token.sub}`));
        if(previewPage.indexOf(`/cart/${token.sub}`) < 0) {
            location.href = `/cart/${token.sub}`;
            window.location.reload();
        } else {
            location.href = `${previewPage}`;
            window.location.reload();
        }
    }

    // ★ props-drilling
    const [orderInfo, setOrderInfo] = useState({
        deliveryMt: '일반택배',
        deliveryMsg: '',
        cgNm: '',
        cgPh: '',
        cgAdsNum: '',
        cgAds: '',
        cgAdsDetail: '',
        paymentMt: '카카오페이',
        orderPc: '',
        deliveryPc: '',
        totalPc: '',
        stOrder: 'N',
        stPayment: ''
    });

    /* ========================= 결제 ========================= */
    // Terminal ▶ npm install jquery ▶ import jQuery from "jquery";
    // const CDN = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
    // const REST_API_KEY = "4728270083760125";
    // const REST_API_SECRET = "11vAK9vuP0nwnZHrA31LHQf0if3XN7I10OhAZutW7G69BNTXRhXrReK7TNBGPZ7hsRLEDnjG5OalmRgN";

    const KEY = "imp26753837";
    var IMP = window.IMP;
    IMP.init(KEY);

    const [isEffectWork, setIsEffectWork] = useState(false);

    const purchaseHandler = () => {
        const deliveryValidatior = (orderInfo.cgNm + orderInfo.cgPh).length;
        console.log(deliveryValidatior);

        if(orderInfo.paymentMt == "카카오페이" && (deliveryValidatior >= 2 && orderInfo.cgAdsNum.length != 0)) {
            IMP.request_pay({
            pg: "kakaopay",
            // pay_method: "card",
            merchant_uid: order.orderNum,
            name: order.orderProductList[0].pdName + "외 " + (order.orderProductList.length - 1) + "건",
            amount: orderInfo.totalPc,
            buyer_email: "12151782@inha.edu",
            buyer_name: "LUMOS",
            buyer_tel: "010-9256-9135",
            buyer_addr: "서울특별시 종로구 인사동길12",
            buyer_postcode: "03163"
            }, rsp => {
                if(rsp.success) {
                    setOrderInfo({
                        ...orderInfo,
                        stOrder: "Y",
                        stPayment: rsp.success.toString()
                    });
                    setIsEffectWork(!isEffectWork);
                } else {
                    // alert("결제에 실패하였습니다.\n메인화면으로 이동합니다.\n");
                    alert(rsp.error_msg);
                    navigate('/');
                }
            });
        } else if(orderInfo.paymentMt == "무통장입금" && (deliveryValidatior >= 2 && orderInfo.cgAdsNum.length != 0)) {
            setOrderInfo({
                ...orderInfo,
                stOrder: "Y",
                stPayment: "입금대기"
            });
            setIsEffectWork(!isEffectWork);
        } else {
            alert("배송지 정보를 모두 입력해 주세요.")
        }
    };
    
    useEffect(
        () => {
            console.log("orderInfo.stOrder", orderInfo.stOrder);
            if(orderInfo.stOrder == "Y") {
                const formData = new FormData();
                formData.append("deliveryMt", orderInfo.deliveryMt);
                formData.append("deliveryMsg", orderInfo.deliveryMsg);
                formData.append("cgNm", orderInfo.cgNm);
                formData.append("cgPh", orderInfo.cgPh);
                formData.append("cgAdsNum", orderInfo.cgAdsNum);
                formData.append("cgAds", orderInfo.cgAds);
                formData.append("cgAdsDetail", orderInfo.cgAdsDetail);
                formData.append("paymentMt", orderInfo.paymentMt);
                formData.append("orderPc", orderInfo.orderPc);
                formData.append("deliveryPc", orderInfo.deliveryPc);
                formData.append("totalPc", orderInfo.totalPc);
                formData.append("stOrder", orderInfo.stOrder);
                formData.append("stPayment", orderInfo.stPayment);
                formData.append("orderCode", order.orderCode);
                
                dispatch(callPurchaseAPI({
                    orderCode: order.orderCode,
                    form: formData
                }))
                alert("결제에 성공하였습니다.\n주문 내역으로 이동합니다.");
                navigate('/mypage/order');
            }
        },
        [isEffectWork]
    )

    /* ========================= 결제 ========================= */

    return (
        <>
            {loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            {
            order.orderCode
            ?
            <div className={OrderDetailCSS.boxing}>
                {console.log("▶ OrderDetail ◀ rendering component")}
                <div className={OrderDetailCSS.content}>
                    <div className={OrderDetailCSS.left}>
                        {
                            isOrdered
                            ?
                            <>
                                <div className={OrderDetailCSS.leftTh}>
                                    <Consignee 
                                        key={order.orderCode} 
                                        order={order}
                                        orderInfo={orderInfo}
                                        setOrderInfo={setOrderInfo}
                                    />
                                </div>
                                <div className={OrderDetailCSS.leftTh}>
                                    <Delivery
                                        key={order.orderCode} 
                                        order={order}
                                        orderInfo={orderInfo}
                                        setOrderInfo={setOrderInfo}
                                    />
                                </div>
                                <div>
                                    <Payment
                                        key={order.orderCode}
                                        order={order}
                                        orderInfo={orderInfo}
                                        setOrderInfo={setOrderInfo}
                                    />
                                </div>
                            </>
                            : null

                        }
                        <div>
                            <OrderProduct key={order.orderCode} order={order} isOrdered={isOrdered}/>
                        </div>
                    </div>
                    <div className={OrderDetailCSS.right}>
                        <div>
                            <Bill 
                                key={order.orderCode} 
                                order={order}
                                orderInfo={orderInfo}
                                setOrderInfo={setOrderInfo}
                            />
                        </div>
                        {
                            isOrdered
                            ? 
                            <button 
                                className={BtnCSS.cartBtn}
                                onClick={purchaseHandler}
                            >결제</button>
                            : 
                            <button
                                className={BtnCSS.cartBtn}
                                onClick={orderSubmitHandler}
                            >주문</button>
                        }
                    </div>
                </div>
            </div>
            : 
            (
                roleAdmin == 1
                ?
                <ErrorMindol/>
                :
                <div style={{textAlign: "center"}}>
                    <img src="https://lightin9.speedgabia.com/90_koodoyeon/team_project_lumos/emptycart.png" border="0" width={"800px"}></img>
                </div>
                // <h1 style={{textAlign: "center"}}>장바구니에 상품이 없습니다.</h1>
            )
            }
        </>
    )
}