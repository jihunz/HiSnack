//테이블의 행 컴포넌트 -> DB의 각 table에 저장된 데이터의 list를 반환
class DTbody extends React.Component {

    render() {
        const { list, category, chkList, onEachCheck, onGetCode, onDelete, onItem } = this.props;

        return (
            <tbody>
                {list.length ? list.map((item, idx) =>
                    <tr
                        key={idx}
                        data-code={item.code}
                    >
                        {/* 체크박스 */}
                        {category === 'sub' || category === 'orders' ? null
                            : <td>
                                <Chkbox
                                    code={item.code}
                                    index={idx}
                                    chkList={chkList[idx]}
                                    onEachCheck={onEachCheck}
                                    onGetCode={onGetCode}
                                />
                            </td>
                        }
                        {/* 데이터 td */}
                        {category === 'product' ? <ProductList item={item} category={category} onItem={onItem} /> : ''}
                        {category === 'sub' || category === 'orders' ? <OrdersList item={item} category={category} onItem={onItem} /> : ''}
                        {category === 'review' ? <ReviewList item={item} category={category} onItem={onItem} /> : ''}
                        {category === 'tag' ? <TagList item={item} category={category} onItem={onItem} /> : ''}
                        {/* 변경, 삭제 버튼 */}
                        <td data-code={item.code}>
                            {category === 'product' || category === 'tag' ?
                                <button type="button" data-bs-toggle="modal" data-bs-target="#updateModal"
                                    data-code={item.code}
                                    onClick={() => onItem(event, category)}
                                >변경
                                </button>
                                : null
                            }
                            {category === 'sub' || category === 'orders' ? null
                                : <button 
                                    id={item.code} 
                                    onClick={() => onDelete(event, category)}>삭제
                                    </button>
                            }
                        </td>
                    </tr>
                ) : <tr><td colSpan="7">등록된 정보가 없습니다</td></tr>}

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
    if (time.month < 10) {
        time.month = `0${time.month + 1}`;
    }
    if (time.date < 10) {
        time.date = `0${time.date}`;
    }
    if (time.hours < 10) {
        time.hours = `0${time.hours}`;
    }
    if (time.minutes < 10) {
        time.minutes = `0${time.minutes}`;
    }
    if (time.seconds < 10) {
        time.seconds = `0${time.seconds}`;
    }
    return time;
}

class ProductList extends React.Component {
    render() {
        const { item, category, onItem } = this.props;
        return (
            <>
                <td>{item.code}</td>
                <td data-code={item.code}><img src={item.thumbnail} id="thumbnail"></img></td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    <b>{item.name}</b>
                </td>
                <td>{item.price}</td>
                <td>{item.manufacture}</td>
            </>
        );
    }
}

class OrdersList extends React.Component {

    render() {
        const { item, category, onItem } = this.props;
        let time = fmtTimestamp(item.orderDate);
        let fmtDate = `${time.year}-${time.month}-${time.date}`;
        return (
            <>
                <td>{item.code}</td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    <b>{item.id}</b>
                </td>
                <td>{`0${item.tel}`}</td>
                <td>{fmtDate}</td>
                <td>{item.total ? item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</td>
            </>
        );
    }
}

class ReviewList extends React.Component {
    render() {
        const { item, category, onItem } = this.props;
        let time = fmtTimestamp(item.regDate);
        let fmtDate = `${time.year}-${time.month}-${time.date}`;
        return (
            <>
                <td>{item.code}</td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    <b>{item.id}</b>
                </td>
                <td>{fmtDate}</td>
                <td>{item.rating}</td>
            </>
        );
    }
}

class TagList extends React.Component {
    render() {
        const { item, category, onItem } = this.props;
        return (
            <>
                <td>{item.code}</td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    <b>{item.content}</b>
                </td>
            </>
        );
    }
}

//각 행에 삽입되는 체크박스
class Chkbox extends React.Component {
    render() {
        const { code, index, chkList, onEachCheck, onGetCode } = this.props;
        return (
            <input type="checkbox" className="chk"
                value={code}
                checked={chkList ? chkList : false}
                onChange={() => { onEachCheck(index) }}
                onClick={() => { onGetCode(event, index) }}
            />
        );
    }
}