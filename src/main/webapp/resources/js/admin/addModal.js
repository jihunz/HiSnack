//bootstrap을 사용한 addModal
class AddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: "",
            manufacture: "",
            tcode: "",
            info: "",
            image: ""
        }

        this.change = this.change.bind(this);
        this.reset = this.reset.bind(this);
    }

    change(event) {
        const inputName = event.target.name;

        this.setState({
            [inputName]: event.target.value,
        });
    }

    reset() {
        this.setState({
            name: "",
            price: "",
            manufacture: "",
            tcode: "",
            info: "",
            image: ""
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade mWrapper" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addModalLabel">제품 등록</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <form id="addForm" encType="multipart/form-data">
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">제품 이름</label>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.change} maxLength="32"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">가격</label>
                                        <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.change}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">제조사</label>
                                        <input type="text" className="form-control" name="manufacture" value={this.state.manufacture} onChange={this.change} maxLength="32"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">태그 코드</label>
                                        <input type="number" className="form-control" name="tcode" value={this.state.tcode} onChange={this.change} maxLength="10"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">설명</label>
                                        <textarea type="text" className="form-control" name="info" value={this.state.info} onChange={this.change}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">이미지 등록</label>
                                        <input type="file" className="form-control" name="image" value={this.state.image} onChange={this.change} multiple/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary aCancel" onClick={this.reset} data-bs-dismiss="modal">취소</button>
                                    <button type="button" className="btn btn-primary" onClick={() => this.props.onModify("add")}>등록</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}