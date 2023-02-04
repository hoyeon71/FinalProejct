import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import{
    callReviewsAPI
} from '../../apis/ReviewAPICalls'

function Review() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const reviews = useSelector(state => state.reviewReducer);
    const reviewList = reviews.data;

    console.log('reviewList', reviewList);
    console.log('params', params);

    const pageInfo = reviews.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }


    useEffect(
        () => {
            dispatch(callReviewsAPI({
                pdCode: params.pdCode,
                currentPage: currentPage
            }));
        }
        ,[currentPage]
    );

    const onClickTableTr = (reviewCode) => {
        navigate(`/reviewDetail/${reviewCode}`, {replace: false});
    }

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>리뷰 제목</th>
                            <th>리뷰 작성일</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(reviewList) && reviewList.map(
                            (review, index) => (
                                <tr
                                    key={ review.reviewCode}
                                    onClick={ () => onClickTableTr(review.reviewCode) }
                                >
                                    <td>{(currentPage - 1) * 10 + (index + 1)}</td>
                                    <td>{review.reviewTitle}</td>
                                    <td>{review.uploadDate}</td>
                                    <td>{review.member.memberId}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(reviewList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(reviewList) &&
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </>

        
    )
}

export default Review;