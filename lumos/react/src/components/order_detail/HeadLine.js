import OrderDetailCSS from '../../pages/order/OrderDetail.module.css';

export default function HeadLine({order}) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            주문 상세 조회
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={OrderDetailCSS.headline1}>주문번호</td>
                        <td className={OrderDetailCSS.headline2}>{order.orderCode}</td>
                        <td className={OrderDetailCSS.headline1}>클레임상태</td>
                        <td className={OrderDetailCSS.headline2}>{order.stClaim ? order.stClaim : "-"}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};