import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FooterCSS from './Footer.module.css';
import {callCompanyInfoAPI, callShopInfolAPI} from '../../apis/ShopManagementAPICalls';

export default function Footer() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companyInfo  = useSelector(state => state.companyReducer);  
    const shopInfo  = useSelector(state => state.shopReducer);  

    // console.log("companyInfo:::::::", companyInfo);
    // console.log("shopInfo:::::::", shopInfo);

    useEffect(
        () => {
            dispatch(callCompanyInfoAPI());            
            dispatch(callShopInfolAPI());
        }
        ,[]
    );

    const infomationHandler = () => {
        alert("해당 기능은 준비 중입니다.");
    }

    return (
        <>
            <div className={FooterCSS.headLine}></div>
            <div className={FooterCSS.footer}>
            <table>
                <thead><tr><th>고객센터</th></tr></thead>
                <tbody>
                    <tr><td style={{fontWeight: "bold"}}>{shopInfo.csTel}</td></tr>
                    <tr><td>{shopInfo.csHour}</td></tr>
                </tbody>
            </table>
            <table className={FooterCSS.companyInfo}>
                <thead><tr><th>기업정보</th></tr></thead>
                <tbody onClick={infomationHandler}>
                    <tr><td>회사소개</td></tr>
                    <tr><td>이용약관</td></tr>
                    <tr><td>개인정보취급방침</td></tr>
                </tbody>
            </table>
            <table className={FooterCSS.qnA}>
                <thead><tr><th>고객문의</th></tr></thead>
                <tbody onClick={infomationHandler}>
                    <tr><td>교환 & 환불 정책</td></tr>
                    <tr><td>자주 묻는 질문</td></tr>
                </tbody>
            </table>
            </div>
            <div className={FooterCSS.boxing}>
                <p style= {{width: '100%', textAlign: 'center', fontWeight: "bold"} }>Copyright 2022. LUMOS All rights reserved.</p>
            </div>
        </>
    );
}