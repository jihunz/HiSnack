//페이지네이션 컴포넌트
class Pagenation extends React.Component {
    render() {
        const { pageList, prev, next, query, onList } = this.props;

        return (
            <div>
                <div onClick={() => onList(prev, query)} >이전</div>
                <div>
                    {pageList.map(page => <div key={page} onClick={() => onList(page, query)}>{page}</div>)}
                </div>
                <div onClick={() => onList(next, query)}>다음</div>
            </div>

        );
    }
}