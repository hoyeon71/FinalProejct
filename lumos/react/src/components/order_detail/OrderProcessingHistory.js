import {dateFomatter} from '../../modules/Fommater';

export default function OrderProcessingHistory({order}) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            주문 처리 이력
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>주문일</th>
                        <td>{order.orderDate ? dateFomatter(order.orderDate) : '-'}</td>
                    </tr>
                    <tr>
                        <th>발주 확인일</th>
                        <td>{order.orderConf ? dateFomatter(order.orderConf) : '-'}</td>
                    </tr>
                    <tr>
                        <th>배송 출발일</th>
                        <td>{order.deliveryStart ? dateFomatter(order.deliveryStart) : '-'}</td>
                    </tr>
                    <tr>
                        <th>배송 완료일</th>
                        <td>{order.deliveryEnd ? dateFomatter(order.deliveryEnd) : '-'}</td>
                    </tr>
                    <tr>
                        <th>구매 확정일</th>
                        <td>{order.purchaseConf ? dateFomatter(order.purchaseConf) : '-'}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};