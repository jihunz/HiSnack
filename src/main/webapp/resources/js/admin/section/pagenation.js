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
        const { type, onList } = this.props;
        let category = this.props.category;
        let pageList = this.props.pageList;
        let prev = this.props.prev;
        let next = this.props.next;
        let query = this.props.query;

        if(type == '.modal-search') {
            category = 'tag';
            pageList = this.props.t_pageList;
            prev = this.props.t_prev;
            next = this.props.t_next;
            query = this.props.t_query;
        }

        return (
            <div className="pagenation">
                <div id="prev" onClick={() => onList(category, prev, query, null, type)} >이전</div>
                <div id="pages">
                    { pageList ? pageList.map(page =>
                        <div key={'t' + page} 
                            className={this.state.p == page ? "curr-page" : ''}
                            onClick={() => {
                                onList(category, page, query, null, type)
                                this.setP(event)
                            }}
                        >{page}</div>
                    ) : null}
                </div>
                <div id="next" onClick={() => onList(category, next, query, null, type)}>다음</div>
            </div>

        );
    }
}