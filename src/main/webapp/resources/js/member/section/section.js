// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {

    render() {
        const { title, list, category, onDelete, onItem, onGetCode, onGetCodes, onDeleteList, onInitCodes, onList } = this.props;

        return (
            <div>
                <div>
                    <Title title={title} />
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
                <div>
                    <p>주문 정보</p>
                    <div>최신 순</div>
                    <div>오래된 순</div>
                </div>
            </div>
        );
    }
}