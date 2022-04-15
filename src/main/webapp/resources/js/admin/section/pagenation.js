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
        this.setState({p: event.target.innerText});
    }

    render() {
        const { pageList, prev, next, query, category, onList } = this.props;

        return (
            <div className="pagenation">
                <div id="prev" onClick={() => onList(category, prev, query)} >이전</div>
                <div id="pages">
                    {pageList.map(page =>
                        <div key={page} 
                            className={this.state.p == page ? "curr-page" : ''}
                            onClick={() => {
                                onList(category, page, query)
                                this.setP(event)
                            }}
                        >{page}</div>
                    )}
                </div>
                <div id="next" onClick={() => onList(category, next, query)}>다음</div>
            </div>

        );
    }
}