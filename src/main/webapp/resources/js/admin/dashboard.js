'use strict'

// 관리자 페이지의 모든 컴포넌트들의 부모 컴포넌트 
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //메뉴에 따라서 변경되는 핵심 state
            category: "product",
            title: "제품",
            // CRUD를 위한 state
            list: [],
            item: {},
            tags: [],
            codes: [],
            //pager용 state
            prev: "",
            pageList: [],
            next: "",
            query: "",
        };

        this.list = this.list.bind(this);
        this.item = this.item.bind(this);
        this.modify = this.modify.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.initCodes = this.initCodes.bind(this);
        this.change = this.change.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.getCode = this.getCode.bind(this);
        this.getCodes = this.getCodes.bind(this);
        this.setCategory = this.setCategory.bind(this);
    }

    list(category, page, query, search, order) {
        let url = `rest/${category}`;

        if (page != null) {
            //페이지네이션 시 요청할 uri
            url += `?page=${page}&${query}`
        } else if (search != null) {
            //검색 시 요청할 uri
            const keyword = document.querySelector("#searchBox").value;
            url += `?search=${search}&keyword=${keyword}`
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

    //UpdateModal에 있는 태그 코드 input의 state를 관리하는 함수 
    tagChange(event, index) {
        this.setState({
            tags: {
                [index]: {
                    ...this.state.tags[index],
                    tcode: event.target.value,
                }
            }
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

    initCodes() { this.setState({ codes: [] }); }

    getCode(event) {
        if (event.target.checked) {
            this.setState(
                (state) => {
                    state.codes = [...state.codes, event.target.value];
                    return state;
                });
        } else {
            const updateCodes = this.state.codes.filter((code) => {
                if (code !== event.target.value) return code;
            });
            this.setState({ codes: updateCodes });
        }
    }

    getCodes(event) {
        const cboxes = document.querySelectorAll(".chk");

        for (let i = 0; i <= cboxes.length - 1; i++) {
            if (!cboxes[i].checked) {
                this.setState(
                    (state) => {
                        state.codes = [...state.codes, cboxes[i].value];
                        return state;
                    });
            } else { this.setState({ codes: [] }); }
        }
    }

    setCategory(category, title) {
        this.setState(
            (state) => {
                state.category = category;
                state.title = title;
                return state;
            });
        this.list(category);
    }

    // 컴포넌트가 DOM tree(이하 트리)에 삽입된 직후 호출
    componentDidMount() { this.list("product"); }
    //컴포넌트가 갱신된 후 호출 -> 최초 렌더링에서는 호출되지 않음
    componentDidUpdate(prevProps, prevState, snapshot) { }
    //컴포넌트가 마운트 해제되어 제거되기 직전에 호출
    componentWillUnmount() { }

    render() {
        const { title, list, item, tags, pageList, prev, next, query, category, id } = this.state;
        return (
            <div className="admin-container">
                <InfoModal
                    category={category}
                    title={title}
                    item={item}
                    tags={tags}
                />
                <AddModal
                    category={category}
                    title={title}
                    onModify={this.modify}
                />
                <UpdateModal
                    category={category}
                    title={title}
                    item={item}
                    tags={tags}
                    onChange={this.change}
                    onTagChange={this.tagChange}
                    onModify={this.modify} />
                <Sidebar
                    onSetCategory={this.setCategory}
                />
                <div className="s-p-container">
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
                        onGetCode={this.getCode}
                        onGetCodes={this.getCodes}
                        onDelete={this.delete}
                        onDeleteList={this.deleteList}
                        onInitCodes={this.initCodes}
                    />
                    <Pagenation
                        pageList={pageList}
                        prev={prev}
                        next={next}
                        query={query}
                        category={category}
                        onList={this.list}
                    />
                </div>
            </div>
        );
    }
}
ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));