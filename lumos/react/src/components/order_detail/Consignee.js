import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {phoneFomatter} from '../../modules/Fommater';

import {decodeJwt} from '../../utils/tokenUtils';
import {callGetMemberAPI} from '../../apis/MemberAPICalls';
import {useDaumPostcodePopup} from "react-daum-postcode";

export default function Consignee({order, orderInfo, setOrderInfo}) {
    
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const roleAdmin = token.auth.filter(role => {return role == "ROLE_ADMIN"}).length;

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.memberReducer);

    /* 주문자 정보와 동일 */
    // 동일한 cartReducer 사용 시 에러 발생
    useEffect(
        () => {
            dispatch(callGetMemberAPI({
                memberId: token.sub
            }))
        },
        []
    )

    const callUserAdsHandler = (e) => {
        if(e.target.checked == true) {
            setOrderInfo({
                ...orderInfo,
                cgNm: userInfo.memberName,
                cgPh: userInfo.memberPhone,
                cgAdsNum: userInfo.memberAdsNum,
                cgAds: userInfo.memberAds,
                cgAdsDetail: userInfo.memberAdsDetail
            })
        } else {
            setOrderInfo({
                ...orderInfo,
                cgNm: '',
                cgPh: '',
                cgAdsNum: '',
                cgAds: '',
                cgAdsDetail: ''
            })
        }
    };

    const adsInfoChangeHandler = (e) => {
        setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value
        })
    };
    console.log("컨시어지 수동입력", orderInfo);

    /* ========================= 다음 주소 API ========================= */
    const addressAPI = () => {
        open({onComplete: completeHandler, left: 500, top: 150, popupTitle: "LUMOS 주소 검색" , theme: {bgColor: "#B9E7DF"}});
    };

    const CURRENT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(CURRENT_URL);

    const completeHandler = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setOrderInfo({
            ...orderInfo,
            cgAdsNum: data.zonecode,
            cgAds: fullAddress,
            cgAdsDetail: ''
        })

        document.getElementById("cgAdsDetail").focus();
    };


    return (
        <>
            <table>
                <thead>
                    {
                        roleAdmin == 1
                        ?
                        <tr>
                            <th colSpan={2}>
                                배송지 정보
                            </th>
                        </tr>
                        :
                        <tr>
                            <th>배송지 정보</th>
                            <td style={{textAlign: "right"}}>
                                <input 
                                    type="checkbox"
                                    style={{width: "30px"}}
                                    onChange={callUserAdsHandler}
                                />
                                주문자 정보와 동일
                            </td>
                        </tr>
                    }
                </thead>
                {
                    roleAdmin == 1
                    ?
                    <tbody>
                    <tr>
                        <th>수하인명</th>
                        <td>{order.cgNm}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{order.cgPh ? phoneFomatter(order.cgPh) : order.cgPh}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>({order.cgAdsNum}) {order.cgAds} {order.cgAdsDetail}</td>
                    </tr>
                    </tbody>
                    :
                    <tbody>
                    <tr>
                        <th>수하인명</th>
                        <td>
                            <input 
                                name="cgNm" 
                                onChange={adsInfoChangeHandler}
                                defaultValue={orderInfo.cgNm ?? ''}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>
                            <input 
                                type={'tel'}
                                name="cgPh" 
                                onChange={adsInfoChangeHandler}
                                // value로 작성 시 '-' 실시간 반영
                                value={phoneFomatter(orderInfo.cgPh) ?? ''}
                                placeholder="'-' 없이 숫자만 입력해 주세요"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            <input 
                                name="cgAdsNum" 
                                id="cgAdsNum"
                                onChange={adsInfoChangeHandler}
                                style={{width: "130px"}}
                                defaultValue={orderInfo.cgAdsNum ?? ''}
                                placeholder="우편번호"
                                disabled
                            ></input>&nbsp;&nbsp;&nbsp;
                            <button onClick={addressAPI}>검색</button>
                            <br/>
                            <input 
                                name="cgAds" 
                                id="cgAds"
                                onChange={adsInfoChangeHandler} 
                                style={{width: "350px"}}
                                defaultValue={orderInfo.cgAds ?? ''}
                                placeholder="주소"
                                disabled
                            ></input>&nbsp;&nbsp;&nbsp;
                            <input 
                                name="cgAdsDetail" 
                                id="cgAdsDetail"
                                onChange={adsInfoChangeHandler}
                                defaultValue={orderInfo.cgAdsDetail ?? ''}
                                placeholder="상세주소"
                            ></input>
                        </td>
                    </tr>
                    </tbody>
                }
            </table>
        </>
    )
};