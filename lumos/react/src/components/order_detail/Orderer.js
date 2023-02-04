import {phoneFomatter} from '../../modules/Fommater';

export default function Orderer({order : {memberCode: member, ...etc}}) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            구매자 정보
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>구매자명</th>
                        <td>{member.memberName}</td>
                    </tr>
                    <tr>
                        <th>구매자ID</th>
                        <td>{member.memberId}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{phoneFomatter(member.memberPhone)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};