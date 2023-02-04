import { NavLink } from 'react-router-dom';
import MyPageNavbarCSS from './MyPageNavbar.module.css';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function MyPageNavbar() {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));     

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
        return <Navigate to="/" />;
    }

    return (
        <div className={ MyPageNavbarCSS.MyPageNavbarDiv }>
            <ul className={ MyPageNavbarCSS.MyPageNavbarUl }>
                <li><NavLink to="/mypage/profileUpdate"
                             className={ MyPageNavbarCSS.link }>회원정보</NavLink></li>
                <li><NavLink to="/mypage/order"
                             className={ MyPageNavbarCSS.link }>주문내역</NavLink></li>
                <li><NavLink to="/mypage/myReviewList"
                             className={ MyPageNavbarCSS.link }>내 리뷰</NavLink></li>
                <li><NavLink to="/mypage/questionregistration"
                             className={ MyPageNavbarCSS.link }>문의하기</NavLink></li>
                <li><NavLink to="/mypage/question"
                             className={ MyPageNavbarCSS.link }>문의내역</NavLink></li>
            </ul>
        </div>
    );
}

export default MyPageNavbar;