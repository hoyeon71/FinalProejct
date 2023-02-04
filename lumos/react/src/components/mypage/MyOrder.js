import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {dateFomatter} from '../../modules/Fommater';

import {callOrderListAPI} from '../../apis/OrderAPICalls';

import SearchResultCSS from './../order/SearchResult.module.css';
import BtnCSS from './../order_detail/Btn.module.css';

export default function MyOrder({orderList}) {

    console.log("▶ MyOrder ◀");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
        
    console.log("orderListasdasd", orderList);
    
    /* 상세 페이지로 이동 */
    const onClickHandler = (orderCode) => {
        // navigate(`/mypage/order/${orderCode}`, { replace: false });
        alert("준비 중인 기능입니다.");
    }

    /* 리뷰 작성 버튼 */
    const reviewHandler = () => {
        navigate(`/reviewRegist`, { replace: false });
    }

    return (
        <>
            <div className={SearchResultCSS.list}>
                <table>
                    <thead>
                        <tr><th colSpan={12} style={{backgroundColor: "white", borderTop: "none", textAlign:"left", fontSize:"1.6em"}}>나의 주문내역</th></tr>
                        <tr>
                            <th>주문일</th>
                            <th>주문번호</th>
                            <th>수취인명</th>
                            <th>결제방법</th>
                            <th>결제금액</th>
                            <th>배송방법</th>
                            <th>배송사</th>
                            <th>송장번호</th>
                            <th>주문상태</th>
                            <th>클레임상태</th>
                            <th>리뷰</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (Array.isArray(orderList) && orderList.length > 0)
                        ? orderList.map((order) => (
                            <tr key={order.orderNum}>
                                <td onClick={() => onClickHandler(order.orderCode)}>{dateFomatter(order.orderDate)}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.orderCode}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.cgNm}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.paymentMt}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.totalPc.toLocaleString('ko-KR')} 원</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.deliveryMt}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.deliveryCp ?? '-'}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.deliveryNum ?? '-'}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>
                                    {
                                        order.purchaseConf ? "구매확정" : (
                                            order.deliveryEnd ? "배송완료" : (
                                                order.deliveryStart ? "배송중" : (
                                                    order.orderConf ? "발주확인" : "주문완료"
                                                )
                                            )
                                        )
                                    }
                                </td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.stClaim ? order.stClaim : "-"}</td>
                                <td><button className={BtnCSS.reviewBtn} onClick={reviewHandler}>작성</button></td>
                            </tr>
                            )
                        )
                        : <tr><td colSpan={11}>조회 결과가 없습니다.</td></tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}