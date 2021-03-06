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
            item: {
                password: "",
                passwordConfirm: "",
                address: "",
                tel: "",
            },
            item_sub: {},
            showSubInfo: false,
            //pager용 state
            pageList: [],
            prev: "",
            next: "",
            query: "",
            order: 0
        };

        this.list = this.list.bind(this);
        this.item = this.item.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.subChange = this.subChange.bind(this);
        this.memberChange = this.memberChange.bind(this);
        this.changePwd = this.changePwd.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setShowSubInfo = this.setShowSubInfo.bind(this);
        this.addPreference = this.addPreference.bind(this);
        this.setOrder = this.setOrder.bind(this);
    }

    list(category, page) {
        let url = `rest/${category}?search=2&keyword=${user.userId}`;

        if (page != null) {
            //페이지네이션 시 요청할 uri
            url += `&page=${page}&order=${this.state.order}`
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    if (category != 'orders' && category != 'sub') {
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

    item(category, code) {
        let val, url;

        if (category == 'member') {
            val = user.userId;
            url = `/rest/${category}/item?id=${val}`;
        } else if (code != undefined) {
            val = code;
            url = `/rest/${category}/${val}`;
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    if (category === 'sub') {
                        state.item_sub = result.item;
                    } else {
                        state.item = result.item;
                    }

                    // 비밀번호 state를 공개하지 않기 위한 코드
                    if (category == 'member' && state.item.password != undefined && state.item.password != null && state.item.password != '') {
                        state.item.password = null;
                    }

                    return state;
                });
        }).catch(err => console.log(err));
    }

    // 구독 정보의 input state를 관리하는 함수
    subChange(event) {
        const inputName = event.target.name;
        this.setState({
            item_sub: {
                ...this.state.item_sub,
                [inputName]: event.target.value,
            },
        });
    }

    // 회원 정보 수정의 input state를 관리하는 함수
    memberChange(event, pwd) {
        const inputName = event.target.name;

        if (pwd != null) {
            this.setState({
                item: {
                    ...this.state.item,
                    password: '',
                    passwordConfirm: '',
                }
            });
        } else {
            this.setState({
                item: {
                    ...this.state.item,
                    [inputName]: event.target.value,
                }
            });
        }
    }

    // 회원 정보 수정에서 주소 검색 시 주소를 state에 저장하는 함수
    setAddress() {
        this.setState({
            item: {
                ...this.state.item,
                address: user.address,
            }
        });
    }

    changePwd() {
        let id = user.userId;
        let password = this.state.item.password;
        let item = { id, password };

        fetch('/rest/member/change/password', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        }).then(res => res.json()).then(result => {
            return;
        }).catch(err => console.log(err));
    }

    update(category, val) {
        const formData = new FormData(document.getElementById(`${category}Form`));

        let code = val;
        let url = `/rest/${category}/${code}`;

        if (category == 'member') {
            code = user.userId;
            url = `/rest/${category}/update?id=${code}`;
        }

        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(result => {
            let msg;
            switch (category) {
                case 'sub':
                    msg = '구독 정보가 변경되었습니다.'
                    break;
                case 'member':
                    msg = '회원 정보가 변경되었습니다.'
                    break;
                default:
                    break;
            }
            alert(msg);
        }).catch(err => console.log(err));
    }

    //개별 삭제 시 사용하는 함수 -> 테이블의 각 행에 있는 삭제 버튼 클릭 시 동작
    delete(category, code) {
        fetch(`/rest/${category}/${code}`, {
            method: "DELETE",
        }).then(res => res.json()).then(result => {
            let msg;
            switch (category) {
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

    setShowSubInfo(val) {
        this.setState(
            (state) => {
                if (val != null && Object.keys(val).length <= 0) {
                    state.showSubInfo = val;
                } else {
                    state.showSubInfo = false;
                }
                return state;
            });
    }

    addPreference(pcode, id, recom) {
        fetch(`/rest/member/tag/${pcode}?id=${id}&recom=${recom}`, {
            method: "POST",
        }).then(res => res.json()).then(result => {
           alert(result.msg);
        }).catch(err => console.log(err));
    }

    setOrder(orderVal) {
        this.setState({order: orderVal});
    }

    // 컴포넌트가 DOM tree(이하 트리)에 삽입된 직후 호출
    componentDidMount() {
        this.list("sub");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.item == prevState.item) user.address = this.state.item.address;
    }

    render() {
        const { title, list, orderList, item_sub, item, pageList, prev, next, query, category, id, showSubInfo } = this.state;
        return (
            <div className="member-container">
                <div className="sidebar-container">
                    <div id="title">마이페이지</div>
                    <InfoModal
                        category={category}
                        title={title}
                        item={item}
                        item_sub={item_sub}
                        onRemoveTags={this.removeTags}
                        onAddPreference={this.addPreference}
                    />
                    <Sidebar
                        onSetCategory={this.setCategory}
                        onSetTitle={this.setTitle}
                        onItem={this.item}
                        onSetShowSubInfo={this.setShowSubInfo}
                    />
                </div>
                <div className="section-container">
                    {category === 'sub' ?
                        <div className="sub-menu">
                            <div onClick={this.setShowSubInfo} className={showSubInfo ? '' : "sub-menu-clicked"}>구독 내역</div>
                            <div className={showSubInfo ? "sub-menu-clicked" : ''}>배송지 정보</div>
                        </div> : null}
                    {category === 'orders' ? <><div className="sub-menu-single">주문 내역</div></> : null}
                    {category === 'member' ? <><div className="sub-menu-single">회원 정보 수정</div></> : null}
                    {category === 'review' ? <><div className="sub-menu-single">리뷰 목록</div></> : null}
                    <Section
                        category={category}
                        title={title}
                        list={list}
                        orderList={orderList}
                        item={item}
                        item_sub={item_sub}
                        id={id}
                        pageList={pageList}
                        prev={prev}
                        next={next}
                        query={query}
                        showSubInfo={showSubInfo}
                        onList={this.list}
                        onItem={this.item}
                        onUpdate={this.update}
                        onDelete={this.delete}
                        onSubChange={this.subChange}
                        onMemberChange={this.memberChange}
                        onChangePwd={this.changePwd}
                        onSetShowSubInfo={this.setShowSubInfo}
                        onSetAddress={this.setAddress}
                        onSetOrder={this.setOrder}
                    />
                </div>
            </div>
        );
    }
}
ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));