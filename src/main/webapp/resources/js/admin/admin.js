'use strict'

// 관리자 페이지의 모든 컴포넌트들의 부모 컴포넌트 
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "제품",
            list: [],
            pageList: [],
            prev: "",
            next: "",
            query: "",
        };

        this.init = this.init.bind(this);
        this.add = this.add.bind(this);
        // this.update = this.update.bind(this);
        // this.delete = this.delete.bind(this);
        this.movePage = this.movePage.bind(this);

    }

    init() {
        fetch("/rest/product", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.list = result.list;
                    state.pageList = result.pager.list;
                    state.prev = result.pager.prev;
                    state.next = result.pager.next;
                    state.query = result.pager.query;
                    console.log(result.list);
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
        }).catch(err => console.log(err));
    }

    // update() {
    //     return null;
    // }

    // delete() {
    //     return null;
    // }

    //페이지네이션 클릭 시 해당 페이지의 순서에 해당하는 데이터를 조회
    movePage(page, query) {
        fetch(`./rest/product?page=${page}&${query}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.list = result.list;
                    return state;
                });
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
        const { title, list, pageList, prev, next, query } = this.state;

        return (
            <div className="container">
                <AddModal onAdd={this.add} />
                <Sidebar />
                <Section title={title} list={list} pageList={pageList} prev={prev} next={next} query={query} onPageMove={this.movePage} />
            </div>
        );
    }
}

// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {

    render() {
        const { title, list, pageList, prev, next, query, onPageMove, onAdd } = this.props;

        return (
            <div>
                <Title title={title} />
                <Search />
                <Btns />
                <DataTable list={list} />
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
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">등록<img src="" /></button>
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
        const { list } = this.props;

        return (
            <div>
                {/* css 작업 시작 시 border 속성 삭제해도 됨 */}
                <table border="1">
                    <thead>
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
                    <List list={list} />
                </table>
            </div>
        );
    }
}

//테이블의 자식 컴포넌트 -> DB의 각 table에 저장된 정보의 list를 반환
class List extends React.Component {
    render() {
        const { list } = this.props;

        return (
            <tbody>
                {list.length ? list.map(item =>
                    <tr key={item.code}>
                        <td><input type="checkbox" /></td>
                        <td>{item.code}</td>
                        {/* 등록된 이미지가 있을 때만 src 설정 */}
                        <td><img src={item.thubnail}></img></td>
                        <td><b onClick={null}>{item.name}</b></td>
                        <td>{item.price}</td>
                        <td>{item.manufacture}</td>
                        <td><button>변경</button> <button>삭제</button></td>
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

//bootstrap modal -> id="staticBackdrop", id="staticBackdropLabel"을 임의로 수정 혹은 삭제하면 모달이 동작하지 않음
class AddModal extends React.Component {
    render() {
        return (
            <div>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">제품 등록</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <form id="addForm" encType="multipart/form-data">
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">제품 이름</label>
                                        <input type="text" className="form-control" name="name" maxLength="32"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">가격</label>
                                        <input type="text" className="form-control" name="price"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">제조사</label>
                                        <input type="text" className="form-control" name="manufacture" maxLength="32"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">태그 코드</label>
                                        <input type="number" className="form-control" name="tcode" maxLength="10"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">설명</label>
                                        <textarea type="text" className="form-control" name="info"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">이미지 등록</label>
                                        <input type="file" className="form-control" name="image" multiple/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">취소</button>
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


ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));