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
                                        {category === 'product' ?
                                            <ProductInfo
                                                title={title}
                                                item={item}
                                            /> : null
                                        }
                                        {category === 'sub' || category === 'orders' ? <OrdersInfo item={item} /> : null}
                                        {category === 'member' ? <MemberInfo item={item} /> : null}
                                        {category === 'review' ? <ReviewInfo item={item} /> : null}
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

class ProductInfo extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <>
                <tr>
                    <td className="info-titles">제품 번호</td>
                    <td className="info-w220">{item.code}</td>
                    <td className="info-titles info-w160">사진</td>
                    <td rowSpan="3" className="info-w160">
                        {item.images && item.images.length ? <img class="info-p-img" src={item.images[0].fullpath}></img> : "등록된 사진이 없습니다"}
                    </td>
                </tr>
                <tr>
                    <td className="info-titles">제품명</td>
                    <td colSpan="2">{item.name}</td>
                </tr>
                <tr>
                    <td className="info-titles">가격</td>
                    <td colSpan="2">{item.price}</td>
                </tr>
                <tr>
                    <td className="info-titles">제조사</td>
                    <td colSpan="3">{item.manufacture}</td>
                </tr>
                <tr className="info-h85">
                    <td className="info-titles">설명</td>
                    <td colSpan="3">{item.info}</td>
                </tr>
                <tr className="info-h85">
                    <td className="info-titles">태그</td>
                    {/* 태그를 텍스트가 아닌 버튼 형식으로 출력하는 방법에 대한 고민 필요 */}
                    <td colSpan="3">{item.tags && item.tags.length ?
                        item.tags.map(tag => `${tag.content}  `)
                        : "등록된 태그가 없습니다"}
                    </td>
                </tr>
            </>
        );
    }
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

class MemberInfo extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <>
                <tr>
                    <td className="info-titles">아이디</td>
                    <td colSpan="3">{item.id}</td>
                </tr>
                <tr>
                    <td className="info-titles">이름</td>
                    <td colSpan="3">{item.name}</td>
                </tr>
                <tr>
                    <td className="info-titles">전화번호</td>
                    <td className="info-w300">{item.tel}</td>
                    <td className="info-titles">관리 등급</td>
                    <td className="info-w80">{item.grade}</td>
                </tr>
                <tr>
                    <td className="info-titles info-h85">주소</td>
                    <td colSpan="3">{item.address}</td>
                </tr>
                <tr>
                    <td colSpan="4" className="info-titles2">해당 회원이 선택한 태그</td>
                </tr>
                <tr>
                    <td colSpan="4" id="m-t-td">
                        {item.tags && item.tags.length ? item.tags.map((tag, idx) =>
                            <div key={idx} className="t-item">{`#${tag.content}`}</div>
                        ) : <div className="text-align-center">아직 선택한 태그가 없습니다</div>}
                    </td>
                </tr>
            </>
        );
    }
}

class ReviewInfo extends React.Component {
    render() {
        const { item } = this.props;
        let fmtDate = fmtTimestamp(item.regDate);
        return (
            <>
                <tr>
                    <td className="info-titles">리뷰 번호</td>
                    <td colSpan="3">{item.code}</td>
                </tr>
                <tr>
                    <td className="info-titles">아이디</td>
                    <td colSpan="3">{item.id}</td>
                </tr>
                <tr>
                    <td className="info-titles">주문 날짜</td>
                    <td className="info-w220">{fmtDate}</td>
                    <td className="info-titles">별점</td>
                    <td>{item.rating}</td>
                </tr>
                <tr>
                    <td className="info-titles info-h150">내용</td>
                    <td colSpan="3">{item.contents}</td>
                </tr>
                <tr>
                    <td colSpan="4" className="info-titles2">리뷰 이미지</td>
                </tr>
                <tr>
                    <td colSpan="4" id="r-img-td">
                        <div className={item.images && item.images.length ? null : 'just-center'}>
                            {item.images && item.images.length ? item.images.map((image, idx) =>
                                <img key={idx} src={image.fullpath} className="r-img"></img>
                            ) : <div>등록된 이미지가 없습니다</div>}
                        </div>
                    </td>
                </tr>
            </>
        );
    }
}