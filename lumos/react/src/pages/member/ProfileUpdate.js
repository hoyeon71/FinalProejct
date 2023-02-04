import ProfileUpdateCSS from './ProfileUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callGetMemberAPI,
    callMemberUpdateAPI
} from '../../apis/MemberAPICalls'


function ProfileUpdate() {

    const dispatch = useDispatch();
    const params = useParams();
    const memberDetail = useSelector(state => state.memberReducer);  

    const [modifyMode, setModifyMode] = useState(false);
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [form, setForm] = useState({
        memberId: '',
        memberName: '', 
        memberPhone: '',
        memberEmail: '',
        memberAdsNum: '',
        memberAds: '',
        memberAdsDetail: ''
    });

    const { memberPhone, memberEmail} = form;

    // 핸드폰 번호 형식 정규표현식
    const phoneRegexp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    // email 형식 정규표현식 
    const emailRegexp = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 

    const validPhone = memberPhone.match(phoneRegexp);
    const validEmail = memberEmail.match(emailRegexp);

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/");
    }


    useEffect(
        () => {    
            console.log('token', token.sub);
            if(token !== null) {
                dispatch(callGetMemberAPI({	
                    memberId: token.sub
                }));            
            }
        }
        ,[]
    );

    // 프로필수정버튼
    const onClickModifyModeHandler = () => {    
        setModifyMode(true);
        setForm({
            memberCode: memberDetail.memberCode,
            memberId: memberDetail.memberId,
            memberName: memberDetail.memberName,
            memberPhone: memberDetail.memberPhone,
            memberEmail: memberDetail.memberEmail,
            memberAdsNum: memberDetail.memberAdsNum,
            memberAds: memberDetail.memberAds,
            memberAdsDetail: memberDetail.memberAdsDetail
        });
    }

    /* form 데이터 세팅 */  
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //업데이트 핸들러
    const onClickProfileUpdateHandler = () => {

        console.log('[ProfileUpdate] onClickProfileUpdateHandler');

        const formData = new FormData();
        formData.append("memberCode", form.memberCode);
        formData.append("memberId", form.memberId);
        formData.append("memberName", form.memberName);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberEmail", form.memberEmail);
        formData.append("memberAdsNum",form.memberAdsNum);
        formData.append("memberAds",form.memberAds);
        formData.append("memberAdsDetail",form.memberAdsDetail);

        if(form.memberId === '' || form.memberName === '' 
            || form.memberPhone === '' || form.memberEmail === ''
            || form.memberAdsNum === '' || form.memberAds === ''
            || form.memberAdsDetail === '' ){
                alert('정보를 모두 입력해주세요.');
                return ;
        } else if (!validPhone) {
            alert("전화번호를 다시 확인 해 주세요.");
            setForm({
            ...form,
            
            });
        } else if (!validEmail) {
            alert("email을 다시 확인 해 주세요.");
            setForm({
            ...form,
            
            });
        } else {
            dispatch(callMemberUpdateAPI({	// 상품 정보 업데이트
            form: formData
            })); 
            alert('프로필을 수정했습니다.');
            navigate('/', { replace: true});
        }
        navigate('/', { replace: true});
    }


    return (
        
        <div className={ ProfileUpdateCSS.PUwrapper} style={ { backgroundColor: 'white' } }>
            <div className={ ProfileUpdateCSS.PUheader }>| 회원 정보</div>
            { memberDetail &&
                <div className={ ProfileUpdateCSS.PUcontent }>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 아이디 </div>
                        <input className={(!modifyMode == true ? ProfileUpdateCSS.PUinput : ProfileUpdateCSS.PUmodify)}
                            name="memberId"
                            placeholder="아이디" 
                            onChange={ onChangeHandler }
                            readOnly={true}
                            value={memberDetail.memberId || ''}
                        />
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 이름 </div>
                        <input className={ (!modifyMode == true ? ProfileUpdateCSS.PUinput : ProfileUpdateCSS.PUmodify)}
                            name="memberName" 
                            placeholder="이름" 
                            onChange={ onChangeHandler }
                            readOnly={true}
                            value={ memberDetail.memberName || ''}
                        />
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 휴대전화 </div>
                        <input className={ProfileUpdateCSS.PUinput }
                            name="memberPhone"
                            placeholder="휴대전화" 
                            onChange={ onChangeHandler }
                            readOnly={modifyMode ? false : true}
                            value={(!modifyMode ? memberDetail.memberPhone : form.memberPhone ) || ''}
                        />
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 이메일 </div>
                        <input className={ProfileUpdateCSS.PUinput}
                            name="memberEmail" 
                            placeholder="이메일" 
                            onChange={ onChangeHandler }
                            readOnly={ modifyMode ? false : true}
                            value={ (!modifyMode ? memberDetail.memberEmail : form.memberEmail) || ''}
                        />
                    </div>
                    <div className={ProfileUpdateCSS.adsWrapWrap}>
                        <div className={ProfileUpdateCSS.adsWrap}>
                            <div className={ProfileUpdateCSS.PUlabel}> 우편번호 </div>
                            <input className={ProfileUpdateCSS.inputadsNum}
                                name="memberAdsNum" 
                                placeholder="우편번호" 
                                onChange={ onChangeHandler }
                                readOnly={ modifyMode ? false : true}
                                value={ (!modifyMode ? memberDetail.memberAdsNum : form.memberAdsNum) || ''}
                            />
                        </div>
                        <div className={ProfileUpdateCSS.adsWrap}>
                            <div className={ProfileUpdateCSS.PUlabel}> 주소 </div>
                            <input className={ProfileUpdateCSS.inputads}
                                name="memberAds" 
                                placeholder="주소" 
                                onChange={ onChangeHandler }
                                readOnly={ modifyMode ? false : true}
                                value={ (!modifyMode ? memberDetail.memberAds : form.memberAds) || ''}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 상세주소 </div>
                        <input className={ProfileUpdateCSS.PUinput}
                            name="memberAdsDetail" 
                            placeholder="상세주소" 
                            onChange={ onChangeHandler }
                            readOnly={ modifyMode ? false : true}
                            value={ (!modifyMode ? memberDetail.memberAdsDetail : form.memberAdsDetail) || ''}
                        />
                    
                    </div>
                    <div className={ProfileUpdateCSS.PUbuttonWrap} >
                        {!modifyMode &&
                            <button  
                                className={ProfileUpdateCSS.PUbutton}     
                                onClick={ onClickModifyModeHandler }             
                            >
                                수정하기
                            </button>
                        }
                        {modifyMode &&
                            <button       
                                className={ProfileUpdateCSS.PUbutton}
                                onClick={ onClickProfileUpdateHandler }             
                            >
                            수정완료
                            </button>
                        }
                        <button       
                            className={ProfileUpdateCSS.PUbutton}
                            onClick={ onClickBackHandler }             
                        >
                            돌아가기
                        </button>
                    </div>
            </div>
            }
        </div>
    );
}
export default ProfileUpdate;