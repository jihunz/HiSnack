// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {

    render() {
        const { title, list, item, category, pageList, prev, next, query, onList, onUpdate, onDelete, onItem, onGetCode, onChange } = this.props;

        return (
            <div>
                <div>
                    <Title
                        title={title}
                        category={category}
                    />
                </div>
                {category != 'member' ?
                    <Table
                        list={list}
                        category={category}
                        pageList={pageList}
                        prev={prev}
                        next={next}
                        query={query}
                        onList={onList}
                        onDelete={onDelete}
                        onItem={onItem}
                        onGetCode={onGetCode}
                    />
                    : <MemberForm item={item} onUpdate={onUpdate} onChange={onChange} />
                }
            </div>
        );
    }
}

// title 컴포넌트 -> 메뉴 별 title 표시
class Title extends React.Component {
    render() {
        const { title, category } = this.props;

        return (
            <>
                <p>{title}</p>
                {category != 'member' ? <><div>최신 순</div><div>오래된 순</div></> : null}
            </>
        );
    }
}