import Product from "../../components/products/Product";
import MainCSS from './ProductAll.module.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callProductListAPI
} from '../../apis/ProductAPICalls'

function Main() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer); 
    const productList = products.data;

    const pageInfo = products.pageInfo;

    console.log(pageInfo);

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callProductListAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    return (
        <div className={MainCSS.product}>
            <div className={ MainCSS.productDiv }>
            { 
                Array.isArray(productList) && productList.map((product) => (<Product key={ product.pdCode } product={ product } />))
            }
            </div>
            <div style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(productList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ MainCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : '#21C593' } : null}
                        className={ MainCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(productList) &&
                <button 
                    className={ MainCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
        </div>
    );
}

export default Main;