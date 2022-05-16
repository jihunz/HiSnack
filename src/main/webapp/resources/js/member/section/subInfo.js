// title 컴포넌트 -> 메뉴 별 title 표시
class SubInfo extends React.Component {
    render() {
        const { item, onUpdate, onChange } = this.props;

        return (
            <div>
                <form id="SubForm">
                    <h1>배송지 정보</h1>
                    <div>
                        <label>수령인</label>
                        <input name="name" value={item.name} onChange={onChange} />
                    </div>
                    <div>
                        <label>연락처</label>
                        <input name="tel" value={item.tel} onChange={onChange} />
                    </div>
                    <div>
                        <label>주소</label>
                        <input name="address" value={item.address} onChange={onChange} />
                    </div>
                    <div>
                        <label>구독가격</label>
                        <input name="email" value={item.total} onChange={onChange} />
                    </div>
                    <button type="button" onClick={() => onUpdate("orders")}>수정</button>
                </form>
            </div>
        );
    }
}