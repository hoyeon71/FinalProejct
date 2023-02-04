import { combineReducers } from 'redux';
import questionReducer from './QuestionModules';    // 문의사항
import memberReducer from './MemberModule';         // 로그인, 회원가입
import orderReducer from './OrderModule';           // 주문내역
import cartReducer from './CartModule';             // 주문내역
import dashBoardReducer from './OrderDashBoardModule';           // 주문내역
import productReducer from './ProductModule'        // 상품
import productManagementReducer from './ProductManagementModule'; // 상품 관리
import shopReducer from './ShopModule';             // 쇼핑몰 정보
import companyReducer from './CompanyModule';       // 사업자 정보
import cartoptionReducer from './CartOptionModule';
import reviewReducer from './ReviewModule';         // 리뷰
import myOrderReducer from './MyOrderModule';       // 마이페이지 주문내역

const rootReducer = combineReducers({
    questionReducer,       // 문의사항 
    memberReducer,          // 로그인, 회원가입
    orderReducer,
    cartReducer,
    reviewReducer,
    dashBoardReducer,
    productReducer,          // 상품
    productManagementReducer, // 상품 관리
    shopReducer,
    companyReducer,
    cartoptionReducer,
    myOrderReducer
});

export default rootReducer;