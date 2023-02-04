import { Outlet, useNavigate } from "react-router-dom";
import MyPageLayoutCSS from "./MyPageLayout.module.css";
import MyPageNavbar from "../components/common/MyPageNavbar";

function MyPageLayout() {

    return (
        <>
            <div className={MyPageLayoutCSS.myPageLayoutDiv }>
                <MyPageNavbar />
                <main className={ MyPageLayoutCSS.main }>
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default MyPageLayout;