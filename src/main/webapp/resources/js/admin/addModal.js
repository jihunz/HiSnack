//bootstrap을 사용한 addModal
class AddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: "",
                price: "",
                manufacture: "",
                tcode: "",
                info: "",
                image: ""
            },
            content: "",
        }

        this.change = this.change.bind(this);
        this.reset = this.reset.bind(this);
    }

    change(event, category) {
        const inputName = event.target.name;

        if(category === 'product') {
            this.setState({
                product: {
                    [inputName]: event.target.value,
                }
            });
        } else {
            this.setState({ [inputName]: event.target.value });
        }
        
    }

    reset(category) {
        if(category === 'product') {
            this.setState({
                product: {
                    name: "",
                    price: "",
                    manufacture: "",
                    tcode: "",
                    info: "",
                    image: ""
                }
            });
        } else {
            this.setState({ content: "" });
        }
    }

    render() {
        const { category, title, onModify } = this.props;
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
                            <form id="addForm" encType="multipart/form-data">
                                <div className="modal-body">
                                    {category === 'product' ? 
                                        <PAddInputs category={category} product={product} onChange={this.change} /> : 
                                        <TAddInput content={content} onChange={this.change} />
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

class PAddInputs extends React.Component {
    render() {
        const { category, product, onChange } = this.props;

        return (
            <>
                <div className="mb-3">
                    <label className="form-label">제품 이름</label>
                    <input type="text" className="form-control"
                        name="name"
                        value={product.name}
                        onChange={() => onChange(event)}
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
                    <label className="form-label">태그 코드</label>
                    <input type="number" className="form-control"
                        name="tcode"
                        value={product.tcode}
                        onChange={() => onChange(event, category)}
                        maxLength="10"
                    />
                </div>
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

class TAddInput extends React.Component {
    render() {
        const { content, onChange } = this.props;
        return (
            <>
                <div className="mb-3">
                    <label className="form-label">태그 내용</label>
                    <input type="text" className="form-control"
                        name="content"
                        value={content}
                        onChange={onChange}
                    />
                </div>
            </>
        );
    }
}