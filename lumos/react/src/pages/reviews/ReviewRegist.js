import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ReviewRegistCSS from "./ReviewRegist.module.css";

import {
    callReviewWriteAPI
} from '../../apis/ReviewAPICalls';
import { decodeJwt } from "../../utils/tokenUtils";

function ReviewRegist() {

    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const [form, setForm] = useState({
        pdCode: '1',
        memberCode: '',
        reviewTitle: '',
        pdGrade: '',
        reviewContent: '',
        memberId: token.sub
    });

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
        imageInput.current.click();
    }

    

    // useEffect(
    //     () => {    
    //         if(token !== null) {
    //             dispatch(callReviewWriteAPI({   
    //                 memberCode: token.sub
    //             }));            
    //         }
    //     }
    //     ,[]
    // );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickProductReviewHandler = () => {
        console.log('[reviewRegist] onClickProductReviewHandler Start!');

        const formData = new FormData();

        formData.append("pdCode", 1);
        formData.append("reviewTitle", form.reviewTitle);
        formData.append("pdGrade", form.pdGrade);
        formData.append("reviewContent", form.reviewContent);
        formData.append("memberId", form.memberId);

        if(image) {
            formData.append("reviewImage", image);
        }
        
        dispatch(callReviewWriteAPI({
            form: formData
        }));

        console.log("formData:", form.pdCode);


        alert('리뷰 등록이 완료되었습니다.');

        navigate(`/review/${form.pdCode}`, {replace: true});
        window.location.reload();


        console.log('[reviewRegist] onClickProductReviewHandler End!');
    }

    return (
 <>
    <div>
        <h1>리뷰</h1>
                <div className={ReviewRegistCSS.reviewImageDiv}> 
                { imageUrl && <img
                    className={ReviewRegistCSS.reviewDetailImage}
                    src={imageUrl}
                    alt="preview"
                />}
                <input
                    style={{display: 'none '}}
                    type="file"
                    name='reviewImage'
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    onChange={ onChangeImageUpload }
                    ref={ imageInput }
                />
                <button
                        onClick={onClickImageUpload}
                >
                이미지 업로드
                </button>
            </div>
        <div>
            <table>
                <tbody>
            <tr>
                <td>
                <input
                    name='reviewTitle'
                    placeholder="리뷰 제목"
                    onChange={onChangeHandler}
                />
                </td>
            </tr>
            
        <tr>
            <td>
                <input type='radio' name='pdGrade' onChange={onChangeHandler} value='1'/>1
                <input type='radio' name='pdGrade' onChange={onChangeHandler} value='2'/>2
                <input type='radio' name='pdGrade' onChange={onChangeHandler} value='3'/>3
                <input type='radio' name='pdGrade' onChange={onChangeHandler} value='4'/>4
                <input type='radio' name='pdGrade' onChange={onChangeHandler} value='5'/>5
            </td>
        </tr>

        <tr>
            <td>
                <textarea
                    placeholder="리뷰 본문"
                    name='reviewContent'
                    onChange={onChangeHandler}
                >
                </textarea>
            </td>
        </tr>
                </tbody>
            </table>
        </div>

        <div>
            <button
                onClick={onClickProductReviewHandler}    
            >리뷰 작성</button>

            <button
                style={ {border: "none", margin: 0, fontSize: "10px", height: "10px" } }
                onClick={ () => navigate(-1) }
            >돌아가기</button>
        </div>
    </div>
    </>
    )
}

export default ReviewRegist;