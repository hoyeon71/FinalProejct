import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Sample from './pages/Sample';
import MyPageLayout from './layouts/MyPageLayout';                          // 마이페이지
import Profile from './pages/member/Profile';                               // 회원 개인정보 조회
import QuestionRegistration from './pages/member/QuestionRegistration';     // 문의사항 등록
import QuestionList from './pages/member/QuestionList';                     // 회원별 문의사항
import QuestionDetail from './pages/member/QuestionDetail';                 // 문의사항 상세 조회
import AdminQuestionList from './pages/admin/AdminQuestionList';            // 관리자 문의사항 전체 조회
import MemberList from './pages/admin/MemberList'                           // 관리자 회원 전체 조회
import QuestionAnswer from './pages/admin/QuestionAnswer';                  // 관리자 문의사항 답변
import Login from './pages/member/Login';                                   // 로그인
import Register from './pages/member/Register';                             // 회원가입
import ProfileUpdate from './pages/member/ProfileUpdate';
import OrderDashBoard from './pages/order/OrderDashBoard';                  // 주문대시보드
import OrderManagement from './pages/order/OrderManagement';                // 주문목록

import Review from './pages/reviews/Review';                                // 리뷰 조회
import ReviewDetail from './pages/reviews/ReviewDetail'                     // 리뷰 상세
import ReviewRegist from './pages/reviews/ReviewRegist';                    // 리뷰 등록
import MyReview from './pages/reviews/MyReview';                            // 내 리뷰

import OrderDetail from './pages/order/OrderDetail';                        // 주문내역상세                      
import Cart from './pages/cart/Cart';                                       // 장바구니

import OrderList from './pages/mypage/OrderList';                            // 회원주문목록
import ProductDetail from './pages/products/ProductDetail';
import ProductManagement from './pages/admin/ProductManagement'
import ProductRegistration from './pages/admin/ProductRegistration';
import ProductUpdate from './pages/admin/ProductUpdate';
import Led from './pages/products/Led';
import Lamp from './pages/products/Lamp';
import Pendant from './pages/products/Pendant';
import Downlight from './pages/products/Downlight';
import Switch from './pages/products/Switch';
import Search from './pages/products/Search';
import ProductAll from './pages/products/ProductAll'

import ShopManagement from './pages/admin/ShopManagement';                  // 상점관리

import {useState, createContext} from 'react';
import ErrorDodol from './pages/ErrorDodol';

export const OrderContext = createContext(null);

function App() {

  const [ckeckCode, setCheckCode] = useState(new Set());

  return (
    <OrderContext.Provider value={{ckeckCode, setCheckCode}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>

            <Route index element={ <Main/> }/>   
            <Route path="productall" element={ <ProductAll /> }/>
            <Route path="search" element={ <Search /> }/>
            <Route path="product/led" element={<Led />} />
            <Route path="product/lamp" element={<Lamp />} />
            <Route path="product/pendant" element={<Pendant />} />
            <Route path="product/downlight" element={<Downlight />} />
            <Route path="product/switch" element={<Switch />} />
            <Route path="product/:productCode" element={<ProductDetail />} />
            <Route path='reviewDetail/:reviewCode' element={ <ReviewDetail/> } />
            <Route path="review/:pdCode" element={ <Review/> } /> 
            <Route path='reviewRegist' element={ <ReviewRegist/> } />  

            <Route path="mypage" element={ <MyPageLayout/> } >
                <Route index element={ <ProfileUpdate /> } />
                <Route path="profileUpdate" element={ <ProfileUpdate /> } />
                <Route path="questionregistration" element={ <QuestionRegistration /> } />
                <Route path="question" element={<QuestionList />} />
                <Route path="question/detail/:questionCode" element={<QuestionDetail />} />
                <Route path="myOrderList" element={<OrderList/>}/>
                <Route path="myReviewList" element={<MyReview/>}/>
                <Route path="order" element={<OrderList/>}/>
            </Route>
            <Route path="product-management" element={ <ProductManagement/> } />
            <Route path="product-registration" element={ <ProductRegistration/> } />
            <Route path="product-update/:productCode" element={ <ProductUpdate/> } />
            <Route path="order-dashboard" element={<OrderDashBoard/>}/>
            <Route path="order-management" element={<OrderManagement/>}/>
            <Route path="order-management/:orderCode" element={<OrderDetail />} />

            <Route path="question-management" element={<AdminQuestionList />} />
            <Route path="questionAnswer/:questionCode" element={<QuestionAnswer />} />
            <Route path="member-management" element={<MemberList />} />

            <Route path="cart/:memberId" element={<Cart/>}/>
            <Route path="shop-management" element={<ShopManagement/>}/>

            <Route path="/login" element={ <Login/> } />
            <Route path="/register" element={ <Register/> } />  
        </Route>
        <Route path="/sample" element={ <Sample/> } />
        {/* <Route path="profileUpdate/:memberId" element={ <ProfileUpdate/> } >
            <Route index element={ <ProfileUpdate /> } /> */}
            {/* <Route path="ProfileUpdate" element={ <ProfileUpdate /> } /> */}
        {/* </Route> */}
        <Route path="*" element={<ErrorDodol/>}/>
      </Routes>
    </BrowserRouter>
    </OrderContext.Provider>
  );
}

export default App;