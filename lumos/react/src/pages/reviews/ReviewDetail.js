import ReviewDetailCSS from './ReviewDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


import{
    callReviewDeleteAPI,
    callReviewDetailAPI,
    callReviewUpdateAPI
} from '../../apis/ReviewAPICalls'

function ReviewDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const review  = useSelector(state => state.reviewReducer);  
    const reviewDetail = review.data;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const [modifyMode, setModifyMode] = useState(false); 
    const [form, setForm] = useState({});
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    /* 현재의 url 맨 뒤 memberId 위치 parsing 하기 */
    // const url = document.location.href;
    // const splitUrl = url.split('/');
    // const location = splitUrl[splitUrl.length - 1];
    // console.log("url 마지막 값: ", location);

    useEffect(        
        () => {
            console.log('[ReviewDetail] ReviewCode : ', params.reviewCode);
            dispatch(callReviewDetailAPI({	// 리뷰코드로 리뷰 조회 API 실행
                reviewCode: params.reviewCode
            }));            
        }
        ,[]
    );  

    useEffect(() => {
        
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const {result} = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];

        setImage(image);
    }

    const onClickImageUpload = () => {
        if(modifyMode) {
            imageInput.current.click();
        }
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            reviewCode: reviewDetail.reviewImageMemberDTO.reviewCode,
            reviewTitle: reviewDetail.reviewImageMemberDTO.reviewTitle,
            pdGrade: reviewDetail.reviewImageMemberDTO.pdGrade,
            reviewContent: reviewDetail.reviewImageMemberDTO.reviewContent,
        });
    }

    const onClickReviewDeleteHandler = (reviewDetail) => {
        dispatch(callReviewDeleteAPI({reviewCode: reviewDetail.reviewImageMemberDTO.reviewCode}))

        alert('리뷰 삭제 완료!');
        navigate(`/mypage/myReviewList`, {replace: false});
        window.location.reload();
    }

    const onClickReviewUpdateHandler = () => {    
        
        console.log('[ReviewUpdate] onClickReviewUpdateHandler');

        const formData = new FormData();

        formData.append("reviewCode", form.reviewCode);
        formData.append("reviewTitle", form.reviewTitle);
        formData.append("pdGrade", form.pdGrade);
        formData.append("reviewContent", form.reviewContent);
        if(image) {
            formData.append("reviewImage", image);
        }
        console.log("form:", form);
        console.log("image:", image);

        dispatch(callReviewUpdateAPI({	// 리뷰 정보 업데이트
            form: formData
        }));         

        alert('리뷰 수정 완료!');
        navigate(`/reviewDetail/${reviewDetail.reviewImageMemberDTO.reviewCode}`, { replace: true });
        window.location.reload();
    }    


    return (
        <div>
            { reviewDetail &&
            <div className={ ReviewDetailCSS.reviewDetailtableDiv }>
                <div className={ ReviewDetailCSS.reviewDetailtableCss }>
                {/* <colgroup>
                    <col width="20%" />
                    <col width="80%" />
                </colgroup> */}
                    <div className={ ReviewDetailCSS.reviewImageDiv }>
                    { reviewDetail && !modifyMode &&<img
                        className={ ReviewDetailCSS.reviewDetailImage}
                        src={ (reviewDetail.imageDTO == null) ? '' : reviewDetail.imageDTO.newNm }
                        // src={ `${reviewDetail.imageDTO.newNm}` }
                        alt={ (imageUrl == null) ? '' : 'preview' }
                        // alt="preview"
                    />}
                    </div>
                    <div className={ ReviewDetailCSS.reviewImageDiv }>    
                    { reviewDetail && modifyMode &&<img
                        className={ ReviewDetailCSS.reviewDetailImage}
                        src={ imageUrl }
                        // src={ `${reviewDetail.imageDTO.newNm}` }
                        alt={ (imageUrl == null) ? '' : 'preview' }
                        // alt="preview"
                    />}
                    </div>
                    {/* { reviewDetail && modifyMode && imageUrl!==null &&<img
                        src={ (imageUrl == null) ? '' : imageUrl }
                        // src={ `${reviewDetail.imageDTO.newNm}` }
                        alt={ (imageUrl == null) ? '' : 'preview' }
                        // alt="preview"
                    />} */}
                    <input
                        style={ { display: 'none' } }
                        type='file'
                        name='reviewImage'
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={onChangeImageUpload}
                        ref={imageInput}
                    />
                    { modifyMode &&
                    <button
                        onClick={onClickImageUpload}
                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                    >
                        이미지 업로드
                    </button>}
                </div>
                <table>
                    <tbody>            
                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    className={ ReviewDetailCSS.ReviewDetailInput }
                                    name='reviewTitle'
                                    placeholder='제목'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? reviewDetail.reviewImageMemberDTO?.reviewTitle 
                                          : form.reviewTitle) || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>평점</th>
                            { !modifyMode && <td>
                                {/* <input  
                                    className={ ReviewDetailCSS.ReviewDetailInput }
                                    name='pdGrade'
                                    placeholder='평점'
                                    readOnly={modifyMode ? false : true}
                                    style={!modifyMode ? { backgroundColor: 'gray' } : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? reviewDetail.reviewImageMemberDTO.pdGrade : form.pdGrade) || ''}
                                /> */}
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ true } checked={ (reviewDetail.reviewImageMemberDTO?.pdGrade) == '1' ? true : false } value='1'/>1</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ true } checked={ (reviewDetail.reviewImageMemberDTO?.pdGrade) == '2' ? true : false } value='2'/>2</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ true } checked={ (reviewDetail.reviewImageMemberDTO?.pdGrade) == '3' ? true : false } value='3'/>3</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ true } checked={ (reviewDetail.reviewImageMemberDTO?.pdGrade) == '4' ? true : false } value='4'/>4</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ true } checked={ (reviewDetail.reviewImageMemberDTO?.pdGrade) == '5' ? true : false } value='5'/>5</label>
                            </td>}
                             { modifyMode && <td>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ false } checked={ ( form.pdGrade) == '1' ? true : false } value="1"/>1</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ false } checked={ ( form.pdGrade) == '2' ? true : false } value="2"/>2</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ false } checked={ ( form.pdGrade) == '3' ? true : false } value="3"/>3</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ false } checked={ ( form.pdGrade) == '4' ? true : false } value="4"/>4</label>
                                <label><input type="radio" name='pdGrade' onChange={ onChangeHandler } readOnly={ false } checked={ ( form.pdGrade) == '5' ? true : false } value="5"/>5</label>
                            </td>}
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input  
                                    className={ ReviewDetailCSS.ReviewDetailInput }
                                    placeholder='작성자'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ reviewDetail && reviewDetail.reviewImageMemberDTO?.member?.memberId || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>작성일</th>
                            <td>
                                <input 
                                    className={ ReviewDetailCSS.ReviewDetailInput }
                                    placeholder='작성일'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ reviewDetail && reviewDetail.reviewImageMemberDTO?.uploadDate || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <textarea
                                    name='reviewContent'
                                    className={ ReviewDetailCSS.contentTextArea }
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? reviewDetail.reviewImageMemberDTO?.reviewContent : form.reviewContent) || ''}
                                >                                    
                                </textarea>
                            </td>
                        </tr>
                    </tbody>                    
                </table>            
            </div>
            }
            { reviewDetail && 
                <div className={ ReviewDetailCSS.buttonDivCss }>
                    <button
                        className={ ReviewDetailCSS.backBtn }
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>
                    
                    { token &&
                        (token.sub === reviewDetail.reviewImageMemberDTO?.member?.memberId) 
                        ?                 
                            <div>{!modifyMode &&
                                <button       
                                    className={ ReviewDetailCSS.backBtn }
                                    onClick={ onClickModifyModeHandler }             
                                >
                                    수정모드
                                </button>
                            }
                            {modifyMode &&
                                <button       
                                    className={ ReviewDetailCSS.backBtn }
                                    onClick={ onClickReviewUpdateHandler }             
                                >
                                    리뷰수정
                                </button>

                            }
                            {modifyMode &&
                                <button
                                    className={ ReviewDetailCSS.backBtn }
                                    onClick={() =>  onClickReviewDeleteHandler(reviewDetail) }
                                >
                                    리뷰삭제
                                </button>
                            }
                            </div>
                        : null
                    }
                </div>
            }
        </div>
    );
}

export default ReviewDetail;