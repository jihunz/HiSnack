//bootstrap을 사용한 infoModal
class InfoModal extends React.Component {
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
        const { item, tags, images } = this.props;

        return (
            <div>
                <div className="modal fade mWrapper" id="infoModal" data-bs-keyboard="false" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoModal">제품 상세</h5>
                                <button type="button" className="btn-close" onClick={this.reset} data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}