import Product from "../../components/products/Product";
import MainCSS from './Product.module.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callProductListAboutDOWNLIGHTAPI
} from '../../apis/ProductAPICalls'

function Downlight() {

    const dispatch = useDispatch();
    const downlight = useSelector(state => state.productReducer); 

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    console.log('downlight' , downlight);
    console.log('downlight length' , downlight.length);
    console.log('test ', downlight.map(r => r));

    useEffect(
        () => {
            dispatch(callProductListAboutDOWNLIGHTAPI());            
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
                    downlight.length > 0 && downlight.slice(offset, offset + limit).map((res) => (<Product key={ res.imgNum } product={ res } />))
                }
            </div>        
        </div>
    );
}

export default Downlight;