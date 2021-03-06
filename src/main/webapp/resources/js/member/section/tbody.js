//테이블의 행 컴포넌트 -> DB의 각 table에 저장된 데이터의 list를 반환
class Tbody extends React.Component {
    render() {
        const { list, orderList, category, onDelete, onItem, onSetShowSubInfo } = this.props;

        let data;
        if (category != 'orders' && category != 'sub') {
            data = list;
        } else {
            data = orderList;
        }

        return (
            <tbody>
                {data ? data.map((item, idx) =>
                    <tr key={idx}>
                        {/* 데이터 목록 */}
                        {category === 'sub' ? <SubList item={item} category={category} onItem={onItem} onSetShowSubInfo={onSetShowSubInfo} /> : null}
                        {category === 'orders' ? <OrdersList item={item} category={category} onItem={onItem} /> : null}
                        {category === 'review' ? <ReviewList item={item} category={category} /> : null}
                        {/* 삭제 버튼 */}
                        <DelBtn
                            category={category}
                            item={item}
                            onDelete={onDelete}
                        />
                    </tr>
                ) : <tr><td colSpan="4">등록된 정보가 없습니다</td></tr>}
            </tbody>
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


class SubList extends React.Component {
    render() {
        const { item, onItem, onSetShowSubInfo } = this.props;
        return (
            <>
                <td
                    className="pointer"
                    onClick={() => onItem('sub', item.code)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    {item.products != 0 && item.products[0].images.length != 0 ? <img src={item.products[0].images[0].fullpath} className="thumbnail"></img> : '이미지 없음'}
                </td>
                <td className="pointer" onClick={() => { onItem('sub', item.code); onSetShowSubInfo(true); }}>{item.products && item.products.length ? item.products[0].name : null}</td>
                <td>{item.total ? `${item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원` : 0}</td>
            </>
        );
    }
}

class OrdersList extends React.Component {
    render() {
        const { item, onItem } = this.props;
        return (
            <>
                <td
                    className="pointer"
                    onClick={() => onItem('orders', item.code)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    {item.products != 0 && item.products[0].images.length != 0 ? <img src={item.products[0].images[0].fullpath} className="thumbnail"></img> : '이미지 없음'}
                </td>
                <td>{item.products && item.products.length ? item.products[0].name : null}</td>
                <td>{item.amount}</td>
                <td>{item.total ? `${item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원` : 0}</td>
            </>
        );
    }
}

class ReviewList extends React.Component {
    render() {
        const { item } = this.props;
        let fmtDate = fmtTimestamp(item.regDate);
        return (
            <>
                <td>{item.images && item.images.length != 0 ? <img src={item.images[0].fullpath} className="thumbnail"></img> : '이미지 없음'}</td>
                <td><a href={`/review/${item.code}`}> {item.contents}</a></td>
                <td>{item.rating}</td>
                <td>{fmtDate}</td>
            </>
        );
    }
}

class DelBtn extends React.Component {
    render() {
        const { category, item, onDelete } = this.props;
        return (
            <td data-code={item.code}>
                {category === 'sub' || category === 'orders' ?
                    <>
                        {/* <button
                            className="cancel"
                            onClick={() => onDelete(category, item.code)}>배송지 정보
                        </button> */}
                        <button
                            className="cancel"
                            onClick={() => onDelete(category, item.code)}>취소
                        </button>
                    </>
                    : null}
                {category == 'review' ? <button className="delete" onClick={() => onDelete(category, item.code)}>삭제</button> : null}
            </td>
        );
    }
}