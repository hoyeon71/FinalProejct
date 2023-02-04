import Product from "../../components/products/Product";
import MainCSS from './Product.module.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callProductListAboutLEDAPI
} from '../../apis/ProductAPICalls'

function Led() {

    const dispatch = useDispatch();
    const led = useSelector(state => state.productReducer); 

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    console.log('led' , led);

    useEffect(
        () => {
            dispatch(callProductListAboutLEDAPI());            
        }
        ,[]
    );

    const onChangeHandler = (e) => {
        setLimit(e.target.value);
    }


    return (
        <div className={MainCSS.product}>
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
                <option value="40">40</option>
                </select>
            </label>
            <div className={ MainCSS.productDiv }>
                { 
                    led.length > 0 && led.slice(offset, offset + limit).map((res) => (<Product key={ res.imgNum } product={ res } />))
                }
            </div>        
        </div>
    );
}

export default Led;