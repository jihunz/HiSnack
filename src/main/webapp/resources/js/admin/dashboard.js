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
            ptags: [],
            selectTags: [],
            codes: [],
            //pager용 state
            prev: "",
            pageList: [],
            next: "",
            query: "",
            t_prev: "",
            t_pageList: [],
            t_next: "",
            t_query: "",
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
        this.selectTag = this.selectTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.removeTags = this.removeTags.bind(this);
        this.setList = this.setList.bind(this);
        this.setTags = this.setTags.bind(this);
    }

    list(category, page, query, search, type) {
        let url = `rest/${category}`;
        
        if (page != null) {
            //페이지네이션 시 요청할 uri
            url += `?page=${page}&${query}`
        } else if (search != null) {
            //검색 시 요청할 uri
            let keyword = document.querySelector(type).value;
            url += `?search=${search}&keyword=${keyword}`
        }
        
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState((state, props) => {
                if (type == '.modal-search' || type == '.modal-search2') {
                    this.setTags(state, result);
                } else {
                    this.setList(state, result);
                }
                return state;
            });
        }).catch(err => console.log(err));
    }

    setList(state, result) {
        state.list = result.list;
        state.pageList = result.pager.list;
        state.prev = result.pager.prev;
        state.next = result.pager.next;
        state.query = result.pager.query;
    }
    
    setTags(state, result) {
        state.ptags = result.list;
        state.t_pageList = result.pager.list;
        state.t_prev = result.pager.prev;
        state.t_next = result.pager.next;
        state.t_query = result.pager.query;
    }

    item(event, category) {
        let url = `/rest/${category}/${event.target.parentNode.dataset.code}`

        if (category == 'member') url = `/rest/${category}/item?id=${event.target.parentNode.dataset.code}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(result => {
            this.setState(
                (state, props) => {
                    state.item = result.item;
                    state.selectTags = result.item.tags;
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
        let url = `/rest/${category}/${event.target.id}`

        if (category == 'member') url = `/rest/${category}/delete?id=${event.target.id}`;

        fetch(url, {
            method: "DELETE",
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.list(category);
        }).catch(err => console.log(err));
    }

    // 전체 및 선택 삭제 시 사용하는 함수
    deleteList(category) {
        const codes = this.state.codes;
        
        for (let i = 0; i <= codes.length - 1; i++) {
            let url = `/rest/${category}/${codes[i]}`;
            if (category == 'member') url = `/rest/${category}/delete?id=${codes[i]}`;

            fetch(url, {
                method: "DELETE",
            }).then(res => res.json()).then(result => {
                console.log(result.msg);
            }).catch(err => console.log(err));
        }
        this.initCodes();
        this.list(category);
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

    selectTag(event) {
        let tag = {
            tcode: event.target.id,
            content: event.target.innerText
        }
        this.setState(
            (state) => {
                //state 배열에 객체(tcode, content)를 추가해야함
                state.selectTags = [...state.selectTags, tag];
                return state;
            });
    }

    removeTag(source) {
        const { selectTags } = this.state;
        const changedTags = selectTags.filter(tag => tag.tcode != source);
        { this.setState({ selectTags: changedTags }); }
    }

    removeTags(source) {
        const { selectTags } = this.state;
        { this.setState({ selectTags: [], ptags: [], t_pageList: [] }); }
    }


    // 컴포넌트가 DOM tree(이하 트리)에 삽입된 직후 호출
    componentDidMount() { this.list("product"); }
    //컴포넌트가 갱신된 후 호출 -> 최초 렌더링에서는 호출되지 않음
    componentDidUpdate(prevProps, prevState, snapshot) { }
    //컴포넌트가 마운트 해제되어 제거되기 직전에 호출
    componentWillUnmount() { }

    render() {
        const { title, list, item, ptags, selectTags, pageList, prev, next, query, t_pageList, t_prev, t_next, t_query, category, id } = this.state;
        return (
            <div className="admin-container">
                <InfoModal
                    category={category}
                    title={title}
                    item={item}
                    onRemoveTags={this.removeTags}
                />
                <AddModal
                    category={category}
                    title={title}
                    ptags={ptags}
                    selectTags={selectTags}
                    t_pageList={t_pageList}
                    t_prev={t_prev}
                    t_next={t_next}
                    t_query={t_query}
                    onList={this.list}
                    onModify={this.modify}
                    onSelectTag={this.selectTag}
                    onRemoveTag={this.removeTag}
                    onRemoveTags={this.removeTags}
                />
                <UpdateModal
                    category={category}
                    title={title}
                    item={item}
                    ptags={ptags}
                    selectTags={selectTags}
                    t_pageList={t_pageList}
                    t_prev={t_prev}
                    t_next={t_next}
                    t_query={t_query}
                    onList={this.list}
                    onChange={this.change}
                    onTagChange={this.tagChange}
                    onModify={this.modify}
                    onSelectTag={this.selectTag}
                    onRemoveTag={this.removeTag}
                    onRemoveTags={this.removeTags}
                />
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