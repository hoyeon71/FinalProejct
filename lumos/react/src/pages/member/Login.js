import LoginCSS from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { POST_REGISTER } from '../../modules/MemberModule';
import { callLoginAPI } from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function Login() {
        
    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    /* 폼 데이터 한번에 변경 및 State에 저장 */   
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    useEffect(() => {
        
        if(loginMember.status === 200){
            console.log("[Login] Login SUCCESS {}", loginMember);
            navigate("/", { replace: true });
        }

        /* 회원 가입 후 로그인 페이지로 안내 되었을 때 */
        if(loginMember.status === 201){

            loginMember.status = 100  // Continue
            dispatch({ type: POST_REGISTER,  payload: loginMember });
        }  
    }
    ,[loginMember]);
    
    /* 로그인 상태일 시 로그인페이지로 접근 방지 */
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/"/>
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickRegisterHandler = () => { 
        navigate("/register", { replace: true })
    }

    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    return (
        <div className={ LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginlabel}>로그인</div>
            <div className={ LoginCSS.loginDiv }>
                <div className={ LoginCSS.loginIDinputlabel}>아이디</div>
                <input className={ LoginCSS.loginInput}
                    type="text" 
                    name='memberId'
                    placeholder="아이디를 입력하세요" 
                    autoComplete='on'
                    onChange={ onChangeHandler }
                />
                <div className={ LoginCSS.loginPWinputlabel}>비밀번호</div>
                <input className={ LoginCSS.loginInput}
                    type="password"
                    name='memberPassword' 
                    placeholder="비밀번호를 입력하세요" 
                    autoComplete='on'
                    onChange={ onChangeHandler }
                />
                <button
                    className={ LoginCSS.loginBTN }
                    onClick={ onClickLoginHandler }
                >
                    로그인
                </button>
                
            </div>
            <button
                className={ LoginCSS.loginRegiBTN }
                onClick={ onClickRegisterHandler }
            >
                회원가입
            </button>
        </div>
    );
}

export default Login;