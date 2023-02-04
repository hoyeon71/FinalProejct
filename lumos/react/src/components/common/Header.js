import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import logo from '../../image/lumosLogo.png'

// 로그인
import {
    callLogoutAPI
} from '../../apis/MemberAPICalls'
import LoginModal from './LoginModal'; 

export default function Header() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAdmin, setIsAdmin] = useState('');

    /*==============================로그인=======================================*/
    const loginMember = useSelector(state => state.memberReducer); 
    const isLogin = window.localStorage.getItem('accessToken');    
    const [loginModal, setLoginModal] = useState(false); 

    //마이페이지로 이동
    const onClickMypageHandler = (memberId) => {    
        // 토큰 만료시 재로그인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[Header] onClickMypageHandler token : ', token);
        
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }
        //마이페이지로 이동
        navigate(`/mypage`, { replace: true });
    }

    // 관리자 권한 조회
    useEffect(
        () => {
            if(isLogin != null) {
                setIsAdmin(
                    decodeJwt(window.localStorage.getItem("accessToken")).auth.includes("ROLE_ADMIN")
                )
            } else {
                console.log('[Header] 관리자 권한 확인 : ', isAdmin);
            }
        },
        [isLogin]
    )

    // 로그아웃
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');  
        
        dispatch(callLogoutAPI());
        
        alert('˗ˋˏ로그아웃 되었습니다ˎˊ˗');
        navigate("/", { replace: true })
        window.location.reload();
    }

    // 메인화면으로 이동
    const onClickMainPageHandler = () => {
        navigate("/", { replace: true });
        window.location.reload();
    }

    // 관리자 메뉴 네비게이션
    const onClickMoveHandler = (e) => {
        if (token.exp * 1000 < Date.now()) {
            alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
            setLoginModal(true);
            return ;
        }
        navigate(`/${e.target.id}`, {replace: true});
        window.location.reload();
    }

    // 장바구니 이동
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const onCartHandler = () => {
        if (token.exp * 1000 < Date.now()) {
            alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
            setLoginModal(true);
            return ;
        }
        // 주소창이 같아 앞으로가기가 무한으로 생성되는 버그 수정을 위해 replace: false로 작성
        navigate(`/cart/${token.sub}`, {replace: false});
        window.location.reload();
    }

    function AnonymousMode() { //로그인 전

        return (
            <div className={HeaderCSS.linkbox}>
                <NavLink to="/login" className={HeaderCSS.headerNavLink}>로그인</NavLink>
                <NavLink to="/register" className={HeaderCSS.headerNavLink}>회원가입</NavLink>
            </div>
        );
    }

    function MemberMode() {   // 회원 로그인
        return (
            <div className={HeaderCSS.linkbox}>
                <button onClick={onClickLogoutHandler} className={HeaderCSS.headerbutton}>로그아웃</button>
                <button onClick={onClickMypageHandler} className={HeaderCSS.headerbutton}>마이페이지</button>
                <button onClick={onCartHandler} className={HeaderCSS.headerbutton}>장바구니</button>
            </div>
        );
    }

    function AdminMode() {  // 관리자 로그인

        return (            
            <>
                <div style={{marginRight: "90px"}}>
                    <li onClick={onClickLogoutHandler} className={HeaderCSS.headerbutton}>로그아웃</li>
                    <li onClick={onClickMoveHandler} id="shop-management" className={HeaderCSS.headerbutton}>상점관리</li>
                    <li onClick={onClickMoveHandler} id="product-management" className={HeaderCSS.headerbutton}>상품관리</li>
                    <li onClick={onClickMoveHandler} id="order-dashboard" className={HeaderCSS.headerbutton}>주문관리</li>
                    <li onClick={onClickMoveHandler} id="member-management" className={HeaderCSS.headerbutton}>회원관리</li>
                    <li onClick={onClickMoveHandler} id="question-management" className={HeaderCSS.headerbutton}>문의관리</li>
                </div>
            </>
        );
    }

    return (
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={HeaderCSS.Boxing}>

                <div><img src= {logo} className={HeaderCSS.Logo} onClick={onClickMainPageHandler}/></div>
                <div className={HeaderCSS.Menu}>
                    { (isLogin == null || isLogin === undefined) ? <AnonymousMode /> : (isAdmin ? <AdminMode/> : <MemberMode/>)}
                </div>
            </div>
        </>
    )
}