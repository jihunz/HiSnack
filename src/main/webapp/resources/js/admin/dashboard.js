'use strict'

//상세 정보 모달

// 관리자 페이지의 모든 컴포넌트들의 부모 컴포넌트 
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "제품",
            list: [],
            item: {},
            tags: [],
            pageList: [],
            codes: [],
            prev: "",
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
    }

    list(page, query, search, order) {
        let url = "/rest/product";

        if(page != null) {
            //페이지네이션 시 요청할 uri
            url = `/rest/product?page=${page}&${query}`
        } else if(search != null) {
            //검색 시 요청할 uri
            const keyword = document.querySelector("#searchBox").value;
            url = `/rest/product?search=${search}&keyword=${keyword}`
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
                    state.tags = result.item.tags;
                    return state;
                });
        }).catch(err => console.log(err));
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

    modify(type) {
        let url;         
        const formData = new FormData(document.getElementById(`${type}Form`));
        const cancel = document.querySelector(`.${type}Cancel`);

        if(type == "add") {
            url = "/rest/product";
        } else if(type == "update") {
            const code = document.getElementById("codeInput").value;
            url = `/rest/product/${code}`;
        }

        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.list();
            cancel.click();
        }).catch(err => console.log(err));
    }

    delete(event) {
        fetch(`/rest/product/${event.target.id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.list();
        }).catch(err => console.log(err));
    }

    deleteList() {
        const c = this.state.codes;

        for(let i = 0; i <= c.length - 1; i++) {
            fetch(`/rest/product/${c[i]}`, {
                method: "DELETE",
            }).then(res => res.json()).then(result => {
                this.initCodes();
                this.list();
            }).catch(err => console.log(err));
        }
    }

    initCodes() {
        this.setState({ codes: [] });
    }

    getCode(event) {
        if(event.target.checked) {
            this.setState(
                (state) => {
                    state.codes = [...state.codes, event.target.value];
                    return state;
            });
        } else {
            const updateCodes = this.state.codes.filter((code) => {
                if(code !== event.target.value) return code;
            });
            this.setState( {codes: updateCodes} );
        }
    }

    getCodes(event) {
        const cboxes = document.querySelectorAll(".chk");

        for(let i = 0; i <= cboxes.length - 1; i++) {
            if(!cboxes[i].checked) {
                this.setState(
                    (state) => {
                        state.codes = [...state.codes, cboxes[i].value];
                        return state;
                });
            } else {this.setState( {codes: [] });}
        }  
    }

    // 컴포넌트가 DOM tree(이하 트리)에 삽입된 직후 호출
    componentDidMount() {
        this.list();
    }

    //컴포넌트가 갱신된 후 호출 -> 최초 렌더링에서는 호출되지 않음
    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    //컴포넌트가 마운트 해제되어 제거되기 직전에 호출
    componentWillUnmount() {

    }

    render() {
        const { title, list, item, tags, pageList, prev, next, query } = this.state;

        return (
            <div className="container">
                <AddModal 
                    onModify={this.modify}
                />
                <UpdateModal 
                    item={item} 
                    tags={tags} 
                    onChange={this.change} 
                    onTagChange={this.tagChange} 
                    onModify={this.modify}/>
                <Sidebar />
                <Section 
                    title={title}
                    list={list}
                    pageList={pageList}
                    prev={prev}
                    next={next}
                    query={query}
                    onList={this.list}
                    onDelete={this.delete}
                    onItem={this.item}
                    onGetCode={this.getCode}
                    onGetCodes={this.getCodes}
                    onDeleteList={this.deleteList}
                    onInitCodes={this.initCodes}
                />
            </div>
        );
    }
}

ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));