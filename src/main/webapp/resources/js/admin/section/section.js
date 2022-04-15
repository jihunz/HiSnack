// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {

    render() {
        const { title, list, pageList, prev, next, query, category, onDelete, onItem, onGetCode, onGetCodes, onDeleteList, onInitCodes, onList } = this.props;

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

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidUpdate(prevProps) {
        const { category } = this.props;

        if (category !== prevProps.category) {
            if (category === 'product') {
                this.setState({ t: "제품 번호, 제품명, 제조사" })
            } else if (category === 'sub' || category === 'orders') {
                this.setState({ t: "주문 번호, 아이디, 주문 날짜" })
            } else if (category === 'member') {
                this.setState({ t: "아이디, 이름, 관리 등급" })
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
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="keyword" id="searchBox" placeholder={this.state.t} />
                    <button onClick={() => onList(category, null, null, 1)}><img src="" />검색</button>
                </form>
            </>
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
                        <button type="button" id="section-item-submit" data-bs-toggle="modal" data-bs-target="#addModal">등록<img src="" /></button>
                    : null
                }
                {category === 'sub' || category === 'orders' ? null
                    :
                        <button
                            onClick={() => { onDeleteList(category) }}
                        >삭제<img src="" /></button>
                }
            </div>
        );
    }
}