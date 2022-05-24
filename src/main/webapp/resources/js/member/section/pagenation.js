//페이지네이션 컴포넌트
class Pagenation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            p: 1,
        }

        this.setP = this.setP.bind(this);
    }

    setP(event) {
        this.setState({ p: event.target.innerText });
    }

    render() {
        const { pageList, prev, next, category, onList } = this.props;

        return (
            <tfoot className="pagenation">
                <tr>
                    <td colSpan={category == 'sub' ? 4 : 5}>
                        <div id="prev" onClick={() => onList(category, prev)} >이전</div>
                        <div id="pages">
                            {pageList.map(page =>
                                <div key={page}
                                    className={this.state.p == page ? "curr-page" : ''}
                                    onClick={() => {
                                        onList(category, page)
                                        this.setP(event)
                                    }}
                                >{page}</div>
                            )}
                        </div>
                        <div id="next" onClick={() => onList(category, next)}>다음</div>
                    </td>
                </tr>
            </tfoot>

        );
    }
}