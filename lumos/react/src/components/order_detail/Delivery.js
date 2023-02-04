import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

import {callDeliveryCpUpdateAPI} from '../../apis/OrderAPICalls';
import {callHistoryUpdateAPI} from '../../apis/OrderAPICalls';
import {deliveryNumCheck} from '../../modules/Validatior';
import {decodeJwt} from '../../utils/tokenUtils';

import BtnCSS from './Btn.module.css';

export default function Delivery({order, orderInfo, setOrderInfo}) {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const roleAdmin = token.auth.filter(role => {return role == "ROLE_ADMIN"}).length;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        deliveryCp : order.deliveryCp,
        deliveryNum : order.deliveryNum
    })
    
    const [modifyMode, setModifyMode] = useState(false);
    /* ============================== [관리자 기능] ============================== */
    /* 배송 정보 수정 모드 */
    const onModifyModeHandler = () => {
        if(order.orderConf == null) {
            alert("발주 확인처리를 먼저 진행해주세요.");
            navigate(`/order-management`, { replace: false });
        } else {
            alert("수정내역을 반영하시려면 저장버튼을 눌러주세요.")
            setModifyMode(true);
        }
    }

    /* 수정 정보 */
    const onChangeHandler = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form);
    }

    /* 배송 정보 수정 내역 업데이트 */
    const onSubmitHandler = () => {
        // 송장번호 형식 O + 배송업체 not null
        if(!!deliveryNumCheck(form.deliveryNum) && form.deliveryCp != null) {
            const formData = new FormData();
            formData.append("deliveryCp", form.deliveryCp);
            formData.append("deliveryNum", form.deliveryNum);

            // 배송 출발 처리용 dispatch가 호출되어도 db반영이 안되는 오류로 인해, 동일한 dispatch를 각 if, else문 안에 작성함
            if(order.deliveryStart == null) {
                dispatch(callDeliveryCpUpdateAPI({
                    orderCode: order.orderCode,
                    form: formData
                }));
                dispatch(callHistoryUpdateAPI({
                    orderCode: order.orderCode,
                    updateKind: "배송출발처리"
                }));
                alert("배송출발 처리되었습니다.");
            } else {
                dispatch(callDeliveryCpUpdateAPI({
                    orderCode: order.orderCode,
                    form: formData
                }));
                alert("배송 정보가 변경되었습니다.");
            }
            window.location.reload();
        // 송장번호 형식 O + 배송업체 null
        } else if(!!deliveryNumCheck(form.deliveryNum) && form.deliveryCp == null) {
            alert("택배사를 선택해 주세요.")
        // 송장번호 형식 X + 배송업체 not null
        } else {
            alert("송장 번호 형식이 잘못되었습니다.");
        }
    };
    
    /* 퀵, 방문수령 배송완료 처리 */
    const deliveryEndHandler = () => {
        const formData = new FormData();
        formData.append("updateKind", "배송완료처리");
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: formData
        }));
        alert("배송 완료 처리가 완료되었습니다.");
        window.location.reload();
    };

    /* 퀵, 방문수령 배송출발 처리 */
    const deliveryStartHandler = () => {
        if(order.orderConf == null) {
            alert("발주 확인처리를 먼저 진행해주세요.");
            navigate(`/order-management`, { replace: false });
        } else {
            const formData = new FormData();
            formData.append("updateKind", "배송출발처리");
            dispatch(callHistoryUpdateAPI({
                orderCode: order.orderCode,
                form: formData
            }));
            alert("배송 출발 처리가 완료되었습니다.");
            window.location.reload();
        }
    }

    /* ============================== [회원 기능] ============================== */
    // ★ props-drilling
    const deliveryInfoHandler = (e) => {
        // console.log("딜리버리 컴포넌트", e.target.name + ":::::" + e.target.value);
        setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>배송 정보</th>
                        <td>
                            {
                                (order.deliveryMt != "일반택배" && roleAdmin == 1) 
                                ? (order.deliveryStart
                                    ? (
                                        order.deliveryEnd
                                        ? null
                                        : <button className={BtnCSS.submitBtn} onClick={deliveryEndHandler}>배송완료</button>
                                    )
                                    : <button className={BtnCSS.submitBtn} onClick={deliveryStartHandler}>배송출발</button>
                                )
                                : 
                                (
                                    roleAdmin == 1
                                    ?
                                    (modifyMode 
                                        ? <button className={BtnCSS.submitBtn} onClick={onSubmitHandler}>저장</button> 
                                        : <button className={BtnCSS.submitBtn} onClick={onModifyModeHandler}>수정</button>
                                    )
                                    : null
                                )
                            }
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        roleAdmin == 1
                        ?
                        <tr>
                            <th>배송 방법</th>
                            <td>{order.deliveryMt}</td>
                        </tr>
                        :
                        <tr>
                            <th>배송 방법</th>
                            <td>
                                <select name="deliveryMt" onChange={deliveryInfoHandler}>
                                    <option value="일반택배">일반택배</option>
                                    <option value="방문수령">방문수령</option>
                                    <option value="퀵">퀵</option>
                                </select>
                            </td>
                        </tr>
                    }
                    {
                        roleAdmin == 1
                        ?
                        <tr>
                            <th>택배사</th>
                            <td>
                                {(() => {
                                    if(order.deliveryMt === "일반택배") {
                                        return <select name="deliveryCp" onChange={onChangeHandler} disabled={modifyMode? false : true}>
                                                    {
                                                        order.deliveryCp
                                                        ? (
                                                            order.deliveryCp == "CJ대한통운" ?
                                                            <>
                                                            <option value={order.deliveryCp}>{order.deliveryCp}</option>
                                                            <option value="우체국택배">우체국택배</option>
                                                            </>
                                                            : 
                                                            <>
                                                            <option value={order.deliveryCp}>{order.deliveryCp}</option>
                                                            <option value="CJ대한통운">CJ대한통운</option>
                                                            </>
                                                        )
                                                        : 
                                                        <>
                                                        <option value="default">택배사를 선택해주세요</option>
                                                        <option value="CJ대한통운">CJ대한통운</option>
                                                        <option value="우체국택배">우체국택배</option>
                                                        </>
                                                    }
                                            </select>
                                    } else {
                                        return "-"
                                    }
                                })()}
                            </td>
                        </tr>
                        :
                        null
                    }
                    {
                        roleAdmin == 1
                        ?
                        <tr>
                            <th>송장번호</th>
                            <td>
                                {(() => {
                                    if(order.deliveryMt === "일반택배" && !order.deliveryNum) {
                                        return <input 
                                                    type="text"
                                                    name="deliveryNum" 
                                                    placeholder="송장번호를 입력해 주세요"
                                                    disabled={modifyMode? false : true}
                                                    onChange={onChangeHandler}/>
                                    } else if(order.deliveryMt === "일반택배" && !!order.deliveryNum) {
                                        return <input 
                                                    name="deliveryNum" 
                                                    defaultValue={order.deliveryNum}
                                                    onChange={onChangeHandler}
                                                    disabled={modifyMode? false : true}/>
                                    } else {
                                        return "-"
                                    }
                                })()}
                            </td>
                        </tr>
                        :
                        null
                    }
                    {
                        roleAdmin == 1
                        ?
                        <tr>
                            <th>배송 메시지</th>
                            <td>{order.deliveryMsg}</td>
                        </tr>
                        :
                        <tr>
                            <th>배송 메시지</th>
                            <td>
                                <input
                                    name="deliveryMsg"
                                    style={{width: "350px"}}
                                    onChange={deliveryInfoHandler}
                                ></input>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
};