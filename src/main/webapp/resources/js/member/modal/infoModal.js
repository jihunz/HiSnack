//bootstrap을 사용한 infoModal
class InfoModal extends React.Component {
    render() {
        const { category, title, item, item_sub, onRemoveTags, onAddPreference } = this.props;
        return (
            <div>
                <div className="modal fade mWrapper" id="infoModal" data-bs-keyboard="false" tabIndex="-1" onClick={onRemoveTags}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoModal">{title}</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <table className="info-table">
                                    <tbody>
                                        {category === 'sub' || category === 'orders' ? <OrdersInfo 
                                            category={category} 
                                            item={item} 
                                            item_sub={item_sub} 
                                            onAddPreference={onAddPreference}
                                        /> : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <PreferenceModal /> */}
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
        const { category, item, item_sub, onAddPreference } = this.props;
        let source;
        if (category === 'sub') {
            source = item_sub;
        } else {
            source = item;
        }

        let fmtDate = fmtTimestamp(source.orderDate);
        return (
            <>
                <tr>
                    <td className="info-titles">주문 번호</td>
                    <td colSpan="3">{source.code}</td>
                </tr>
                <tr>
                    <td className="info-titles">아이디</td>
                    <td colSpan="3">{source.id}</td>
                </tr>
                <tr>
                    <td className="info-titles">전화번호</td>
                    <td>{`0${source.tel}`}</td>
                    <td className="info-titles">주문 날짜</td>
                    <td>{fmtDate}</td>
                </tr>
                <tr>
                    <td className="info-titles">총 가격</td>
                    <td colSpan="3">{source.total ? source.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</td>
                </tr>
                <tr>
                    <td className="info-titles">주소</td>
                    <td colSpan="3" className="info-h85">{source.address}</td>
                </tr>
                <tr>
                    <td className="info-titles">수령인</td>
                    <td>{source.name}</td>
                    <td className="info-titles">주문 제품 수량</td>
                    <td>{`총 ${source.amount ? source.amount : 0}개`}</td>
                </tr>
                {source.products && source.products.length ? source.products.map(p =>
                    <tr key={p.code} className="op-tr">
                        <td>
                            <div className="op-img-wrapper">
                                {p.images && p.images.length ? <img src={p.images[0].fullpath} className="op-img"></img> : '이미지 없음'}
                                <div className="preferenceBtn-wrapper">
                                    <button 
                                        type="button" 
                                        className="preferenceBtn"
                                        onClick={() => onAddPreference(p.pcode, source.id, "y")}
                                    >👍</button>
                                    <button 
                                        type="button" 
                                        className="preferenceBtn"
                                        onClick={() => onAddPreference(p.pcode, source.id, "n")}
                                    >👎</button>
                                </div>
                            </div>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.manufacture}</td>
                        <td>{`${p.price}원`} {` * ${p.amount}개`}</td>
                    </tr>
                ) : <tr><td colSpan="4">주문한 제품이 없습니다</td></tr>}
            </>
        );
    }
}