// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {

    render() {
        const { title, list, pageList, prev, next, query, category, onDelete, onItem, onGetCode, onGetCodes, onDeleteList, onInitCodes, onList } = this.props;

        return (
            <div>
                <Title title={title} />
                <Search
                    category={category}
                    onList={onList}
                />
                <Btns
                    onDeleteList={onDeleteList}
                    category={category}
                />
                <DataTable
                    list={list}
                    category={category}
                    onDelete={onDelete}
                    onItem={onItem}
                    onGetCode={onGetCode}
                    onGetCodes={onGetCodes}
                    onInitCodes={onInitCodes}
                />
                <Pagenation
                    pageList={pageList}
                    prev={prev}
                    next={next}
                    query={query}
                    category={category}
                    onList={onList}
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
    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const { category, onList } = this.props;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="keyword" id="searchBox" placeholder="제품 번호, 제품명, 제조사 등" />
                    <button onClick={() => onList(category, null, null, 1)}><img src="" />검색</button>
                </form>
            </div>
        );
    }
}

// 버튼 컴포넌트 -> 등록, 삭제 버튼 반환
class Btns extends React.Component {
    render() {
        const { category, onDeleteList } = this.props;
        console.log(category);

        return (
            <div>
                <div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">등록<img src="" /></button>
                </div>
                <div>
                    <button
                        onClick={() => {onDeleteList(category)}}
                    >삭제<img src="" /></button>
                </div>
            </div>
        );
    }
}