//선택 삭제, 검색, 상세 정보 모달

'use strict'

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

        this.init = this.init.bind(this);
        this.item = this.item.bind(this);
        this.modify = this.modify.bind(this);
        this.delete = this.delete.bind(this);
        this.change = this.change.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.getCodes = this.getCodes.bind(this);
        this.deleteList = this.deleteList.bind(this);
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
        let formData;
        let cancel;

        if(type == "add") {
            url = "/rest/product";
            formData = new FormData(document.getElementById("addForm"));
            cancel = document.querySelector(".aCancel");
        } else if(type == "update") {
            const code = document.getElementById("codeInput").value;
            url = `/rest/product/${code}`;
            formData = new FormData(document.getElementById("updateForm"));
            cancel = document.querySelector(".uCancel");
        }

        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.init();
            cancel.click();
        }).catch(err => console.log(err));
    }

    delete(event) {
        fetch(`/rest/product/${event.target.id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(result => {
            alert(result.msg);
            this.init();
        }).catch(err => console.log(err));
    }

    getCodes() {
        const cboxes = document.querySelectorAll(".chk");
        
        for(let i = 0; i <= cboxes.length - 1; i++) {
            if(!cboxes[i].checked) {
                this.setState(
                    (state, props) => {
                        state.codes = [...state.codes, cboxes[i].value];
                        return state;
                });
            } else {
                this.setState(
                    (state, props) => {
                        state.codes = "";
                        return state;
                });
            }
        }  
    }

    deleteList() {
        const c = this.state.codes;

        for(let i = 0; i <= c.length - 1; i++) {
            fetch(`/rest/product/${c[i]}`, {
                method: "DELETE",
            }).then(res => res.json()).then(result => {
                this.init();
            }).catch(err => console.log(err));
        }
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
                    onPageMove={this.init}
                    onDelete={this.delete}
                    onItem={this.item}
                    onGetCodes={this.getCodes}
                    onDeleteList={this.deleteList}
                />
            </div>
        );
    }
}

ReactDOM.render(<div><Dashboard /></div>, document.querySelector("#app"));