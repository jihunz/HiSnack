//페이지네이션 컴포넌트
class Pagenation extends React.Component {
    render() {
        const { pageList, prev, next, query, category, onList } = this.props;

        return (
            <div>
                <div onClick={() => onList(category, prev, query)} >이전</div>
                <div>
                    {pageList.map(page =>
                        <div key={page} onClick={() => onList(category, page, query)}>{page}</div>
                    )}
                </div>
                <div onClick={() => onList(category, next, query)}>다음</div>
            </div>

        );
    }
}