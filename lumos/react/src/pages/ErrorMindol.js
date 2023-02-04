import {useNavigate} from 'react-router-dom';

export default function ErrorMindol() {

    const navigate = useNavigate();
    
    setTimeout(
        () => {
            // alert("가보자구~~~!!!");
            navigate("/");
        }, 3000
    );
    
    return (
        <>
            <div style={{textAlign: "center"}}>
                <h1>잘못된 접근입니다!</h1>
                <h1>3초 뒤에 이동할 테지만, 그전에 저희 집 귀여운 민돌이 보고 가세요 ^^</h1>
                <img src="https://lightin9.speedgabia.com/90_koodoyeon/team_project_lumos/mindol.jpg" border="0" width={"600px"}/>
            </div>
        </>
    )
}