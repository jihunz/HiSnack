// 테이블 컴포넌트 -> table 태그를 반환
class Table extends React.Component {
    render() {
        const { list, orderList, category, pageList, prev, next, query, onList, onDelete, onItem, onGetCode, onSetShowSubInfo } = this.props;

        return (
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            {category === 'sub' ? <SubTh /> : ''}
                            {category === 'orders' ? <OrdersTh /> : ''}
                            {category === 'review' ? <ReviewTh /> : ''}
                        </tr>
                    </thead>
                    <Tbody
                        list={list}
                        orderList={orderList}
                        category={category}
                        onDelete={onDelete}
                        onItem={onItem}
                        onGetCode={onGetCode}
                        onSetShowSubInfo={onSetShowSubInfo}
                    />
                    <Pagenation 
                        pageList={pageList}
                        prev={prev}
                        next={next}
                        query={query}
                        category={category}
                        onList={onList}
                    />
                </table>
            </div>
        );
    }
}