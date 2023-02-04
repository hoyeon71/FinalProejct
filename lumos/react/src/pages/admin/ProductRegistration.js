import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    callProductRegistAPI
} from '../../apis/ProductAPICalls';

function ProductRegistration() {


    const dispatch = useDispatch();

    const [productImage, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        pdName: '',
        pdPrice: 0,
        pdDesc: '',
        catMain: '',
        catSub: '' 
    });

    const [imgForm, setImgForm] = useState({ 
            pdImgPath: '0', 
            mainImg: 'Y' 
        });

    const [optionForm, setOptionForm] = useState({        
            optionNm: 'c',
            optionStock: 0
        });


    useEffect(() => {

        /* 이미지 업로드시 미리보기 세팅 */
        if(productImage){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(productImage);
        }
    },
    [productImage]);
    
    console.log('123123 ',product);
    console.log('productImage    ' , productImage);
    console.log(optionForm);
    
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeHandler = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const optionChange = (e) => {
        setOptionForm({
            ...optionForm,
            [e.target.name]: e.target.value
        });
    };

    const onClickProductRegistrationHandler = () => {

        console.log('[ProductRegistration] onClickProductRegistrationHandler');

        console.log('form의 값: ', product);
        console.log('optionForm 값: ', optionForm);

        const formData = new FormData();
        formData.append("pdName", product.pdName);
        formData.append("pdPrice", product.pdPrice);
        formData.append("pdDesc", product.pdDesc);
        formData.append("catMain", product.catMain);
        formData.append("catSub", product.catSub);
        formData.append("pdImgPath", imgForm.pdImgPath);
        formData.append("mainImg", imgForm.mainImg);

        formData.append("optionNm", optionForm.optionNm);
        formData.append("optionStock", optionForm.optionStock);

        if(productImage){
            formData.append("productImage", productImage);
        }

        console.log('formData', formData);

        dispatch(callProductRegistAPI({	// 상품 상세 정보 조회
            form: formData
        }));        
        
        
        alert('상품 리스트로 이동합니다.');
        navigate('/product-management', { replace: true});
        window.location.reload();
    }
    

    return (
        <div>
            <div className={ ProductRegistrationCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={ onClickProductRegistrationHandler }             
                >
                    상품 등록
                </button>
            </div>        
            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <div className={ ProductRegistrationCSS.productImageDiv }>
                        { imageUrl && <img 
                            className={ ProductRegistrationCSS.productImage } 
                            src={ imageUrl } 
                            alt="preview"
                        />}
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='productImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button 
                            className={ ProductRegistrationCSS.productImageButton }
                            onClick={ onClickImageUpload } 
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>상품이름</label></td>
                                <td>
                                    <input 
                                        name='pdName'
                                        placeholder='상품 이름'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품가격</label></td>
                                <td>
                                    <input 
                                        name='pdPrice'
                                        placeholder='상품 가격'
                                        type='number'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    


                            <tr>
                                <td><label>대분류 카테고리</label></td>
                                <td>
                                    <select name ='catMain' onChange={onChangeHandler}>
                                        <option defaultValue disabled hidden>선택해주세요</option>
                                        <option value='가정용 LED'>가정용 LED</option>
                                        <option value='매입등'>매입등</option>
                                        <option value='램프'>램프</option>
                                        <option value='스위치/콘센트'>스위치/콘센트</option>
                                        <option value='식탁등'>식탁등</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>소분류 카테고리</label></td>
                                <td>
                                    {(() => {
                                        switch(product.catMain){
                                            case '가정용 LED' :
                                        return <select name ='catSub' onChange={onChangeHandler}>
                                            <option value=""> 선택해주세요 </option>
                                            <option value='거실'>거실</option>
                                            <option value='방'>방</option>
                                            <option value='현관'>현관</option>
                                        </select>;

                                            case '매입등' :
                                        return    <select name ='catSub' onChange={onChangeHandler}>
                                            <option value='3인치'>3인치</option>
                                            <option value='2인치 (가구매입)'>2인치 (가구매입)</option>
                                        </select>;

                                            case '램프' :                                               
                                        return    <select name ='catSub' onChange={onChangeHandler}>
                                            <option value='벌브'>벌브</option>
                                            <option value='볼'>볼</option>
                                            <option value='에디슨'>에디슨</option>
                                        </select>;

                                            case '스위치/콘센트' :                                        
                                        return    <select name ='catSub' onChange={onChangeHandler}>
                                                <option value='엑셀'>엑셀</option>
                                                <option value='아테오'>아테오</option>
                                            </select>;

                                            case '식탁등' :
                                        return  <select name ='catSub' onChange={onChangeHandler}>
                                                    <option value='빈티지'>빈티지</option>
                                                    <option value='모던'>모던</option>
                                                </select>;
                                            default :
                                            return <select>
                                                <option value="">선택불가</option>
                                            </select>
                                        }
                                    })()}
                                </td>
                            </tr>
                            <tr>
                                <td><label>상품 재고</label></td>
                                <td>
                                <input 
                                        placeholder='상품 재고'
                                        type='number'
                                        name='optionStock'
                                        onChange={ optionChange }
                                        className={ ProductRegistrationCSS.productInfoInput }
                                    />
                                </td>
                            </tr> 
                            <tr>
                                <td><label>상품 옵션</label></td>
                                <td>
                                <input 
                                        placeholder='상품 옵션'
                                        name='optionNm'
                                        onChange={ optionChange }
                                        className={ ProductRegistrationCSS.productInfoInput }
                                    />
                                </td>
                            </tr> 
                            <tr>
                                <td><label>상품 설명</label></td>
                                <td>
                                    <textarea 
                                        className={ ProductRegistrationCSS.textAreaStyle }
                                        name='pdDesc'
                                        onChange={ onChangeHandler }
                                    ></textarea>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductRegistration;