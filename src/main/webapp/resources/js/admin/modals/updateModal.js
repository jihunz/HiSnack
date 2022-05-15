class UpdateModal extends React.Component {
    render() {
        const { item, ptags, selectTags, category, t_pageList, t_prev, t_next, t_query, onList, onChange, onTagList, onSelectTag, onRemoveTag, onRemoveTags, onModify } = this.props;

        return (
            <div>
                <div className="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">제품 정보 변경</h5>
                                <button type="button" className="btn-close" onClick={onRemoveTags} data-bs-dismiss="modal"></button>
                            </div>
                            <form id="updateForm" encType="multipart/form-data">
                                <div className="modal-body">
                                    <input type="hidden" id="codeInput"
                                        name="code"
                                        value={item.code}
                                    />
                                    {category === 'product' ?
                                        <U_ProductInp
                                            item={item}
                                            ptags={ptags}
                                            selectTags={selectTags}
                                            t_pageList={t_pageList}
                                            t_prev={t_prev}
                                            t_next={t_next}
                                            t_query={t_query}
                                            onList={onList}
                                            onChange={onChange}
                                            onSelectTag={onSelectTag}
                                            onRemoveTag={onRemoveTag}
                                        /> :
                                        <U_TagInp
                                            item={item}
                                            onChange={onChange}
                                        />
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary updateCancel" onClick={onRemoveTags} data-bs-dismiss="modal">취소</button>
                                    <button type="button" className="btn btn-primary" onClick={() => onModify("update", category)}>변경</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class U_ProductInp extends React.Component {
    constructor(props) {
        super(props);
        this.enter = this.enter.bind(this);
    }

    enter(event) {
        if (event.keyCode == 13) this.props.onList('tag', null, null, 1, '.modal-search');
    }

    render() {
        const { item, ptags, selectTags, t_pageList, t_prev, t_next, t_query, onList, onChange, onSelectTag, onRemoveTag } = this.props;
        return (
            <>
                <div className="mb-3">
                    <label className="form-label">제품 이름</label>
                    <input type="text" className="form-control"
                        name="name"
                        value={item.name}
                        onChange={onChange}
                        maxLength="32"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">가격</label>
                    <input type="text" className="form-control"
                        name="price"
                        value={item.price}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">제조사</label>
                    <input type="text" className="form-control"
                        name="manufacture"
                        value={item.manufacture}
                        onChange={onChange}
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
                    category='tag'
                    type='.modal-search'
                    onList={onList}
                />
                <div className="mb-3">
                    <label className="form-label">설명</label>
                    <textarea type="text" className="form-control"
                        name="info"
                        value={item.info}
                        onChange={onChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">이미지 등록</label>
                    <input type="file" className="form-control"
                        name="image"
                        multiple
                    />
                </div>
            </>
        );
    }
}

class U_TagInp extends React.Component {
    render() {
        const { item, onChange } = this.props;
        return (
            <>
                <div className="mb-3">
                    <label className="form-label">태그 내용</label>
                    <input type="text" className="form-control"
                        name="content"
                        value={item.content}
                        onChange={onChange}
                    />
                </div>
            </>
        );
    }
}