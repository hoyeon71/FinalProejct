import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


import{
    callQuestionDetailAPI,
    callQuestionUpdateAPI,
    callQuestionDeleteAPI
} from '../../apis/QuestionAPICalls'

function QuestionDetail() {

    const dispatch = useDispatch();
    const params = useParams();
    const questionDetail = useSelector(state => state.questionReducer);
    
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [modifyMode, setModifyMode] = useState(false);
    const imageInput = useRef();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({});
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
 

    useEffect(
        () => {
            console.log('[QuestionDetail] QuestionCode : ', params.questionCode);
            
            dispatch(callQuestionDetailAPI({	// 리뷰코드로 리뷰 조회 API 실행
                questionCode: params.questionCode,
                memberId: token.sub
            }));
        }
        , []);

    useEffect(() => {
        
        /* 이미지 업로드시 미리보기 세팅 */
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
            // window.location.reload();               // 사진 파일 수정후 조회용 리로드
        }
    },
        [image]);

    const onChangeImageUpload = (e) => {
        console.log(e.target.files[0]);
        const image = e.target.files[0];
        
        setImage(image);
        
    };
    
    const onClickImageUpload = () => {
        if (modifyMode) {
            imageInput.current.click();
        }
    }

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            questionCode: questionDetail.questionDTO.questionCode,
            questionTitle: questionDetail.questionDTO.questionTitle,
            questionContent: questionDetail.questionDTO.questionContent,
            newName: questionDetail.questionImg?.newName,
            questionCategory: questionDetail.questionDTO.questionCategory,
            questionStatus: questionDetail.questionDTO.questionStatus,
            questionCreateDate: questionDetail.questionDTO.questionCreateDate
            
        });
    }
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickQuestionUpdateHandler = () => {
        console.log('[QuestionUpdate] onClickQuestionUpdateHandler');

        const formData = new FormData();
        formData.append("questionTitle", form.questionTitle);
        formData.append("questionContent", form.questionContent);
        formData.append("questionCode", form.questionCode);
        formData.append("questionCategory", form.questionCategory);
        formData.append("questionCreateDate", form.questionCreateDate);
        formData.append("questionStatus", questionDetail.questionDTO.questionStatus)
        formData.append("answerContent", questionDetail.questionDTO.answerContent)
        if (image) {
            formData.append("questionImage", image);
        }
       
        dispatch(callQuestionUpdateAPI({
            form: formData
        }));
        console.log(image)
        navigate(`/mypage/question/detail/${questionDetail.questionDTO.questionCode}`, { replace: true });
        setTimeout(() => {
            console.log("Delayed for 1 second.");
            window.location.reload();                             // 파일업로드 물리적 시간 강제 딜레이 
        }, "1000")
        // window.location.reload();
    }

    const onClickQuestionDeleteHandler = (questionDetail) => {
        dispatch(callQuestionDeleteAPI({questionCode: questionDetail.questionDTO.questionCode}))
        
        navigate(`/mypage/question`, { replace: true });
        window.location.reload();
    }

    return (
        <>
            {questionDetail &&
            <div>
                <table>
                <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                    </colgroup>
                    <tbody>            
                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    name='questionTitle'
                                    placeholder='제목'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? questionDetail.questionDTO?.questionTitle : form.questionTitle) || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input 
                                    placeholder='작성자'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ token.sub }
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사진</th>
                            <td>
                                {questionDetail?.questionImgDTO && <img
                                    src={((imageUrl == null) ? questionDetail.questionImgDTO.newName : imageUrl)}
                                    alt="preview"
                                />}
                                <input                
                                    style={ { display: 'none' }}
                                    readOnly={modifyMode ? false : true}
                                    type="file"
                                    name='newImage' 
                                    accept='image/jpg,image/png,image/jpeg,image/gif'
                                    onChange={ onChangeImageUpload }
                                    ref={ imageInput }                            
                                />    
                                <button 
                                    onClick={ onClickImageUpload }    
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                >
                                이미지 업로드
                                </button>
                            </td>
                        </tr>    
                        <tr>
                            <th>작성일</th>
                            <td>
                                <input 
                                    placeholder='작성일'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ questionDetail && questionDetail.questionDTO?.questionCreateDate || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>문의유형</th>
                            <td>
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={modifyMode ? false : true} checked={(!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '배송' ? true : false} value="배송" />배송</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '주문취소' ? true : false } value="주문취소"/>주문취소</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '교환' ? true : false } value="교환"/>교환</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '상품' ? true : false } value="상품" />상품</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '환불' ? true : false } value="환불" />환불</label>
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '기타' ? true : false } value="기타" />기타</label>
                            </td>
                        </tr>
                        <tr>
                            <th>문의내용</th>
                            <td colSpan={2}>
                                <textarea
                                    name='questionContent'
                                    readOnly={modifyMode ? false : true}
                                    style={!modifyMode ?
                                        { backgroundColor: 'gray', resize: 'none', width: '80%', height: '10em'}
                                        : { backgroundColor: 'gray', resize: 'none', width: '80%', height: '10em' }}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? questionDetail.questionDTO?.questionContent : form.questionContent) || ''}
                                >                                    
                                </textarea>
                            </td>
                        </tr>
                            {questionDetail.questionDTO?.answerContent !== null ?
                                <tr>
                                    <th>답변</th>
                                    <td colSpan={2}>
                                        <textarea
                                            name='answerContent'
                                            readOnly={true}
                                            style={!modifyMode ?
                                                { backgroundColor: 'gray', resize: 'none', width: '80%', height: '10em'}
                                                : { backgroundColor: 'gray', resize: 'none', width: '80%', height: '10em' }}
                                            onChange={onChangeHandler}
                                            value={(questionDetail.questionDTO?.answerContent) || ''}
                                        >
                                        </textarea>
                                    </td>
                                    </tr>
                            : null}
                    </tbody>                    
                </table>            
            </div>
            }
            { questionDetail && 
                <div>
                    <button
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>                   
                            <div>{!modifyMode &&
                                <button       
                                    onClick={ onClickModifyModeHandler }             
                                >
                                    수정모드
                                </button>
                            }
                            {modifyMode &&
                                <button       
                                    onClick={ onClickQuestionUpdateHandler }             
                                >
                                    문의 수정 저장하기
                                </button>
                            }
                         <button     
                                onClick={() => onClickQuestionDeleteHandler(questionDetail) }             
                            >
                                    문의 삭제하기
                        </button>
                            </div>

                </div>
            }
        </>
    );
}

export default QuestionDetail;