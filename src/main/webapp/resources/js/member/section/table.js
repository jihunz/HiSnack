// 테이블 컴포넌트 -> table 태그를 반환
class Table extends React.Component {
    render() {
        const { list, category, onDelete, onItem, onGetCode } = this.props;

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
                        category={category}
                        onDelete={onDelete}
                        onItem={onItem}
                        onEachCheck={this.eachCheck}
                        onGetCode={onGetCode}
                    />
                </table>
            </div>
        );
    }
}