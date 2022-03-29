'use strict'

// 관리자 페이지의 모든 컴포넌트들의 부모 컴포넌트 
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "제품",
            list: [],
            pager: {
                pageList: [],
                page: "",
                query: "",
            }
        };

        this.init = this.init.bind(this);
        // this.add = this.add.bind(this);
        // this.update = this.update.bind(this);
        // this.delete = this.delete.bind(this);
        this.movePage = this.movePage.bind(this);
        
    }

    init = () => {
        fetch("./rest/product", {
            method: "GET",
            headers: {"Content-type": "application/json"},
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.list = result.list;
                    const pager = result.pager;
                    state.pager.pageList = pager.list;
                    state.pager.query = pager.query;
                    return state;
            });
        }).catch(err => console.log(err));
    }

    // add() {
    //     return null;
    // }
    
    // update() {
    //     return null;
    // }

    // delete() {
    //     return null;
    // }

    //페이지네이션 클릭 시 호출되도록 설정할 예정 -> 무한 호출됨 -> 이벤트리스터와 별개로 아래의 선언 부분 문제
    // movePage = () => {
    //     const page = 3;
    //     fetch("./rest/product", {
    //         method: "GET",
    //         headers: {
    //             // "data": page,
    //             "Content-type": "application/json"
    //         },
    //     }).then(res => res.json()).then(result => {
    //         this.setState(
    //             (state, props) => {
    //                 state.list = result.list;
    //                 return state;
    //         });
    //     }).catch(err => console.log(err));
    // }

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

        const {title, list, pager, query} = this.state;

        return (
            <div className="container">
                <Sidebar/>
                <Section title={title} list={list} pageList={pager.pageList} query={query} onPageMove={this.movePage}/>
            </div>
        );
    }
}

// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {
    
    render() {
        const {title, list, pageList, query, onPageMove} = this.props;

        return (
            <div>
                <Title title={title}/>
                <Search/>
                <Btns/>
                <DataTable list={list}/>
                <Pagenation pageList={pageList} query={query} onPageMove={onPageMove}/>
            </div>
        );
    }
}

// title 컴포넌트 -> 메뉴 별 title 표시
class Title extends React.Component {
    render() {
        const {title} = this.props;

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
                    <input type="text" name="keyword" placeholder="제품 번호, 제품명, 제조사 등"/>
                    <button><img src=""/>검색</button>
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
                    <button>등록<img src=""/></button>
                </div>
                <div>
                    <button>삭제<img src=""/></button>
                </div>
            </div>
        );
    }
}

// 테이블 컴포넌트 -> table 태그를 반환
class DataTable extends React.Component {
    render() {
        const {list} = this.props;

        return (
            <div>
                {/* css 작업 시작 시 border 속성 삭제해도 됨 */}
                <table border="1">
                    <thead>
                        <tr>
                            {/* thead의 checkbox는 tbody의 checkbox를 제어할 props를 가지고 있어야 함 -> chk={chkAll} */}
                            <td><input type="checkbox"/></td>
                            <td>제품 번호</td>
                            <td>사진</td>
                            <td>제품명</td>
                            <td>가격</td>
                            <td>제조사</td>
                            <td>관리</td>
                        </tr>
                    </thead>
                    <List list={list}/>
                </table>
            </div>
        );
    }
}

//테이블의 자식 컴포넌트 -> DB의 각 table에 저장된 정보의 list를 반환
class List extends React.Component {
    
    render() {
        const {list} = this.props;

        return (
            <tbody>
                {list.length ? list.map(item =>
                    <tr key={item.code}>
                        <td><input type="checkbox"/></td>
                        <td>{item.code}</td>
                        <td>{item.img}</td>
                        <td><a href="" onClick={null}>{item.name}</a></td>
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
        const {pageList, query, onPageMove} = this.props;
        const currPage = pageList.page;

        return (
            <div>
                <div><a href="">이전</a></div>
                <div>
                    <ul>
                        {pageList.map(page => <div key={page} data-page={page} data-query={query} onClick={onPageMove(currPage)}>{page}</div> )}
                    </ul>
                </div>
                <div><a href="">다음</a></div>
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
                <Menu/>
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
                <MenuList/>
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

ReactDOM.render(<div><Dashboard/></div>, document.querySelector("#app"));