//테이블의 행 컴포넌트 -> DB의 각 table에 저장된 데이터의 list를 반환
class Tbody extends React.Component {
    render() {
        const { list, category, chkList, onEachCheck, onGetCode, onDelete, onItem } = this.props;
        return (

            <tbody>
                {list.length ? list.map((item, idx) =>
                    <tr
                        key={idx}
                        className={`tr-${idx}`}
                        data-code={category === 'member' ? item.id : item.code}
                    >
                        {/* 체크박스 */}
                        {category === 'sub' || category === 'orders' ? null
                            : <td>
                                <input type="checkbox" className="chk"
                                    value={category === 'member' ? item.id : item.code}
                                    checked={chkList[idx] ? chkList[idx] : false}
                                    onChange={() => { onEachCheck(idx) }}
                                    onClick={() => { onGetCode(event, idx) }}
                                />
                            </td>
                        }
                        {/* 데이터 목록 */}
                        {category === 'product' ? <ProductList item={item} category={category} onItem={onItem} /> : ''}
                        {category === 'sub' || category === 'orders' ? <OrdersList item={item} category={category} onItem={onItem} /> : ''}
                        {category === 'member' ? <MemberList item={item} category={category} onItem={onItem} /> : ''}
                        {category === 'review' ? <ReviewList item={item} category={category} onItem={onItem} /> : ''}
                        {category === 'tag' ? <TagList item={item} /> : ''}

                        {/* 변경, 삭제 버튼 */}
                        {category === 'sub' || category === 'orders' ? null
                            :  <UpDelBtn
                                category={category}
                                item={item}
                                onItem={onItem}
                                onDelete={onDelete}
                            />
                        }
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
    if (time.month < 10) {time.month = `0${time.month + 1}`;}
    if (time.date < 10) {time.date = `0${time.date}`;}
    if (time.hours < 10) {time.hours = `0${time.hours}`;}
    if (time.minutes < 10) {time.minutes = `0${time.minutes}`;}
    if (time.seconds < 10) {time.seconds = `0${time.seconds}`;}
    return `${time.year}-${time.month}-${time.date}`;
}

class ProductList extends React.Component {
    render() {
        const { item, category, onItem } = this.props;
        return (
            <>
                <td>{item.code}</td>
                <td data-code={item.code}>
                    {item.images != 0 ? <img src={item.thumbnail} id="p-img"></img> : '등록된 이미지가 없습니다'}
                </td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >
                    {item.name}
                </td>
                <td>{item.price ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</td>
                <td>{item.manufacture}</td>
            </>
        );
    }
}

class OrdersList extends React.Component {
    render() {
        const { item, category, onItem } = this.props;
        let fmtDate = fmtTimestamp(item.orderDate);
        return (
            <>
                <td>{item.code}</td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >{item.id}</td>
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
        let fmtDate = fmtTimestamp(item.regDate);
        return (
            <>
                <td>{item.code}</td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >{item.id}</td>
                <td>{fmtDate}</td>
                <td>{item.rating}</td>
            </>
        );
    }
}

class MemberList extends React.Component {
    render() {
        const { item, category, onItem } = this.props;
        return (
            <>
                <td>{item.id}</td>
                <td
                    className="pointer"
                    onClick={() => onItem(event, category)}
                    data-bs-toggle="modal"
                    data-bs-target="#infoModal"
                >{item.name}</td>
                <td>{item.tel}</td>
                <td>{item.grade}</td>
            </>
        );
    }
}

class TagList extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <>
                <td>{item.code}</td>
                <td>{item.content}</td>
            </>
        );
    }
}

class UpDelBtn extends React.Component {
    render() {
        const { category, item, onItem, onDelete } = this.props;
        return (
            <td data-code={item.code} className="upDelBtn">
                {category === 'product' || category === 'tag' ?
                    <button type="button" data-bs-toggle="modal" data-bs-target="#updateModal"
                        data-code={item.code}
                        onClick={() => onItem(event, category)}
                    >변경</button>
                    : null
                }
                {category === 'sub' || category === 'orders' ? null
                    : <button
                        id={category === 'member' ? item.id : item.code}
                        onClick={() => onDelete(event, category)}>삭제
                    </button>
                }
            </td>
        );
    }
}