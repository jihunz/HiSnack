'use strict'

// 관리자 페이지의 모든 컴포넌트들의 부모 컴포넌트 
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "제품",
            list: [],
            item: {},
            pageList: [],
            prev: "",
            next: "",
            query: "",
        };

        this.init = this.init.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.item = this.item.bind(this);
        this.delete = this.delete.bind(this);
        this.change = this.change.bind(this);
    }

    init(p, q) {
        const page = p;
        fetch( (!page ? "/rest/product" : `/rest/product?page=${page}&${q}`), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.list = result.list;
                    state.pageList = result.pager.list;
                    state.prev = result.pager.prev;
                    state.next = result.pager.next;
                    state.query = result.pager.query;
                    return state;
                });
        }).catch(err => console.log(err));
    }

    add() {
        var formData = new FormData(document.getElementById("addForm"));

        fetch("/rest/product", {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.init();
            document.getElementById("cancel").click();
        }).catch(err => console.log(err));
    }

    update() {
        var formData = new FormData(document.getElementById("updateForm"));
        var code = document.getElementById("updateForm").getAttribute("data-code");
        console.log(code);

        // fetch(`/rest/product/${code}`, {
        //     method: "PUT",
        //     body: formData,
        // }).then(res => res.json()).then(result => {
        //     alert(result.msg);
        //     this.init();
        //     document.getElementById("cancel").click();
        // }).catch(err => console.log(err));
    }
    

    item(event) {
        fetch( (`/rest/product/${event.target.id}`), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.item = result.item;
                    return state;
                });
        }).catch(err => console.log(err));
    }

    change(event) {
        const inputName = event.target.name;

        this.setState({
            item: {
                [inputName]: event.target.value,
            }
        });
    }

    delete(event) {
        fetch(`/rest/product/${event.target.id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.init();
        }).catch(err => console.log(err));
    }


    // 컴포넌트가 DOM tree(이하 트리)에 삽입된 직후 호출
    componentDidMount() {
        this.init();
    }

    //컴포넌트가 갱신된 후 호출 -> 최초 렌더링에서는 호출되지 않음
    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    //컴포넌트가 마운트 해제되어 제거되기 직전에 호출
    componentWillUnmount() {

    }

    render() {
        const { title, list, item, pageList, prev, next, query } = this.state;

        return (
            <div className="container">
                <AddModal onAdd={this.add} />
                <UpdateModal item={item} onChange={this.change} onUpdate={this.update}/>
                <Sidebar />
                <Section title={title} list={list} pageList={pageList} prev={prev} next={next} query={query} onPageMove={this.init} onDelete={this.delete} onItem={this.item}/>
            </div>
        );
    }
}

// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {

    render() {
        const { title, list, pageList, prev, next, query, onPageMove, onDelete, onItem } = this.props;

        return (
            <div>
                <Title title={title} />
                <Search />
                <Btns />
                <DataTable list={list} onDelete={onDelete} onItem={onItem}/>
                <Pagenation pageList={pageList} query={query} onPageMove={onPageMove} prev={prev} next={next} />
            </div>
        );
    }
}

// title 컴포넌트 -> 메뉴 별 title 표시
class Title extends React.Component {
    render() {
        const { title } = this.props;

        return (
            <div>
                <span>
                    <h4>{title} 데이터 관리</h4>
                    <h4>{title}을 쉽게 관리할 수 있도록 도움을 주는 페이지</h4>
                </span>
                <h2>{title}</h2>
            </div>
        );
    }
}

//검색창 컴포넌트
class Search extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text" name="keyword" placeholder="제품 번호, 제품명, 제조사 등" />
                    <button><img src="" />검색</button>
                </form>
            </div>
        );
    }
}

// 버튼 컴포넌트 -> 등록, 삭제 반환
class Btns extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">등록<img src="" /></button>
                </div>
                <div>
                    <button>삭제<img src="" /></button>
                </div>
            </div>
        );
    }
}

// 테이블 컴포넌트 -> table 태그를 반환
class DataTable extends React.Component {
    render() {
        const { list, onDelete, onItem } = this.props;

        return (
            <div>
                {/* css 작업 시작 시 border 속성 삭제해도 됨 */}
                <table border="1">
                    <thead id="th">
                        <tr>
                            {/* thead의 checkbox는 tbody의 checkbox를 제어할 props를 가지고 있어야 함 -> chk={chkAll} */}
                            <td><input type="checkbox" /></td>
                            <td>제품 번호</td>
                            <td>사진</td>
                            <td>제품명</td>
                            <td>가격</td>
                            <td>제조사</td>
                            <td>관리</td>
                        </tr>
                    </thead>
                    <List list={list} onDelete={onDelete} onItem={onItem}/>
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
                        <td><input type="checkbox" /></td>
                        <td>{item.code}</td>
                        <td><img src={item.thumbnail} id="thumbnail"></img></td>
                        <td><b onClick={null}>{item.name}</b></td>
                        <td>{item.price}</td>
                        <td>{item.manufacture}</td>
                        <td><button type="button" data-bs-toggle="modal" data-bs-target="#updateModal" id={item.code} onClick={onItem}>변경</button> <button id={item.code} onClick={onDelete}>삭제</button></td>
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

// 사이드바 컴포넌트 -> 메뉴를 삽입
class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <div className="sbHeader">
                    <a href="../../"><img src="re/img/logo2.svg" id="logo"></img></a>
                </div>
                <Menu />
            </div>
        );
    }
}

//메뉴 컴포넌트
class Menu extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h4>MENU</h4>
                </div>
                <MenuList />
            </div>

        );
    }
}

//메뉴의 자식 컴포넌트 -> 메뉴 목록 반환
class MenuList extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><a href="">제품 관리</a></li>
                    <li><a href="">구독 관리</a></li>
                    <li><a href="">주문 관리</a></li>
                    <li><a href="">회원 관리</a></li>
                    <li><a href="">리뷰 관리</a></li>
                    <li><a href="">태그 관리</a></li>
                </ul>
            </div>
        );
    }
}

//bootstrap을 사용한 addModal
class AddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: "",
            manufacture: "",
            tcode: "",
            info: "",
            image: ""
        }

        this.change = this.change.bind(this);
        this.reset = this.reset.bind(this);
    }

    change(event) {
        const inputName = event.target.name;

        this.setState({
            [inputName]: event.target.value,
        });
    }

    reset() {
        this.setState({
            name: "",
            price: "",
            manufacture: "",
            tcode: "",
            info: "",
            image: ""
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addModalLabel">제품 등록</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <form id="addForm" encType="multipart/form-data">
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">제품 이름</label>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.change} maxLength="32"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">가격</label>
                                        <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.change}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">제조사</label>
                                        <input type="text" className="form-control" name="manufacture" value={this.state.manufacture} onChange={this.change} maxLength="32"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">태그 코드</label>
                                        <input type="number" className="form-control" name="tcode" value={this.state.tcode} onChange={this.change} maxLength="10"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">설명</label>
                                        <textarea type="text" className="form-control" name="info" value={this.state.info} onChange={this.change}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">이미지 등록</label>
                                        <input type="file" className="form-control" name="image" value={this.state.image} onChange={this.change} multiple/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" id="cancel" className="btn btn-secondary" onClick={this.reset} data-bs-dismiss="modal">취소</button>
                                    <button type="button" className="btn btn-primary" onClick={this.props.onAdd}>등록</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class UpdateModal extends React.Component {

    render() {
        const {item, onChange, onUpdate} = this.props;

        return (
            <div>
                <div className="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">제품 정보 변경</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <form id="updateForm" encType="multipart/form-data" data-code={item.code}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">제품 이름</label>
                                        <input type="text" className="form-control" name="name" value={item.name} onChange={onChange} maxLength="32"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">가격</label>
                                        <input type="text" className="form-control" name="price" value={item.price} onChange={onChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">제조사</label>
                                        <input type="text" className="form-control" name="manufacture" value={item.manufacture} onChange={onChange} maxLength="32"/>
                                    </div>
                                    {/* 태그 코드 map으로 출력? */}
                                    <div className="mb-3">
                                        <label className="form-label">태그 코드</label>
                                        <input type="number" className="form-control" name="tcode" value={item.tags} onChange={onChange} maxLength="10"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">설명</label>
                                        <textarea type="text" className="form-control" name="info" value={item.info} onChange={onChange}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">이미지 등록</label>
                                        <input type="file" className="form-control" name="image" multiple/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" id="cancel" className="btn btn-secondary" onClick={this.reset} data-bs-dismiss="modal">취소</button>
                                    <button type="button" className="btn btn-primary" onClick={onUpdate}>변경</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));