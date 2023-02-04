import MainCSS from '../Main.module.css';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductSearch from "../../components/products/ProductSearch";

import {
    callSearchProductAPI
} from '../../apis/ProductAPICalls';

function Search() {

    const { search } = useLocation();
    const { value } = queryString.parse(search);

    const products = useSelector(state => state.productReducer); 

    console.log('products' , products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callSearchProductAPI({
            search: value
        }));        
    },
    []);

    return (
        <div className={ MainCSS.productDiv }>
            { 
               products.length > 0 && products.map((product) => (<ProductSearch key={ product.pdCode } product={ product } />))
            }
        </div>
    );
}

export default Search;