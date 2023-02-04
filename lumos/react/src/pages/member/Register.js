import RGCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";


import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'

/* 아이디 중복체크 */
import { 
    idCheckAPI
} from '../../apis/MemberAPICalls'

import { POST_LOGIN } from '../../modules/MemberModule';

function Register() {

    const navigate = useNavigate();
    const inputRef = useRef([]);
    

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        pwConfirm: '',
        memberName: '', 
        memberBirth: '', 
        memberGen: '',
        memberPhone: '',
        memberEmail: '',
        memberAdsNum: '',
        memberAds: '',
        memberAdsDetail: ''
    });

    //구조분해할당
    const { memberId, memberPassword, memberName, memberBirth, memberPhone, memberEmail, pwConfirm } = form;

    // 아이디 형식 정규표현식 (숫자와 알파벳만)
    const idRegexp = /[a-z]{5,15}|[a-z0-9]{5,15}/g;
    //비밀번호 형식 정규표현식 (최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자)
    const pwRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g; 
    // 이름 형식 정규표현식 (한글만 입력)
    const nameRegexp = /^[가-힣]+$/g;
    // 생년월일 형식 정규표현식
    const birthRegexp = /^[0-9]{8}$/g;
    // 핸드폰 번호 형식 정규표현식
    const phoneRegexp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    // email 형식 정규표현식 
    const emailRegexp = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 
    
    

    const validId = memberId.match(idRegexp);
    const validPassword = memberPassword.match(pwRegexp);
    const validName = memberName.match(nameRegexp);
    const validBirth = memberBirth.match(birthRegexp);
    const validPhone = memberPhone.match(phoneRegexp);
    const validEmail = memberEmail.match(emailRegexp);
    const validpwConfirm = (memberPassword === pwConfirm);

    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);

    /* 데이터 입력 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    /* 돌아가기 클릭시 메인 페이지로 이동 */
    const onClickBackHandler = () => {
        navigate("/", { replace: true })
    }

    /* 아이디 중복 체크 */
    const [usableId, setUsableId] = useState(false);
    const duplicationCheck = () => {
        idCheckAPI(memberId)
        .then((response) => {
        console.log('돌아온 값: ', response.data);
        if(response.data === false){
            alert('사용 가능한 아이디입니다.');
            setUsableId(response);
        }
        else{
            alert('중복된 아이디입니다. 다시 시도하세요.');
            setUsableId(response);
            
        }
        console.log('중복체크');
        console.log(memberId);
        })
    }

    /* 회원가입 버튼 클릭시 유효성 검사 후 맞는 양식일 때에만 폼 제출 */
    const onClickRegisterHandler = () => {
         if (!validId) {
            alert("아이디를 다시 확인 해 주세요."); // 알람창
            setForm({ // 값 비워주기
              ...form,
              memberId: "", // 바뀐 값 빼고 나머지는 그대로 스프레드 연산자
            });
            inputRef.current[0].focus(); // 자동 포커스
            } else if (!validPassword) {
                alert("비밀번호를 다시 확인 해 주세요.");
                inputRef.current[1].focus();
                setForm({
                ...form,
                MemberPassword: "",
                });
            } else if (!validName) {
                alert("이름을 다시 확인 해 주세요.");
                inputRef.current[2].focus();
                setForm({
                ...form,
                memberName: "",
                });
            } else if (!validBirth) {
                alert("생년월일을 다시 확인 해 주세요.");
                inputRef.current[3].focus();
                setForm({
                ...form,
                memberBirth: "",
                });
            } else if (!validPhone) {
                alert("전화번호를 다시 확인 해 주세요.");
                inputRef.current[4].focus();
                setForm({
                ...form,
                memberPhone: "",
                });
            } else if (!validEmail) {
                alert("email을 다시 확인 해 주세요.");
                inputRef.current[5].focus();
                setForm({
                ...form,
                memberEmail: "",
                });
            } else if (!validpwConfirm) {
                alert("비밀번호를 똑같이 입력 해 주세요.");
                inputRef.current[6].focus();
                setForm({
                ...form,
                pwConfirm: "",
                });
            } else if(form.memberId === '' || form.memberPassword === '' || form.memberName === '' 
            || form.memberEmail === '' || form.memberBirth === '' || form.memberGen === '' 
            || form.memberAdsNum === '' || form.memberAds === '' || form.memberAdsDetail === ''){
                alert('정보를 모두 입력해주세요.');
            } else {
                dispatch(callRegisterAPI({
                form: form
                }));
                return alert("˗ˋˏ회원가입 성공!ˎˊ˗");
            }
        
    }

    return (
        <div className={ RGCSS.RGwrapper}>
            <div className={ RGCSS.RGcontent}>
                <h1 className={ RGCSS.RGheader }>| 회원가입</h1>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>아이디</b>
                    <div>
                        <input 
                            className={ RGCSS.RGinput }
                            type="text"
                            name="memberId"
                            value={memberId}
                            maxLength='15'
                            placeholder="최소 5자 이상의 영소문자와 숫자 입력"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[0] = el)} 
                            onChange={ onChangeHandler }
                        />
                        { validId ? <div style={ {color : '#73CEBE', fontSize: '16px', marginBottom: '20px'}  }> -ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize: '16px', marginBottom: '20px'}}>유효하지 않은 아이디입니다.</div>}
                    </div>
                    <div>
                        <button 
                            className={ RGCSS.RGduplicateBTN }
                            onClick={duplicationCheck}>중복확인</button>
                    </div>
                </div>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>비밀번호</b>
                    <div>
                        <input 
                            className={ RGCSS.RGinput }
                            type="password"
                            name="memberPassword"
                            value={memberPassword}
                            placeholder="최소 8자 이상 문자, 숫자, 특수문자 조합"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[1] = el)}
                            onChange={ onChangeHandler }
                        />
                        
                    </div>
                    <div>
                        <input 
                            className={ RGCSS.RGinput }
                            type="password"
                            name="pwConfirm"
                            value={pwConfirm}
                            placeholder="비밀번호를 다시 입력해주세요"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[6] = el)}
                            onChange={ onChangeHandler }
                        />
                        { (validPassword === true) ? null : validPassword ? <div style={ {color : '#73CEBE', fontSize: '16px', marginBottom: '5px'}  }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize: '16px', marginBottom: '5px'} }>유효하지 않은 비밀번호 입니다.</div>}
                        { (validpwConfirm === true) ? null : validpwConfirm ? <div style={ {color : '#73CEBE', fontSize: '16px', marginBottom: '20px'}  }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize: '16px', marginBottom: '20px'} }>비밀번호가 다릅니다.</div>}
                    </div>
                </div>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>이름</b>
                    <div>
                        <input 
                            className={ RGCSS.RGinput }
                            type="text"
                            name="memberName"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[2] = el)}
                            onChange={ onChangeHandler }
                        />{ validName ? <div style={ {color : '#73CEBE', fontSize: '16px', marginBottom: '20px'} }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize: '16px', marginBottom: '20px'} }>이름을 한글로 입력 해 주세요.</div>}
                    </div>
                </div>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>생년월일</b>
                    <div>
                        <input
                            className={ RGCSS.RGinput } 
                            type="text" 
                            placeholder="ex : 19990101" 
                            name="memberBirth"
                            maxLength="8" 
                            autoComplete='off'
                            ref={(el) => (inputRef.current[3] = el)} 
                            onChange={ onChangeHandler}
                        />{ validBirth ? <div style={ {color : '#73CEBE', fontSize: '16px', marginBottom: '20px'} }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize: '16px', marginBottom: '20px'} }>생년월일을 숫자 8자리로 입력해주세요.</div>}
                    </div>
                </div>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>성별</b>
                    <div className={ RGCSS.RGinput }>
                        <div className={ RGCSS.RGradioWrap }>
                            <label className={ RGCSS.RGradioLabel }><input className={ RGCSS.RGradio } type="radio" name="memberGen" onChange={ onChangeHandler } 
                                        checked={  form.memberGen == "남성" ? true : false }  value={"남성"}/>남성 </label>
                            <label className={ RGCSS.RGradioLabel }><input className={ RGCSS.RGradio } type="radio" name="memberGen" onChange={ onChangeHandler }
                                        checked={ form.memberGen == "여성" ? true : false }  value={"여성"}/>여성 </label>
                            <label className={ RGCSS.RGradioLabel }><input className={ RGCSS.RGradio } type="radio" name="memberGen" onChange={ onChangeHandler }
                                        checked={ form.memberGen == "선택안함" ? true : false }  value={"선택안함"}/>선택안함</label>
                        </div>
                    </div>
                </div>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>휴대전화</b>
                    <div>
                        <input className={ RGCSS.RGinput }
                            type="text" 
                            name="memberPhone"
                            placeholder="ex : 010-1234-1234"
                            value={memberPhone}
                            autoComplete='off'
                            onChange={ onChangeHandler }
                            ref={(el) => (inputRef.current[4] = el)} 
                        />{ validPhone ? <div style={ {color : '#73CEBE', fontSize: '16px', marginBottom: '20px'} }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize: '16px', marginBottom: '20px'} }>유효하지 않은 전화번호 입니다.</div>}
                    </div>
                </div>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>이메일</b>
                    <div>
                        <input className={ RGCSS.RGinput } 
                           type="text"
                           name="memberEmail"
                           placeholder="ex : email@lumos.com"
                           autoComplete='off'
                           ref={(el) => (inputRef.current[5] = el)}
                           onChange={ onChangeHandler}
                        />
                        { validEmail ? <div style={ {color : '#73CEBE', fontSize: '16px', marginBottom: '20px'} }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize: '16px', marginBottom: '20px'} }>유효하지 않은 e-mail입니다.</div>}
                    </div>
                </div>
                <div className={ RGCSS.adsWrapWrap }>
                    <div className={ RGCSS.adsWrap }>
                        <b className={ RGCSS.RGlabel }>우편번호</b>
                        <div>
                            <input className={ RGCSS.RGAdsNuminput } 
                                type="text" 
                                name="memberAdsNum"
                                placeholder="우편번호" 
                                autoComplete='off'
                                onChange={ onChangeHandler }
                            />
                        </div>
                    </div>
                    <div className={ RGCSS.adsWrap }>
                        <b className={ RGCSS.RGlabel }>주소</b>
                        <div>
                            <input className={ RGCSS.RGAdsinput } 
                                type="text" 
                                name="memberAds"
                                placeholder="주소입력" 
                                autoComplete='off'
                                onChange={ onChangeHandler }
                            />
                        </div>
                    </div>
                </div>
                <div className={ RGCSS.field }>
                    <b className={ RGCSS.RGlabel }>상세주소</b>
                    <div>
                        <input className={ RGCSS.RGinput } 
                            type="text" 
                            name="memberAdsDetail"
                            placeholder="상세주소 입력" 
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                </div>
                <div>
                    <button
                        className={ RGCSS.RGbutton } 
                        onClick = { onClickRegisterHandler }
                    >   
                        회원가입
                    </button>
                </div>
                <div>
                    <button
                        className={ RGCSS.RGBackButton } 
                        onClick = { onClickBackHandler }
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;