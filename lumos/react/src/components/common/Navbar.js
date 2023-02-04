import NavbarCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink, useNavigate } from 'react-router-dom';
import {useState} from 'react'

function Navbar() {

    const navigate = useNavigate();
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
    }
    console.log('decoded ', decoded);

    const [search, setSearch] = useState('');

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onEnterkeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);
            
            navigate(`/search?value=${search}`, { replace: false });
            
            window.location.reload();
        }
    }

    const onClickSearch = e => {
        navigate(`/search?value=${search}`, { replace: false });
        window.location.reload()
    }

    

    return (
        <div className={NavbarCSS.boxing}>
             <ul>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/productall">전체 상품</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/LED">가정용 LED</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/lamp">램프</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/pendant">식탁등</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/downlight">매입등</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/switch">스위치/콘센트</NavLink></li>
                    <input 
                        className={ NavbarCSS.searchBar }
                        type="text" 
                        placeholder="제품명을 입력해 주세요" 
                        value={ search }
                        onKeyUp={ onEnterkeyHandler }
                        onChange={ onSearchChangeHandler }
                    />
                    <button 
                        className={NavbarCSS.searchBtn}
                        onClick={onClickSearch}
                    >
                        검색
                    </button>
                </ul>
        </div>
    )
}
export default Navbar;