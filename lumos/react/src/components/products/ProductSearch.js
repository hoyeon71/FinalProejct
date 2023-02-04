import ProductCSS from './Product.module.css';
import { useNavigate } from 'react-router-dom';

function Product({ product : { pdCode, pdName, pdPrice , productImage, pdImgPath , mainImg }}) {

    const navigate = useNavigate();

    const onClickProductHandler = (pdCode) => {
        navigate(`/product/${pdCode}`, { replace: true });        
    }

    console.log('productImage', productImage);

    return (
        <div 
            className={ ProductCSS.productDiv }
            onClick={ () => onClickProductHandler(pdCode) }
        >
            <div>                            
                { 
                    productImage?.map(pd => (pd.mainImg === 'Y') ? 
                    <img src={pd.pdImgPath} alt='mainImage' key={pd.imgNum}/> : 
                    null)
                }
            </div>                        
            <h5>{ pdName }</h5>
            <h5>{ pdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</h5>
        </div>
    );
}

export default Product;