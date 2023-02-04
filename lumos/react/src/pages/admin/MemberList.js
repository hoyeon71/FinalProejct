import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate, useParams } from 'react-router-dom';

import {
    callGetMemberListAPI
}from '../../apis/MemberAPICalls'

function MemberList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  
    const memberList = member.data;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = member.pageInfo;

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {    
            if(token !== null) {
                dispatch(callGetMemberListAPI({	
                    currentPage: currentPage
                }));            
            }
        }
        ,[currentPage]
    );

    // const onClickTableTr = (memberCode) => {
    //     navigate(`/mypage/question/detail/${questionCode}`, { replace: false });
    // }


    console.log(currentPage);
    return (
        <>
            <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="20%" />
                        <col width="10%" />
                        <col width="20%" />
                        <col width="30%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>회원 번호</th>
                            <th>id</th>
                            <th>이름</th>
                            <th>성별</th>
                            <th>생년월일</th>
                            <th>연락처</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(memberList) && memberList.map(
                            (member, index) => (
                                <tr
                                    key={member.memberCode}
                                    // onClick={ () => onClickTableTr(member.memberCode) }
                                >
                                    <td>{(currentPage - 1) * 10 +  (index + 1)}</td>
                                    <td>{ member.memberId }</td>
                                    <td>{ member.memberName }</td>
                                    <td>{ member.memberGen }</td>
                                    <td>{ member.memberBirth }</td>                                
                                    <td>{ member.memberPhone }</td>
                                </tr>
                            )
                        )}
                    </tbody>                    
                </table>            
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(memberList) &&
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
            { Array.isArray(memberList) &&
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );
}

export default MemberList;