// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {

    render() {
        const { title, list, category, onDelete, onItem, onGetCode, onGetCodes, onDeleteList, onInitCodes, onList } = this.props;

        return (
            <div className="section-container">
                <div className="section-header">
                    <Title title={title} />
                    <div className="section-item-btns">
                        <Search
                            category={category}
                            onList={onList}
                        />
                        <Btns
                            onDeleteList={onDeleteList}
                            category={category}
                        />
                    </div>
                </div>
                <Table
                    list={list}
                    category={category}
                    onDelete={onDelete}
                    onItem={onItem}
                    onGetCode={onGetCode}
                    onGetCodes={onGetCodes}
                    onInitCodes={onInitCodes}
                />
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
                <div className="section-item-title-sub">
                    <p>{title} 데이터 관리</p>
                    <p>{title}을 쉽게 관리할 수 있도록 도움을 주는 페이지</p>
                </div>
                <h2 className="section-item-title">{title}</h2>
            </div>
        );
    }
}

//검색창 컴포넌트
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            t: "제품 번호, 제품명, 제조사",
        }
    }

    enter(event) {
        const { category, onList } = this.props;

        if (event.keyCode == 13) onList(category, null, null, 1, ".sec-search");
    }

    componentDidUpdate(prevProps) {
        const { category } = this.props;

        if (category !== prevProps.category) {
            if (category === 'product') {
                this.setState({ t: "제품 번호, 제품명, 제조사" })
            } else if (category === 'sub' || category === 'orders') {
                this.setState({ t: "주문 번호, 아이디, 주문 날짜" })
            } else if (category === 'member') {
                this.setState({ t: "아이디, 이름, 전화번호, 관리 등급" })
            } else if (category === 'review') {
                this.setState({ t: "리뷰 번호, 아이디, 작성 날짜" })
            } else {
                this.setState({ t: "태그 번호, 태그 내용" })
            }
        }
    }

    render() {
        const { category, onList } = this.props;

        return (
            <div>
                <input
                    type="text"
                    name="keyword"
                    className="sec-search searchBox"
                    placeholder={this.state.t}
                    onKeyPress={() => this.enter(event)} />
                <div id="searchBox-btn" onClick={() => onList(category, null, null, 1, ".sec-search")}><img src="/re/img/admin-search.png" /></div>
            </div>
        );
    }
}

// 버튼 컴포넌트 -> 등록, 삭제 버튼 반환
class Btns extends React.Component {
    render() {
        const { category, onDeleteList } = this.props;
        return (
            <div>
                {category === 'product' || category === 'tag' ?
                    <button type="button" id="section-item-add" data-bs-toggle="modal" data-bs-target="#addModal"><span id="section-item-add-text">등록</span><img src="/re/img/admin-add.png" id="section-item-add-img" /></button>
                    : null
                }
                {category === 'sub' || category === 'orders' ? null
                    :
                    <button
                        onClick={() => { onDeleteList(category) }}
                        id="section-item-delete"
                    ><img src="/re/img/admin-delete.png" id="section-item-delete-img" /></button>
                }
            </div>
        );
    }
}