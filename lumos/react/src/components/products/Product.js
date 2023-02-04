import ProductCSS from './Product.module.css';
import { useNavigate } from 'react-router-dom';

function Product({ product : { product: {pdCode, pdName, pdPrice} , pdImgPath}}) {

    const navigate = useNavigate();

    const onClickProductHandler = (pdCode) => {
        navigate(`/product/${pdCode}`, { replace: true });
        
    }


    return (
        <div 
            className={ ProductCSS.productDiv }
            onClick={ () => onClickProductHandler(pdCode) }
        >
            <img src={ pdImgPath } alt="테스트" />
            <h5>{ pdName }</h5>
            <h5>{ pdPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</h5>
        </div>
    );
}

export default Product;