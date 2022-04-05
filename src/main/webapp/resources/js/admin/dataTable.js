// 테이블 컴포넌트 -> table 태그를 반환
class DataTable extends React.Component {
    render() {
        const { list, onDelete, onItem, } = this.props;

        return (
            <div>
                {/* css 작업 시작 시 border 속성 삭제해도 됨 */}
                <table border="1">
                    <thead id="th">
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>제품 번호</td>
                            <td>사진</td>
                            <td>제품명</td>
                            <td>가격</td>
                            <td>제조사</td>
                            <td>관리</td>
                        </tr>
                    </thead>
                    <List 
                        list={list} 
                        onDelete={onDelete} 
                        onItem={onItem}
                    />
                </table>
            </div>
        );
    }
}

//테이블의 자식 컴포넌트 -> DB의 각 table에 저장된 정보의 list를 반환
class List extends React.Component {
    render() {
        const { list, onDelete, onItem } = this.props;

        return (
            <tbody>
                {list.length ? list.map(item =>
                    <tr key={item.code}>
                        <td><input type="checkbox" className="chk"value={item.code}/></td>
                        <td>{item.code}</td>
                        <td><img src={item.thumbnail} id="thumbnail"></img></td>
                        <td><b onClick={null}>{item.name}</b></td>
                        <td>{item.price}</td>
                        <td>{item.manufacture}</td>
                        <td>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#updateModal" id={item.code} onClick={onItem}>변경</button> 
                            <button id={item.code} onClick={onDelete}>삭제</button>
                        </td>
                    </tr>
                ) : <tr><td colSpan="7">등록된 제품이 없습니다</td></tr>}

            </tbody>
        );
    }
}

//페이지네이션 컴포넌트
class Pagenation extends React.Component {
    render() {
        const { pageList, prev, next, query, onPageMove } = this.props;

        return (
            <div>
                <div onClick={() => onPageMove(prev, query)} >이전</div>
                <div>
                    {pageList.map(page => <div key={page} onClick={() => onPageMove(page, query)}>{page}</div>)}
                </div>
                <div onClick={() => onPageMove(next, query)}>다음</div>
            </div>

        );
    }
}