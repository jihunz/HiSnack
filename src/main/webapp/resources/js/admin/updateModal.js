class UpdateModal extends React.Component {
    render() {
        const {item, tags, category, onChange, onTagChange, onModify } = this.props;

        return (
            <div>
                <div className="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">제품 정보 변경</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <form id="updateForm" encType="multipart/form-data">
                                <div className="modal-body">
                                    <input type="hidden" id="codeInput" 
                                        name="code" 
                                        value={item.code}
                                    />
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
                                        <label className="form-label">태그 코드</label>
                                        {tags.length ?
                                            tags.map(tag =>
                                                 <input type="number" className="form-control" 
                                                    key={tag.tcode} 
                                                    name="tcode" 
                                                    value={tag.tcode} 
                                                    onChange={() => onTagChange(event, tags.indexOf(tag))}
                                                />)
                                            : <input type="number" className="form-control" 
                                                key={item.code} 
                                                name="tcode" 
                                                placeholder="등록된 태그가 없습니다"
                                            />
                                        }
                                    </div>
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
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary updateCancel" onClick={this.reset} data-bs-dismiss="modal">취소</button>
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