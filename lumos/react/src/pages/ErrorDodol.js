import {useNavigate} from 'react-router-dom';

export default function ErrorMindol() {

    const navigate = useNavigate();

    setTimeout(
        () => {
            alert("가보자구~~~!!!");
            navigate("/");
        }, 3000
    );
    
    return (
        <>
            <div style={{textAlign: "center"}}>
                <h1>잘못된 접근입니다!</h1>
                <h1>용케 여기까지 오셨군요?</h1>
                <h1>3초 뒤 이동합니다!</h1>
                <img src="https://lightin9.speedgabia.com/90_koodoyeon/team_project_lumos/cong.png" border="0" width={"600px"}/>
            </div>
        </>
    )
}