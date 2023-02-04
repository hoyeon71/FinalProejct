import { useEffect } from 'react';
import {decodeJwt} from '../../utils/tokenUtils';

export default function Payment({order, orderInfo, setOrderInfo}) {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const roleAdmin = token.auth.filter(role => {return role == "ROLE_ADMIN"}).length;
    
    // ★ props-drilling
    const paymentHandler = () => {
        console.log("페이먼트", document.getElementById("paymentMt"));
        setOrderInfo({
            ...orderInfo,
            paymentMt: document.getElementById("paymentMt").value
        })
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            결제 정보
                        </th>
                    </tr>
                </thead>
                {
                    roleAdmin == 1
                    ?
                    <tbody>
                        <tr>
                            <th>결제 방법</th>
                            <td>{order.paymentMt}</td>
                        </tr>
                        <tr>
                            <th>상품 주문 가격</th>
                            <td>{order.orderPc.toLocaleString('ko-KR')} 원</td>
                        </tr>
                        <tr>
                            <th>배송비</th>
                            <td>{order.deliveryPc.toLocaleString('ko-KR')} 원</td>
                        </tr>
                        <tr>
                            <th>합계</th>
                            <td>{order.totalPc.toLocaleString('ko-KR')} 원</td>
                        </tr>
                    </tbody>
                    :
                    <tbody>
                        <tr>
                            <th>결제 방법</th>
                            <td>
                                <select id="paymentMt" onChange={paymentHandler}>
                                    <option value="카카오페이">카카오페이</option>
                                    <option value="무통장입금">무통장입금</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
        </>
    )
};