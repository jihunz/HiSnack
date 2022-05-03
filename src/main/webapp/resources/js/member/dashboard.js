'use strict'

// 마이 페이지의 모든 컴포넌트들의 부모 컴포넌트 
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //메뉴에 따라서 변경되는 핵심 state
            category: "sub",
        };

        this.list = this.list.bind(this);
        this.item = this.item.bind(this);
        this.modify = this.modify.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.change = this.change.bind(this);
        this.setCategory = this.setCategory.bind(this);
    }

    list(category, page, query) {
        let url = `rest/${category}?search=2&keyword=${user.userId}`;

        if (page != null) {
            //페이지네이션 시 요청할 uri
            url += `&page=${page}&${query}`
        }

        fetch(url, {
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

    item(event, category) {
        fetch((`/rest/${category}/${event.target.parentNode.dataset.code}`), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.item = result.item;
                    state.tags = result.item.tags;
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

    //add 혹은 update 요청을 실행하는 함수 -> type 파라미터로 add와 update 구분
    modify(type, category) {
        let url;
        const formData = new FormData(document.getElementById(`${type}Form`));
        const cancel = document.querySelector(`.${type}Cancel`);

        if (type == "add") {
            url = `/rest/${category}`;
        } else if (type == "update") {
            const code = document.getElementById("codeInput").value;
            url = `/rest/${category}/${code}`;
        }

        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.list(category);
            cancel.click();
        }).catch(err => console.log(err));
    }

    //개별 삭제 시 사용하는 함수 -> 테이블의 각 행에 있는 삭제 버튼 클릭 시 동작
    delete(event, category) {
        fetch(`/rest/${category}/${event.target.id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(result => {
            alert(result.msg);
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

    // 컴포넌트가 DOM tree(이하 트리)에 삽입된 직후 호출
    componentDidMount() { this.list("sub"); }

    render() {
        const { title, list, item, pageList, prev, next, query, category, id } = this.state;
        return (
            <div>
                <div>마이페이지</div>
                {category === 'sub' ? <><div>구독 상품 내역 보기</div><div>구독 정보</div></> : null}
                {category === 'orders' ? <><div>주문 내역</div></> : null}
                {category === 'member' ? <><div>회원 정보 수정</div></> : null}
                {category === 'review' ? <><div>리뷰 목록</div></> : null}
                <Sidebar
                    onSetCategory={this.setCategory}
                />
                <Section
                    category={category}
                    title={title}
                    list={list}
                    id={id}
                    pageList={pageList}
                    prev={prev}
                    next={next}
                    query={query}
                    onList={this.list}
                    onItem={this.item}
                    onDelete={this.delete}
                    onDeleteList={this.deleteList}
                    onInitCodes={this.initCodes}
                />
                {/* <Pagenation
                    pageList={pageList}
                    prev={prev}
                    next={next}
                    query={query}
                    category={category}
                    onList={this.list}
                /> */}
            </div>
        );
    }
}
ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));