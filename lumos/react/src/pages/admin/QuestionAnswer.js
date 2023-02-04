import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


import{
    callQuestionDetailAdminAPI,
    callAnswerUpdateAPI
} from '../../apis/QuestionAPICalls'

function QuestionAnswer() {

    const dispatch = useDispatch();
    const params = useParams();
    const questionDetail  = useSelector(state => state.questionReducer);  
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

            dispatch(callQuestionDetailAdminAPI({	// 리뷰코드로 리뷰 조회 API 실행
                questionCode: params.questionCode
            }));            
        }
    ,[]);

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            questionCode: questionDetail.questionDTO.questionCode,
            questionTitle: questionDetail.questionDTO.questionTitle,
            questionContent: questionDetail.questionDTO.questionContent, 
            newName: questionDetail.questionImgDTO?.newName,
            answerContent: questionDetail.questionDTO.answerContent,
            questionCategory: questionDetail.questionDTO.questionCategory,
            questionStatus: questionDetail.questionDTO.questionStatus, 
            memberId: questionDetail.memberDTO?.memberId
        });
    }
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickAnswerUpdateHandler = () => {        
        console.log('[QuestionUpdate] onClickAnswerUpdateHandler');
       
        dispatch(callAnswerUpdateAPI({	
            form: form
        }));         
        console.log(image)
        navigate(`/questionAnswer/${questionDetail.questionDTO.questionCode}`, { replace: true});
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
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    onChange={ onChangeHandler }
                                    defaultValue={ (!modifyMode ? questionDetail.questionDTO?.questionTitle : form.questionTitle) || ''}
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
                                    defaultValue={ questionDetail && questionDetail?.memberDTO?.memberId }
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사진</th>
                            <td>
                                {questionDetail && <img
                                    src={((imageUrl == null) ? questionDetail?.questionImgDTO?.newName : imageUrl)}
                                    alt="사진없음"
                                />}
                                <input     
                                    readOnly={true}        
                                    style={ { display: 'none' }}
                                    type="file"
                                    name='newImage' 
                                    accept='image/jpg,image/png,image/jpeg,image/gif'
                                    // onChange={ onChangeImageUpload }
                                    ref={ imageInput }                            
                                />    
                                <button 
                                    // onClick={ onClickImageUpload }    
                                        style={{ backgroundColor: 'gray' }}
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
                                <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } readOnly={ true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '배송' ? true : false } value="배송"/>배송</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={ onChangeHandler } readOnly={ true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '주문취소' ? true : false } value="주문취소"/>주문취소</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={true} checked={(!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '교환' ? true : false} value="교환" />교환</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={ true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '상품' ? true : false } value="상품" />상품</label> &nbsp;
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={ true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '환불' ? true : false } value="환불" />환불</label>
                                <label><input type="radio" name="questionCategory" onChange={onChangeHandler} readOnly={ true } checked={ (!modifyMode ? questionDetail.questionDTO?.questionCategory : form.questionCategory) === '기타' ? true : false } value="기타" />기타</label>
                            </td>
                        </tr>
                        <tr>
                            <th>문의내용</th>
                            <td colSpan={2}>
                                <textarea
                                    name='questionContent'
                                    readOnly={true}
                                        style={!modifyMode ?
                                            { backgroundColor: 'gray', resize: 'none', width: '80%', height: '10em'}
                                            : { backgroundColor: 'gray', resize: 'none', width: '80%', height: '10em' }}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? questionDetail.questionDTO?.questionContent : form.questionContent) || ''}
                                >                                    
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>답변</th>
                            <td colSpan={2}>
                                <textarea
                                    name='answerContent'
                                    readOnly={modifyMode ? false : true}
                                        style={!modifyMode ?
                                            { backgroundColor: 'gray', resize: 'none', width: '80%', height: '6.25em' }
                                            : { resize: 'none', width: '80%', height: '6.25em' } }
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? questionDetail.questionDTO?.answerContent : form.answerContent) || ''}
                                >                                    
                                </textarea>
                            </td>
                        </tr>
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
                                    답변하기
                                </button>
                            }
                            {modifyMode &&
                                <button       
                                    onClick={ onClickAnswerUpdateHandler }             
                                >
                                    답변 저장하기
                                </button>
                            }
                            </div>

                </div>
            }
        </>
    );
}

export default QuestionAnswer;