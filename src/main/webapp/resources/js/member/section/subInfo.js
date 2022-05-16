// title 컴포넌트 -> 메뉴 별 title 표시
class SubInfo extends React.Component {
    render() {
        const { item_sub, onUpdate, onSubChange } = this.props;

        return (
            <div>
                <form id="subForm">
                    <h1>배송지 정보</h1>
                    <div>
                        <label>수령인</label>
                        <input name="name" value={item_sub.name} onChange={onSubChange} />
                    </div>
                    <div>
                        <label>연락처</label>
                        <input name="tel" value={item_sub.tel} onChange={onSubChange} />
                    </div>
                    <div>
                        <label>주소</label>
                        <input name="address" value={item_sub.address} onChange={onSubChange} />
                    </div>
                    <div>
                        <label>구독가격</label>
                        <input name="total" value={item_sub.total} readOnly />
                    </div>
                    <button type="button" onClick={() => onUpdate("sub", item_sub.code)}>수정</button>
                </form>
            </div>
        );
    }
}