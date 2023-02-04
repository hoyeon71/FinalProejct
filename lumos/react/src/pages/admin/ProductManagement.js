import ProductManagementCSS from './ProductManagement.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";

import{
    callProductListForAdminAPI
} from '../../apis/ProductManagementAPICalls'

function ProductManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products  = useSelector(state => state.productManagementReducer);
    const productList = products.data;
    
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    console.log('products' , products);
    console.log('productManagement', productList);

    const pageInfo = products.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    const onChangeHandler = (e) => {
        setLimit(e.target.value);
    }

    useEffect(
        () => {
            setStart((currentPage - 1) * 5);            
            dispatch(callProductListForAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickProductInsert = () => {
        console.log('[ProductManagement] onClickProductInsert');
        navigate("/product-registration", { replace: false })
    }

    const onClickTableTr = (imgNum) => {
        navigate(`/product-update/${imgNum}`, { replace: false });
    }

    return (
        <>
        <div className={ ProductManagementCSS.bodyDiv }>
            <div className={ ProductManagementCSS.buttonDiv }>
                <button
                    onClick={ onClickProductInsert }
                >
                    상품 등록
                </button>
            </div>          
            <label>
                표시할 게시물 수:&nbsp;
                <select
                    type="number"
                    value={limit}
                    onChange={onChangeHandler}
                >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                </select>
            </label>  
            <table className={ ProductManagementCSS.productTable }>
                <colgroup>
                    <col width="15%" />
                    <col width="40%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품이름</th>
                        <th>상품가격</th>
                        <th>대분류 카테고리</th>
                        <th>소분류 카테고리</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(products) && products.slice(offset, offset + limit).map((p) => (
                        <tr
                            key={ p.imgNum }
                            onClick={ () => onClickTableTr(p.imgNum) }
                        >
                            <td>{ p.product.pdCode }</td>
                            <td>{ p.product.pdName }</td>
                            <td>{ p.product.pdPrice }</td>
                            <td>{ p.product.catMain }</td>
                            <td>{ p.product.catSub }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(productList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ ProductManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber?.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ ProductManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(productList) &&
            <button 
                className={ ProductManagementCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );
}

export default ProductManagement;