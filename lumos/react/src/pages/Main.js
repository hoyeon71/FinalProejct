import MainCSS from './Main.module.css';

export default function Main() {

    const imgUrl1 = "https://lightin9.speedgabia.com/00_main/slider/legrand.jpg";
    const imgUrl2 = "https://lightin9.speedgabia.com/00_main/slider/cob.jpg";
    const imgUrl3 = "https://lightin9.speedgabia.com/00_main/slider/edge.jpg";

    return (
        <>
            <div className={MainCSS.outer} id="outer">
                <div className={MainCSS.slider} id="slider">
                    <img src={imgUrl1} border="0" width={"100%"}/>
                </div>
            </div>
        </>
    )
}