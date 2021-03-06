// title 컴포넌트 -> 메뉴 별 title 표시
class SubInfo extends React.Component {
    render() {
        const { item_sub, onSubChange } = this.props;

        return (
            <div className="subForm-wrapper">
                <form id="subForm">
                    <h1>배송지 정보</h1>
                    <div>
                        <div>
                            <label>수령인</label>
                            <input type="text" name="name" value={item_sub.name} onChange={onSubChange} readOnly/>
                        </div>
                        <div>
                            <label>연락처</label>
                            <input type="text" name="tel" value={item_sub.tel} onChange={onSubChange} readOnly/>
                        </div>
                        <div>
                            <label>주소</label>
                            <input type="text" id="address" name="address" value={item_sub.address} onChange={onSubChange} readOnly/>
                        </div>
                        <div>
                            <label>구독가격</label>
                            <input type="number" name="total" value={item_sub.total} onChange={onSubChange} readOnly />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}