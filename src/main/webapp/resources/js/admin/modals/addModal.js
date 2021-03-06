//bootstrap을 사용한 addModal
class AddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: "",
                price: "",
                manufacture: "",
                info: "",
                image: ""
            },
            content: "",
        }

        this.change = this.change.bind(this);
        this.reset = this.reset.bind(this);
        this.preventDefault = this.preventDefault.bind(this);
        this.send = this.send.bind(this);
    }

    change(event, category) {
        const inputName = event.target.name;

        if (category === 'product') {
            this.setState({
                product: {
                    [inputName]: event.target.value,
                }
            });
        } else {
            this.setState({ [inputName]: event.target.value });
        }

    }

    reset() {
        if (this.props.category === 'product') {
            this.setState({
                product: {
                    name: "",
                    price: "",
                    manufacture: "",
                    info: "",
                    image: ""
                }
            });
            this.props.onRemoveTags();
        } else {
            this.setState({ content: "" });
        }
    }

    preventDefault(event) {
        event.preventDefault();
    }

    send(event) {
        const { category, onModify } = this.props;
        if (event.keyCode == 13) onModify('add', category);
    }

    render() {
        const { category, title, ptags, selectTags, t_pageList, t_prev, t_next, t_query, onList, onModify, onSelectTag, onRemoveTag } = this.props;
        const { product, content } = this.state;

        return (
            <div>
                <div className="modal fade mWrapper" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addModalLabel">{title} 등록</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <form id="addForm" encType="multipart/form-data" onSubmit={() => this.preventDefault(event)}>
                                <div className="modal-body">
                                    {category === 'product' ?
                                        <ProductInp
                                            category={category}
                                            product={product}
                                            ptags={ptags}
                                            selectTags={selectTags}
                                            t_pageList={t_pageList}
                                            t_prev={t_prev}
                                            t_next={t_next}
                                            t_query={t_query}
                                            onChange={this.change}
                                            onList={onList}
                                            onSelectTag={onSelectTag}
                                            onRemoveTag={onRemoveTag}
                                        /> :
                                        <TagInp
                                            content={content}
                                            onChange={this.change}
                                            onPreventDefault={this.preventDefault}
                                            onSend={this.send}
                                        />
                                    }

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary addCancel" onClick={this.reset} data-bs-dismiss="modal">취소</button>
                                    <button type="button" className="btn btn-primary" onClick={() => onModify("add", category)}>등록</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ProductInp extends React.Component {
    constructor(props) {
        super(props);
        this.enter = this.enter.bind(this);
    }

    enter(event) {
        if (event.keyCode == 13) this.props.onList('tag', null, null, 1, '.modal-search');
    }

    render() {
        const { category, product, ptags, selectTags, t_pageList, t_prev, t_next, t_query, onChange, onList, onSelectTag, onRemoveTag } = this.props;


        return (
            <>
                <div className="mb-3">
                    <label className="form-label">제품 이름</label>
                    <input type="text" className="form-control"
                        name="name"
                        value={product.name}
                        onChange={() => onChange(event, category)}
                        maxLength="32"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">가격</label>
                    <input type="text" className="form-control"
                        name="price"
                        value={product.price}
                        onChange={() => onChange(event, category)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">제조사</label>
                    <input type="text" className="form-control"
                        name="manufacture"
                        value={product.manufacture}
                        onChange={() => onChange(event, category)}
                        maxLength="32"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">태그</label>
                    <div className="selectedPtags">
                        {selectTags.length && selectTags ? selectTags.map((tag, idx) =>
                            <>
                                <div key={`content1${idx}`} id={`content1${idx}`} className="ptag-content pointer">
                                    <p>{tag.content}</p>
                                    <div onClick={() => onRemoveTag(tag.tcode)}>X</div>
                                </div>
                                <input
                                    key={`tag${idx}`}
                                    type="hidden"
                                    name="tcode"
                                    value={tag.tcode}
                                    readOnly />
                            </>
                        ) : null}
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="keyword"
                            className="modal-search form-control"
                            placeholder="태그 이름을 검색해주세요"
                            onKeyPress={() => this.enter(event)} />
                        <button type="button" className="btn btn-warning" onClick={() => onList('tag', null, null, 1, '.modal-search')}>검색</button>
                    </div>
                    <div className="ptags">
                        {ptags.length && ptags ? ptags.map((tag) =>
                            <div key={`result${tag.code}`} id={tag.code} className="pointer" onClick={onSelectTag}>{tag.content}</div>)
                            : '검색된 태그가 없습니다'}
                    </div>
                </div>
                <Pagenation
                    t_pageList={t_pageList}
                    t_prev={t_prev}
                    t_next={t_next}
                    t_query={t_query}
                    category={category}
                    type='.modal-search'
                    onList={onList}
                />
                <div className="mb-3">
                    <label className="form-label">설명</label>
                    <textarea type="text" className="form-control"
                        name="info"
                        value={product.info}
                        onChange={() => onChange(event, category)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">이미지 등록</label>
                    <input type="file" className="form-control"
                        name="image"
                        value={product.image}
                        onChange={() => onChange(event, category)}
                        multiple
                    />
                </div>
            </>
        );
    }
}

class TagInp extends React.Component {
    render() {
        const { content, onChange, onSend } = this.props;
        return (
            <>
                <div className="mb-3">
                    <label className="form-label">태그 내용</label>
                    <input type="text" className="form-control"
                        name="content"
                        value={content}
                        onChange={onChange}
                        onKeyPress={() => onSend(event)}
                    />
                </div>
            </>
        );
    }
}