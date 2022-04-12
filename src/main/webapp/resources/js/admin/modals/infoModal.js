//bootstrap을 사용한 infoModal
class InfoModal extends React.Component {
    render() {
        const { category, title, item, tags } = this.props;
        return (
            <div>
                <div className="modal fade mWrapper" id="infoModal" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoModal">{title} 상세</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody>
                                        {category === 'product' ?
                                            <ProductInfo
                                                title={title}
                                                item={item}
                                                tags={tags}
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
    if (time.month < 10) {time.month = `0${time.month + 1}`;}
    if (time.date < 10) {time.date = `0${time.date}`;}
    if (time.hours < 10) {time.hours = `0${time.hours}`;}
    if (time.minutes < 10) {time.minutes = `0${time.minutes}`;}
    if (time.seconds < 10) {time.seconds = `0${time.seconds}`;}
    return `${time.year}-${time.month}-${time.date}`;
}

class ProductInfo extends React.Component {
    render() {
        const { item, tags } = this.props;
        return (
            <>
                <tr>
                    <td>제품 번호</td>
                    <td>{item.code}</td>
                    <td>사진</td>
                    <td rowSpan="3">
                        {item.images > 0 ? <img id="infoImg" src={item.thumbnail}></img> : "등록된 사진이 없습니다"}
                    </td>
                </tr>
                <tr>
                    <td>제품명</td>
                    <td colSpan="2">{item.name}</td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td colSpan="2">{item.price}</td>
                </tr>
                <tr>
                    <td>제조사</td>
                    <td colSpan="3">{item.manufacture}</td>
                </tr>
                <tr>
                    <td>설명</td>
                    <td colSpan="3">{item.info}</td>
                </tr>
                <tr>
                    <td>태그</td>
                    {/* 태그를 텍스트가 아닌 버튼 형식으로 출력하는 방법에 대한 고민 필요 */}
                    <td colSpan="3">{tags ?
                        tags.map(tag => `${tag.tcode}  `)
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
                    <td>주문 번호</td>
                    <td colSpan="3">{item.code}</td>
                </tr>
                <tr>
                    <td>아이디</td>
                    <td colSpan="3">{item.id}</td>
                </tr>
                <tr>
                    <td>전화번호</td>
                    <td>{`0${item.tel}`}</td>
                    <td>주문 날짜</td>
                    <td>{fmtDate}</td>
                </tr>
                <tr>
                    <td>총 가격</td>
                    <td colSpan="3">{item.total ? item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</td>
                </tr>
                <tr>
                    <td>주소</td>
                    <td colSpan="3">{item.address}</td>
                </tr>
                <tr>
                    <td>수령인</td>
                    <td>{item.name}</td>
                    <td>주문 제품 수량</td>
                    <td>{item.list ? item.product.amount : 0}</td>
                </tr>
                {item.products ? item.products.map(p =>
                    <tr key={p.code}>
                        <td className="opTd">{p.code}
                            {p.images.length ? <img src={p.images[0].fullpath} className="opImg"></img> : '등록된 이미지가 없습니다'}
                        </td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.manufacture}</td>
                    </tr>
                ) : <tr><td>제품 이미지가 없습니다</td></tr>}
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
                    <td>아이디</td>
                    <td colSpan="3">{item.id}</td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td colSpan="3">{item.name}</td>
                </tr>
                <tr>
                    <td>전화번호</td>
                    <td>{item.tel}</td>
                    <td>관리 등급</td>
                    <td>{item.grade}</td>
                </tr>
                <tr>
                    <td>주소</td>
                    <td colSpan="3">{item.address}</td>
                </tr>
                <tr>
                    <td colSpan="4">해당 회원이 선택한 태그</td>
                </tr>
                {item.tags > 0 ? item.tags.map((tag, idx) =>
                    <tr key={idx}>
                        <td>{tag.contents}</td>
                    </tr>
                ) : <tr><td colSpan="4">아직 선택한 태그가 없습니다</td></tr>}
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
                    <td>리뷰 번호</td>
                    <td colSpan="3">{item.code}</td>
                </tr>
                <tr>
                    <td>아이디</td>
                    <td colSpan="3">{item.id}</td>
                </tr>
                <tr>
                    <td>주문 날짜</td>
                    <td>{fmtDate}</td>
                    <td>별점</td>
                    <td>{item.rating}</td>
                </tr>
                <tr>
                    <td>내용</td>
                    <td colSpan="3">{item.contents}</td>
                </tr>
                <tr>
                    <td colSpan="4">리뷰 이미지</td>
                </tr>
                {item.images > 0 ? item.images.map((image, idx) =>
                    <tr key={idx}>
                        <td className="rImg">
                            <img src={image.fullpath}></img>
                            <img src={image[idx + 1].fullpath}></img>
                        </td>
                    </tr>
                ) : <tr><td colSpan="4">등록된 이미지가 없습니다</td></tr>}
            </>
        );
    }
}