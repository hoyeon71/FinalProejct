import QRCSS from './QuestionRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callQuestionRegistAPI,
    callNewQuestionCodeAPI
} from '../../apis/QuestionAPICalls';



function QuestionRegistration() {


    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const newQuestion = useSelector(state => state.questionReducer); 
    // const questionCode = newQuestion.data;
    const [form, setForm] = useState({
        questionTitle : '',
        questionCategory : '',
        questionContent: '',
        memberCode: '',
        questionStatus: '미해결',
        memberId: token.sub
    });

    useEffect(() => {
        console.log('useEffect 동작');
    //     // store의 questionReducer리듀서용 state 값 수정으로 rerendering
    //     dispatch(callNewQuestionCodeAPI({   // 새로 생성된 questionCode 조회
    //         memberId: token.sub
    //    })); 

        /* 이미지 업로드시 미리보기 세팅 */
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image, newQuestion]);

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickQuestionRegistrationHandler = () => {

        console.log('[QuestionRegistration] onClickQuestionRegistrationHandler');

        const formData = new FormData();

        formData.append("questionTitle", form.questionTitle);
        formData.append("questionCategory", form.questionCategory);
        formData.append("questionContent", form.questionContent);
        formData.append("memberId", form.memberId);
        formData.append("questionStatus", '미해결');
        console.log(form.memberId);
        if(image){
            formData.append("questionImage", image);
        }


        dispatch(callQuestionRegistAPI({   // 문의 등록 
            form: formData,
            memberId: token.sub
        }));   
       
    }

    // rerendering 이후 store의 state 확인 후 navigate
    // console.log('test', newQuestion);
    if ((newQuestion + 0) > 0) {
        console.log(newQuestion);
        navigate(`/mypage/question/detail/${newQuestion}`, { replace: true });
        setTimeout(() => {
            console.log("Delayed for 1 second.");
            window.location.reload();                             // 파일업로드 물리적 시간 강제 딜레이 
        }, "3000")
        // window.location.reload();
    }

    return (
        <div>
            <div >
                <div>
                    <div>
                        { imageUrl && <img className={ QRCSS.QRIMGINPUT } 
                            src={ imageUrl } 
                            alt="preview"
                        />}
                        <div>
                        <input        
                            style={ { display: 'none' }}
                            type="file"
                            name='productImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        /></div>
                        <button 
                            className={ QRCSS.IMGbutton }    
                            onClick={ onClickImageUpload } 
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <div className={ QRCSS.QRdivLabel }><label>문의 제목</label></div>
                                <div >
                                    
                                    <input className={ QRCSS.QRinput }
                                        name='questionTitle'
                                        placeholder='문의 제목'
                                        onChange={ onChangeHandler }
                                    />
                
                                </div>
                            </tr>    
                            <tr>
                                <div className={ QRCSS.QRdivLabel }><label>문의 종류</label></div>
                                <div className={ QRCSS.QRRadioDiv }>
                                    {/* categoryCode = 1:배송, 2:교환, 3:상품, 4: 환불 5: 기타 */}
                                    <label className={ QRCSS.RGradioLabel }><input className={ QRCSS.RGradio } type="radio" name="questionCategory" onChange={ onChangeHandler } value="배송"/>배송</label> &nbsp;
                                    <label className={ QRCSS.RGradioLabel }><input className={ QRCSS.RGradio } type="radio" name="questionCategory" onChange={ onChangeHandler } value="주문취소"/>주문취소</label> &nbsp;
                                    <label className={ QRCSS.RGradioLabel }><input className={ QRCSS.RGradio } type="radio" name="questionCategory" onChange={ onChangeHandler } value="교환"/>교환</label> &nbsp;
                                    <label className={ QRCSS.RGradioLabel }><input className={ QRCSS.RGradio } type="radio" name="questionCategory" onChange={onChangeHandler} value="상품" />상품</label> &nbsp;
                                    <label className={ QRCSS.RGradioLabel }><input className={ QRCSS.RGradio } type="radio" name="questionCategory" onChange={onChangeHandler} value="환불" />환불</label>
                                    <label className={ QRCSS.RGradioLabel }><input className={ QRCSS.RGradio } type="radio" name="questionCategory" onChange={onChangeHandler} value="기타" />기타</label>
                                </div>
                            </tr> 
                            <tr>
                                <div className={ QRCSS.QRdivLabel }><label>문의 내용</label></div>
                                <div>
                                    <input className={ QRCSS.QRinputContents }
                                        name='questionContent'
                                        placeholder='문의 내용을 입력해주세요'
                                        onChange={ onChangeHandler }
                                    />
                                </div>
                            </tr>    
                        </tbody>                        
                    </table>
                </div>
            </div>
            <button     
                    className={ QRCSS.RGbutton }    
                    onClick={ onClickQuestionRegistrationHandler }             
                >
                    문의등록
                </button>
                <button       
                    className={ QRCSS.RGBackButton } 
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
        </div>
    );
}

export default QuestionRegistration;