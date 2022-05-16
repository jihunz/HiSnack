'use strict'

// member item, update, delete 요청에 '?id=아이디값' 쿼리스트링 추가하기

// 마이 페이지의 모든 컴포넌트들의 부모 컴포넌트 
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //메뉴에 따라서 변경되는 핵심 state
            category: "sub",
            title: "구독 상품 내역",
            list: [],
            orderList: [],
            item: {},
            subForm: 0,
            //pager용 state
            pageList: [],
            prev: "",
            next: "",
            query: "",
        };

        this.list = this.list.bind(this);
        this.item = this.item.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.change = this.change.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setSubForm = this.setSubForm.bind(this);
    }

    list(category, page) {
        let url = `rest/${category}?search=2&keyword=${user.userId}`;

        if (page != null) {
            //페이지네이션 시 요청할 uri
            url += `&page=${page}`
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    if(category != 'orders' && category != 'sub') {
                        state.list = result.list;
                    } else {
                        state.orderList = result.list;
                    }
                    state.pageList = result.pager.list;
                    state.prev = result.pager.prev;
                    state.next = result.pager.next;
                    state.query = result.pager.query;
                    return state;
                });
        }).catch(err => console.log(err));
    }

    item(event, category, ordersCode) {
        let keyword;
        let url = `/rest/${category}/${keyword}`;
        
        if (category == 'member') {
            keyword = user.userId;
            url = `/rest/${category}/item?id=${keyword}`;
        } else if (ordersCode != undefined) {
            keyword = ordersCode;
            url = `/rest/${category}/${keyword}`;
        } else {
            keyword = event.target.parentNode.dataset.code;
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.item = result.item
                    // 비밀번호 state를 공개하지 않기 위한 코드
                    if (category == 'member' && state.item.password != undefined && state.item.password != null && state.item.password != '') {
                        state.item.password = null;
                    }
                    return state;
                });
        }).catch(err => console.log(err));
    }

    //UpdateModal에 있는 input('태그 코드', '이미지 등록' 제외)들의 state를 관리하는 함수
    change(event) {
        const inputName = event.target.name;
        this.setState({
            item: {
                ...this.state.item,
                [inputName]: event.target.value,
            },
        });
    }

    update(type) {
        const { category } = this.state;
        const formData = new FormData(document.getElementById(`${type}Form`));
        let keyword;
        let url = `/rest/${category}/${keyword}`;
    
        if(category == 'member') {
            keyword = user.userId
            url = `/rest/${category}/update?id=${keyword}`;
        } else {
            keyword = document.getElementById("codeInput").value;
        }

        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(result => {
            alert("회원 정보가 정상적으로 수정되었습니다.");
        }).catch(err => console.log(err));
    }

    //개별 삭제 시 사용하는 함수 -> 테이블의 각 행에 있는 삭제 버튼 클릭 시 동작
    delete(event, category) {
        // prompt()
        fetch(`/rest/${category}/${event.target.id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(result => {
            let msg;
            switch(category) {
                case 'orders':
                    msg = '주문이 취소되었습니다.'
                    break;
                case 'review':
                    msg = '리뷰가 삭제되었습니다.'
                    break;
                default:
                    msg = '구독이 취소되었습니다.'
                    break;
            }
            alert(msg);
            this.list(category);
        }).catch(err => console.log(err));
    }

    // 전체 및 선택 삭제 시 사용하는 함수
    deleteList(category) {
        const c = this.state.codes;

        for (let i = 0; i <= c.length - 1; i++) {
            fetch(`/rest/${category}/${c[i]}`, {
                method: "DELETE",
            }).then(res => res.json()).then(result => {
                this.initCodes();
                this.list(category);
            }).catch(err => console.log(err));
        }
    }

    setCategory(category) {
        this.setState(
            (state) => {
                state.category = category;
                return state;
            });
        this.list(category);
    }

    setTitle(title) {
        this.setState(
            (state) => {
                state.title = title;
                return state;
            });
    }

    setSubForm(val) {
        this.setState(
            (state) => {
                state.subForm = val;
                return state;
            });
    }

    change(event) {
        const inputName = event.target.name;
        this.setState({
            item: {
                ...this.state.item,
                [inputName]: event.target.value,
            },
        });
    }

    // 컴포넌트가 DOM tree(이하 트리)에 삽입된 직후 호출
    componentDidMount() { this.list("sub"); }

    render() {
        const { title, list, orderList, item, pageList, prev, next, query, category, id, subForm } = this.state;
        return (
            <div>
                <div>마이페이지</div>
                {category === 'sub' ? <div><div>구독 상품 내역 보기</div><div>구독 정보</div></div> : null}
                {category === 'orders' ? <><div>주문 내역</div></> : null}
                {category === 'member' ? <><div>회원 정보 수정</div></> : null}
                {category === 'review' ? <><div>리뷰 목록</div></> : null}
                <Sidebar
                    subForm={subForm}
                    onSetCategory={this.setCategory}
                    onSetTitle={this.setTitle}
                    onItem={this.item}
                />
                <Section
                    category={category}
                    title={title}
                    list={list}
                    orderList={orderList}
                    item={item}
                    id={id}
                    pageList={pageList}
                    prev={prev}
                    next={next}
                    query={query}
                    onList={this.list}
                    onItem={this.item}
                    onUpdate={this.update}
                    onDelete={this.delete}
                    onChange={this.change}
                    onSetSubForm={this.setSubForm}
                />
            </div>
        );
    }
}
ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));