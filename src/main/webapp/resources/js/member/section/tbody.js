//테이블의 행 컴포넌트 -> DB의 각 table에 저장된 데이터의 list를 반환
class Tbody extends React.Component {
    render() {
        const { list, category, onDelete, onItem } = this.props;
        return (
            <tbody>
                {list ? list.map((item, idx) =>
                    <tr key={idx}>
                        {/* 데이터 목록 */}
                        {category === 'sub' ? <SubList item={item} category={category} onItem={onItem} /> : null}
                        {category === 'orders' ? <OrdersList item={item} category={category} onItem={onItem} /> : null}
                        {category === 'review' ? <ReviewList item={item} category={category} onItem={onItem} /> : null}
                        {/* 변경, 삭제 버튼 */}
                        <DelBtn
                            category={category}
                            item={item}
                            onItem={onItem}
                            onDelete={onDelete}
                        />
                    </tr>
                ) : <tr><td colSpan="4">등록된 정보가 없습니다</td></tr>}

            </tbody>
        );
    }
}

class SubList extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <>
                <td>{item.products.images && item.products.images.length ? <img src={item.products[0].images[0].fullpath}></img> : '이미지 없음'}</td>
                <td>{item.products && item.products.length ? item.products[0].name : null}</td>
                <td>{item.total ? item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</td>
            </>
        );
    }
}

class OrdersList extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <>
                <td>{item.products.images && item.products.images.length ? <img src={item.products[0].images[0].fullpath}></img> : '이미지 없음'}</td>
                <td>{item.products && item.products.length ? item.products[0].name : null}</td>
                <td>{item.amount}</td>
                <td>{item.total ? item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</td>
            </>
        );
    }
}

class ReviewList extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <>
                <td>{item.images && item.images.length ? <img src={item.images[0].fullpath}></img> : '이미지 없음'}</td>
                <td>{item.contents}</td>
                <td>{item.rating}</td>
                <td>{item.price}</td>
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
                    <button
                        id={item.code}
                        onClick={() => onDelete(event, category)}>취소
                    </button>
                    : null}
                {category == 'review' ? <button>삭제</button> : null}
            </td>
        );
    }
}