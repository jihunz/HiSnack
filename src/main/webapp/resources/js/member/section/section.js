// 섹션 컴포넌트 -> 검색창, 버튼, 테이블, 페이지네이션을 삽입
class Section extends React.Component {
    render() {
        const { title, list, orderList, item_sub, item, category, pageList, prev, next, query, showSubInfo, onList, onUpdate, onDelete, onItem, onGetCode, onSubChange, onMemberChange, onChangePwd, onSetShowSubInfo, onSetAddress } = this.props;

        return (
            <div className="section-table-container">
                <div className="section-sub-title">
                    <Title
                        title={title}
                        category={category}
                    />
                </div>
                {showSubInfo ?
                    <SubInfo
                        item_sub={item_sub}
                        onSubChange={onSubChange}
                    /> : null}
                    {category != 'member' && !showSubInfo ?
                        <Table
                            list={list}
                            orderList={orderList}
                            category={category}
                            pageList={pageList}
                            prev={prev}
                            next={next}
                            query={query}
                            onList={onList}
                            onDelete={onDelete}
                            onItem={onItem}
                            onGetCode={onGetCode}
                            onSetShowSubInfo={onSetShowSubInfo}
                        /> : null}
                    {category == 'member' && !showSubInfo ?
                        <MemberForm
                            item={item}
                            onUpdate={onUpdate}
                            onMemberChange={onMemberChange}
                            onChangePwd={onChangePwd}
                            onSetAddress={onSetAddress}
                        /> : null}
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
                {category != 'member' ? <div className="order-wrapper"><div>최신 순</div><div>오래된 순</div></div> : null}
            </>
        );
    }
}