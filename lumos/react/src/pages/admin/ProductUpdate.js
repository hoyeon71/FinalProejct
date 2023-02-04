import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callProductDetailForAdminAPI,
    callProductUpdateAPI,
    callProductDeleteAPI
} from '../../apis/ProductAPICalls';

function ProductUpdate() {

    const dispatch = useDispatch();
    const params = useParams();
    const productDetail  = useSelector(state => state.productReducer);  
    const products = productDetail.data;
    
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [modifyMode, setModifyMode] = useState(false);
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({});

    const {product , option} = productDetail;

    console.log('productDetail : ', productDetail);
    console.log('product ' , product);
    console.log('option ', option);
    console.log('form' , form);

    useEffect(        
        () => {
            console.log('[ProductUpdate] productCode : ', params.productCode);

            dispatch(callProductDetailForAdminAPI({	
                imgNum: params.productCode
            }));                     
        }
    ,[]);

    useEffect(() => {
        
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
    [image]);

    const onClickDelete = e => {
        dispatch(callProductDeleteAPI({
            imgNum: productDetail.imgNum
        }))

        alert('상품을 삭제했습니다.');
        navigate('/', { replace: true});
        window.location.reload();
    }

    const onChangeImageUpload = (e) => {
        console.log(e.target.files[0]);
        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        if(modifyMode){
            imageInput.current.click();
        }
    }
    
    const onClickModifyModeHandler = () => {    // 수정모드
        setModifyMode(true);
        setForm({
            pdCode: product.pdCode,
            pdName: product.pdName,
            pdPrice: product.pdPrice,
            catMain: product.catMain,
            catSub: product.catSub,
            optionNm: option.optionNm,
            optionStock: option.optionStock,
            pdDesc: product.pdDesc
        });
    }

    /* form 데이터 세팅 */  
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickProductUpdateHandler = () => {

        console.log('[ProductUpdate] onClickProductUpdateHandler');

        const formData = new FormData();
        formData.append("pdCode", form.pdCode);
        formData.append("pdName", form.pdName);
        formData.append("pdPrice", form.pdPrice);
        formData.append("catMain", form.catMain);
        formData.append("catSub", form.catSub);
        formData.append("optionNm", form.optionNm);
        formData.append("pdStock", form.optionStock);
        formData.append("pdDesc", form.pdDesc);

        if(image){
            formData.append("productImage", image);
        }

        dispatch(callProductUpdateAPI({	// 상품 정보 업데이트
            form: formData
        }));         

        alert('상품을 수정했습니다.');
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
                {!modifyMode &&
                    <button       
                        onClick={ onClickModifyModeHandler }             
                    >
                        수정모드
                    </button>
                }
                {modifyMode &&
                    <button       
                        onClick={ onClickProductUpdateHandler }             
                    >
                        상품 수정 저장
                    </button>
                }
                <button       
                    onClick={ onClickDelete }             
                >
                    삭제하기
                </button>
            </div>        
            {productDetail &&

            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <div className={ ProductRegistrationCSS.productImageDiv }>                        
                        { productDetail && <img 
                            className={ ProductRegistrationCSS.productImage } 
                            src={ (imageUrl == null) ? productDetail.pdImgPath : imageUrl } 
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
                            style={ !modifyMode ? { backgroundColor: 'gray'} : null}
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
                                        value={ (!modifyMode ? product?.pdName : form.pdName) || ''}
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품가격</label></td>
                                <td>
                                    <input 
                                        name='pdPrice'
                                        placeholder='상품 가격'
                                        value={(!modifyMode ? product?.pdPrice : form.pdPrice) || 0 }
                                        type='number'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>대분류 카테고리</label></td>
                                <td>
                                    <select name ='catMain' onChange={onChangeHandler}>
                                        <option disabled hidden>선택해주세요</option>
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
                                        switch(form.catMain){
                                            case '가정용 LED' :
                                        return <select name ='catSub' onChange={onChangeHandler}>
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
                                <td><label>상품 옵션</label></td>
                                <td><select 
                                    onChange={ onChangeHandler }  
                                    name = 'optionNm'            
                                >
                                    <option value='' disabled hidden>
                                        선택
                                    </option>
                                
                                    <option 
                                        value={option?.optionNm}
                                    >
                                        {option?.optionNm}
                                    </option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>상품 재고</label></td>
                                <td>
                                <input 
                                        placeholder='상품 재고'
                                        type='number'
                                        name='optionStock'
                                        value={ (!modifyMode ? option?.optionStock : form.optionStock) || 0 }
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
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
                                        readOnly={ modifyMode ? false : true }
                                        value={ (!modifyMode ? product?.pdDesc : form.pdDesc) || '' }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    ></textarea>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
            }

        </div>
    );
}

export default ProductUpdate;