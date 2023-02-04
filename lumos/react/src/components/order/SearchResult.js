import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {dateFomatter} from '../../modules/Fommater';

import {callOrderListAPI} from '../../apis/OrderAPICalls';

import SearchResultCSS from './SearchResult.module.css';

import {OrderContext} from '../../App';

export default function SearchResult({updateKind, isAbled, setIsAbled, searchOrderList}) {

    console.log("▶ SearchResult ◀");
    
    const orderData  = useSelector(state => state.orderReducer);  
    let orderList = orderData.data;
    Array.isArray(searchOrderList) ? orderList = searchOrderList : orderList = orderList;
    // if(Array.isArray(searchOrderList).length > 0) orderList = searchOrderList;
    // console.log("orderList type", Array.isArray(searchOrderList));
    // console.log("orderList", orderList);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    
    /* 페이징 처리 */
    const pageInfo = orderData.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }
    
    useEffect(
        () => {
            dispatch(callOrderListAPI({	
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );
        
    /* 상세 페이지로 이동 */
    const onClickHandler = (orderCode) => {
        // replace : true => 해당 주소로 이동 후 뒤로 가기를 하더라고 방금 페이지로 복귀 불가 / 메인 페이지("/")로 복귀
        console.log("orderCode", orderCode);
        navigate(`/order-management/${orderCode}`, { replace: false });
    }

    useEffect(
        () => {
            const parentCheckBox = document.getElementById("parentCheck");
            const childCheckBoxes = document.querySelectorAll("input[id='childCheck']");

            if(updateKind === "발주확인") {
                // 체크박스 disabled 해제 및 이벤트 속성 추가
                parentCheckBox.disabled = false;
                parentCheckBox.onclick = selectAllHandler;
                childCheckBoxes.forEach(checkBox => {
                    if(checkBox.parentNode.parentNode.children[9].innerText == "주문완료") {
                        checkBox.disabled = false;
                        checkBox.onclick = selectHandler;
                    }
                })
                // 만약 해제될 체크 박스가 없다면 안내메세지 출력 및 화면 리로딩
                const alertMsg = Array.prototype.filter.call(
                    childCheckBoxes, checkBox => {return checkBox.disabled == false}
                )
                if(alertMsg.length == 0) {
                    alert("발주확인 처리할 주문건이 없습니다.");
                    window.location.reload();
                } else {
                    setIsAbled(!isAbled);
                    alert("발주확인 처리할 주문건을 선택하신 후 확인 버튼을 눌러주세요.");
                }
            } else if(updateKind === "송장번호입력") {
                alert("송장번호 일괄 입력 기능은 준비중입니다. 주문내역 상세 페이지에서 입력해주세요.")
            } else if(updateKind === "배송출발처리") {
                // 체크박스 disabled 해제 및 이벤트 속성 추가
                parentCheckBox.disabled = false;
                parentCheckBox.onclick = selectAllHandler;
                childCheckBoxes.forEach(checkBox => {
                    if(checkBox.parentNode.parentNode.children[8].innerText != "일반택배"
                        && checkBox.parentNode.parentNode.children[9].innerText == "발주확인") {
                        checkBox.disabled = false;
                        checkBox.onclick = selectHandler;
                    }
                })
                const alertMsg = Array.prototype.filter.call(
                    childCheckBoxes, checkBox => {return checkBox.disabled == false}
                )
                if(alertMsg.length == 0) {
                    alert("배송출발 처리할 주문건이 없습니다.");
                    window.location.reload();
                } else {
                    setIsAbled(!isAbled);
                    alert("배송출발 처리할 주문건을 선택하신 후 확인 버튼을 눌러주세요.");
                }
            } else if(updateKind === "배송완료처리") {
                // 체크박스 disabled 해제 및 이벤트 속성 추가
                parentCheckBox.disabled = false;
                parentCheckBox.onclick = selectAllHandler;
                childCheckBoxes.forEach(checkBox => {
                    if(checkBox.parentNode.parentNode.children[9].innerText == "배송중") {
                        checkBox.disabled = false;
                        checkBox.onclick = selectHandler;
                    }
                })
                const alertMsg = Array.prototype.filter.call(
                    childCheckBoxes, checkBox => {return checkBox.disabled == false}
                )
                if(alertMsg.length == 0) {
                    alert("배송완료 처리할 주문건이 없습니다.");
                    window.location.reload();
                } else {
                    setIsAbled(!isAbled);
                    alert("배송완료 처리할 주문건을 선택하신 후 확인 버튼을 눌러주세요.");
                }
            } else if(updateKind === "주문취소처리") {
                // 체크박스 disabled 해제 및 이벤트 속성 추가
                parentCheckBox.disabled = false;
                parentCheckBox.onclick = selectAllHandler;
                childCheckBoxes.forEach(checkBox => {
                    if(checkBox.parentNode.parentNode.children[9].innerText == "주문완료"
                        || checkBox.parentNode.parentNode.children[9].innerText == "발주확인") {
                        checkBox.disabled = false;
                        checkBox.onclick = selectHandler;
                    }
                })
                const alertMsg = Array.prototype.filter.call(
                    childCheckBoxes, checkBox => {return checkBox.disabled == false}
                )
                if(alertMsg.length == 0) {
                    alert("주문취소 처리할 주문건이 없습니다.");
                    window.location.reload();
                } else {
                    setIsAbled(!isAbled);
                    alert("주문취소 처리할 주문건을 선택하신 후 확인 버튼을 눌러주세요.");
                }
            } else if(updateKind === "반품접수") {
                // 체크박스 disabled 해제 및 이벤트 속성 추가
                parentCheckBox.disabled = false;
                parentCheckBox.onclick = selectAllHandler;
                childCheckBoxes.forEach(checkBox => {
                    if(checkBox.parentNode.parentNode.children[9].innerText == "배송완료") {
                        checkBox.disabled = false;
                        checkBox.onclick = selectHandler;
                    }
                })
                const alertMsg = Array.prototype.filter.call(
                    childCheckBoxes, checkBox => {return checkBox.disabled == false}
                )
                if(alertMsg.length == 0) {
                    alert("반품접수 처리할 주문건이 없습니다.");
                    window.location.reload();
                } else {
                    setIsAbled(!isAbled);
                    alert("반품접수 처리할 주문건을 선택하신 후 확인 버튼을 눌러주세요.");
                }
            } else if(updateKind === "반품완료처리") {
                // 체크박스 disabled 해제 및 이벤트 속성 추가
                parentCheckBox.disabled = false;
                parentCheckBox.onclick = selectAllHandler;
                childCheckBoxes.forEach(checkBox => {
                    if(checkBox.parentNode.parentNode.children[9].innerText == "반품접수") {
                        checkBox.disabled = false;
                        checkBox.onclick = selectHandler;
                    }
                })
                const alertMsg = Array.prototype.filter.call(
                    childCheckBoxes, checkBox => {return checkBox.disabled == false}
                )
                if(alertMsg.length == 0) {
                    alert("반품완료 처리할 주문건이 없습니다.");
                    window.location.reload();
                } else {
                    setIsAbled(!isAbled);
                    alert("반품완료 처리할 주문건을 선택하신 후 확인 버튼을 눌러주세요.");
                }
            }
        },
        [updateKind]
    )

    /* 체크 박스 선택 시 수정할 수 있는 기능 */
    const context = useContext(OrderContext);
    const {ckeckCode, setCheckCode} = context;

    // 전체 선택 및 해제
    const selectAllHandler = (e) => {
    const childCheckBoxes = document.querySelectorAll("input[id='childCheck']");
        if(e.target.checked == true) {
            childCheckBoxes.forEach(checkBox => {
                const orderCode = checkBox.parentNode.nextElementSibling.nextElementSibling.innerText;
                // const devStatus = checkBox.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
                // console.log("devStatus", devStatus);
                if(checkBox.disabled == false) {
                    checkBox.checked = e.target.checked;
                    ckeckCode.add(orderCode);
                    setCheckCode(ckeckCode);
                    console.log("전체 선택", ckeckCode);
                }
            })
        } else {
            childCheckBoxes.forEach(checkBox => {
                checkBox.checked = e.target.checked;
                ckeckCode.clear();
                setCheckCode(ckeckCode);
                console.log("전체 해제", ckeckCode);
            })
        }
    };
        
    // 체크박스 자식 선택 및 해제 (전체 선택 시 상위의 전체 선택도 체크 처리됨)
    const selectHandler = (e) => {
        const parentCheckBox = document.getElementById("parentCheck");
        const childCheckBoxes = document.querySelectorAll("input[id='childCheck']");
        const checkedBoxes = document.querySelectorAll("input[id='childCheck']:checked");
        const orderCode = e.target.parentNode.nextElementSibling.nextElementSibling.innerText;
    
        if(checkedBoxes.length === childCheckBoxes.length) parentCheckBox.checked = true;
        else parentCheckBox.checked = false;

        if(e.target.checked == true) {
            ckeckCode.add(orderCode);
            setCheckCode(ckeckCode);
            console.log("체크박스 선택", ckeckCode);
        } else if(e.target.checked == false && ckeckCode.has(orderCode)) {
            ckeckCode.delete(orderCode);
            setCheckCode(ckeckCode);
            console.log("체크박스 해제", ckeckCode);
        }
    };
        
    return (
        <>
            {/* 조회 및 검색 결과가 있는 경우 컴포넌트 반환 */}
            <div className={SearchResultCSS.list}>
                <table>
                    <thead>
                        <tr>
                            {
                                // pathname == "/order-dashboard" 
                                pathname == "/order-management" 
                                ? <th><input type={'checkbox'} id="parentCheck" disabled></input></th>
                                // ▶ 전체 주문 출력 시 활성화할 태그
                                // : <th><input type={'checkbox'} onClick={selectAllHandler} id="parentCheck"></input></th>
                                : null
                            }
                            <th>주문일</th>
                            <th>주문번호</th>
                            <th>구매자명</th>
                            <th>구매자ID</th>
                            <th>수취인명</th>
                            <th>결제방법</th>
                            <th>결제금액</th>
                            <th>배송방법</th>
                            <th>주문상태</th>
                            <th>클레임상태</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (Array.isArray(orderList) && orderList.length > 0)
                        ? orderList.map((order) => (
                            <tr key={order.orderNum}>
                                {
                                    // pathname == "/order-dashboard"
                                    pathname == "/order-management" 
                                    ? <td><input type={'checkbox'} id="childCheck" disabled></input></td>
                                    // ▶ 전체 주문 출력 시 활성화할 태그
                                    // : <td><input type={'checkbox'} onClick={selectHandler} id="childCheck"></input></td>
                                    : null
                                }
                                <td onClick={() => onClickHandler(order.orderCode)}>{dateFomatter(order.orderDate)}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.orderCode}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.memberCode.memberName}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.memberCode.memberId}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.cgNm}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.paymentMt}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.totalPc.toLocaleString('ko-KR')} 원</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.deliveryMt}</td>
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
                            </tr>
                            )
                        )
                        : <tr><td colSpan={11}>조회 결과가 없습니다.</td></tr>
                    }
                    </tbody>
                </table>
            </div>
            <div className={SearchResultCSS.paging}>
                {/* 왼쪽 버튼 */}
                {(Array.isArray(orderList) && pageInfo) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={SearchResultCSS.pageBtn}
                    >
                        ◀
                    </button>
                }
                {/* 페이지 버튼 */}
                {(Array.isArray(orderList) && pageInfo) &&
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? {color: '#73CEBE'} : null}
                                className={SearchResultCSS.pageNum}
                            >
                                {num}
                            </button>
                        </li>
                ))}
                {/* 오른쪽 버튼 */}
                {(Array.isArray(orderList) && pageInfo) &&
                    <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                    className={SearchResultCSS.pageBtn}
                    >
                        ▶
                    </button>
                }
            </div>
        </>
    )
}