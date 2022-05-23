// title 컴포넌트 -> 메뉴 별 title 표시
class MemberForm extends React.Component {
    render() {
        const { item, onUpdate, onMemberChange } = this.props;

        return (
            <div>
                <form id="memberForm">
                    <h1>회원 정보 수정</h1>
                    <div>
                        <label>이름</label>
                        <input type="text" name="name" value={item.name} onChange={onMemberChange} />
                    </div>
                    <div>
                        <label>주소</label>
                        <input type="text" id="address" name="address" value={item.address != null ? item.address : ''} onChange={onMemberChange} />
                        <button type="button" onClick={execDaumPostcode} className="addressbtn text-center">주소 찾기</button>
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input type="text" id="tel" name="tel" value={item.tel != null ? item.tel : ''} onChange={onMemberChange} />
                    </div>
                    <div>
                        <label>이메일</label>
                        <input type="text" name="email" value={item.email} onChange={onMemberChange} />
                    </div>
                    <button type="button" onClick={() => onUpdate("member")}>수정</button>
                </form>
            </div>
        );
    }
}