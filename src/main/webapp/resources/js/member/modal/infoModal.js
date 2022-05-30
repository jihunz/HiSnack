//bootstrap을 사용한 infoModal
class InfoModal extends React.Component {
    render() {
        const { category, title, item, tags, onRemoveTags } = this.props;
        return (
            <div>
                <div className="modal fade mWrapper" id="infoModal" data-bs-keyboard="false" tabIndex="-1" onClick={onRemoveTags}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoModal">{title} 상세</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <table className="info-table">
                                    <tbody>
                                        {category === 'sub' || category === 'orders' ? <OrdersInfo item={item} /> : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//날짜 출력 형식 변환 함수
function fmtTimestamp(data) {
    let timestamp = new Date(data);
    let time = {
        year: timestamp.getFullYear(),
        month: timestamp.getMonth(),
        date: timestamp.getDate(),
        hours: timestamp.getHours(),
        minutes: timestamp.getMinutes(),
        seconds: timestamp.getSeconds()
    }
    if (time.month < 10) { time.month = `0${time.month + 1}`; }
    if (time.date < 10) { time.date = `0${time.date}`; }
    if (time.hours < 10) { time.hours = `0${time.hours}`; }
    if (time.minutes < 10) { time.minutes = `0${time.minutes}`; }
    if (time.seconds < 10) { time.seconds = `0${time.seconds}`; }
    return `${time.year}-${time.month}-${time.date}`;
}

class OrdersInfo extends React.Component {
    render() {
        const { item } = this.props;
        let fmtDate = fmtTimestamp(item.orderDate);
        return (
            <>
                <tr>
                    <td className="info-titles">주문 번호</td>
                    <td colSpan="3">{item.code}</td>
                </tr>
                <tr>
                    <td className="info-titles">아이디</td>
                    <td colSpan="3">{item.id}</td>
                </tr>
                <tr>
                    <td className="info-titles">전화번호</td>
                    <td>{`0${item.tel}`}</td>
                    <td className="info-titles">주문 날짜</td>
                    <td>{fmtDate}</td>
                </tr>
                <tr>
                    <td className="info-titles">총 가격</td>
                    <td colSpan="3">{item.total ? item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</td>
                </tr>
                <tr>
                    <td className="info-titles">주소</td>
                    <td colSpan="3" className="info-h85">{item.address}</td>
                </tr>
                <tr>
                    <td className="info-titles">수령인</td>
                    <td>{item.name}</td>
                    <td className="info-titles">주문 제품 수량</td>
                    <td>{`총 ${item.amount ? item.amount : 0}개`}</td>
                </tr>
                {item.products && item.products.length ? item.products.map(p =>
                    <tr key={p.code} className="op-tr">
                        <td>
                            <div className="op-img-wrapper">
                                {p.code}
                                {p.images && p.images.length ? <img src={p.images[0].fullpath} className="op-img"></img> : '이미지 없음'}
                            </div>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.manufacture}</td>
                    </tr>
                ) : <tr><td colSpan="4">주문한 제품이 없습니다</td></tr>}
            </>
        );
    }
}