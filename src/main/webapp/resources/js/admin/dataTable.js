// 테이블 컴포넌트 -> table 태그를 반환
class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allchked: false,
            chked: false,
        }

        this.allCheck = this.allCheck.bind(this);
        // this.eachCheck = this.eachCheck.bind(this);
    }

    allCheck() {
        const { allchked } = this.state;

        this.setState({
            allchked: !allchked,
            chked: !allchked,
        })
    }

    // eachCheck() {
    //     const { allchked } = this.state;

    //     this.setState({
    //         allchked: !allchked,
    //         chked: !allchked,
    //     })
    // }

    render() {
        const { list, onDelete, onItem, onGetCodes } = this.props;

        return (
            <div>
                {/* css 작업 시작 시 border 속성 삭제해도 됨 */}
                <table border="1">
                    <thead id="th">
                        <tr>
                            <td>
                                <input type="checkbox"
                                        onChange={this.allCheck}
                                        onClick={onGetCodes}
                                />
                            </td>
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
                        chked={this.state.chked}
                        onEachCheck={this.eachCheck}
                    />
                </table>
            </div>
        );
    }
}

//테이블의 행 컴포넌트 -> DB의 각 table에 저장된 데이터의 list를 반환
class List extends React.Component {
    
    render() {
        const { list, onDelete, onItem, chked, onEachCheck } = this.props;

        return (
            <tbody>
                {list.length ? list.map(item =>
                    <tr key={item.code}>
                        <td><Chkbox code={item.code} chked={chked} onEachCheck={onEachCheck} /></td>
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

//각 행에 삽입되는 체크박스
class Chkbox extends React.Component {
    render() {
        const { code, chked, onEachCheck, onPushCodes } = this.props;

        return (
            <input type="checkbox" className="chk" value={code} checked={chked} onChange={onPushCodes}/>
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