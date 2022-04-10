//bootstrap을 사용한 infoModal
class InfoModal extends React.Component {
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

    reset(category) {
        if (category === 'product') {
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
        const { category, item, tags, images } = this.props;

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
                                    <tbody>
                                        {category === 'product' ?
                                            <PInfo
                                                item={item}
                                                tags={tags}
                                                images={images}
                                            /> : null
                                        }
                                        {/* {category === 'sub' || category === 'orders' ? <PInfo /> : null}
                                        {category === 'member' ? <PInfo /> : null}
                                        {category === 'review' ? <PInfo /> : null}
                                        {category === 'tags' ? <PInfo /> : null} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PInfo extends React.Component {
    render() {
        const { item, tags, images } = this.props;

        return (
            <>
                <tr>
                    <td>제품 번호</td>
                    <td>{item.code}</td>
                    <td>사진</td>
                    <td rowSpan="3">{images.length ? <img id="infoImg" src={images[0].fullpath}></img> : "등록된 사진이 없습니다"}</td>
                </tr>
                <tr>
                    <td>제품명</td>
                    <td colSpan="2">{item.name}</td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td colSpan="2">{item.price}</td>
                </tr>
                <tr>
                    <td>제조사</td>
                    <td colSpan="3">{item.manufacture}</td>
                </tr>
                <tr>
                    <td>설명</td>
                    <td colSpan="3">{item.info}</td>
                </tr>
                <tr>
                    <td>태그</td>
                    {/* 태그를 텍스트가 아닌 버튼 형식으로 출력하는 방법에 대한 고민 필요 */}
                    <td colSpan="3">{tags.length ?
                        tags.map(tag => `${tag.tcode}  `)
                        : "등록된 태그가 없습니다"}</td>
                </tr>
            </>
        );
    }
}