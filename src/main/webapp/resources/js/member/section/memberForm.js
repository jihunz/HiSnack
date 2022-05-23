// title 컴포넌트 -> 메뉴 별 title 표시
class MemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.chkNull = this.chkNull.bind(this);
        this.chkPwd = this.chkPwd.bind(this);
        this.pwdRegx = this.pwdRegx.bind(this);
    }

    chkNull(e) {
        const inputNum = $("form input").length;

        for (let i = 1; i <= inputNum + 1; i++) {
            let nthLabel = document.querySelector(`form > div:nth-child(${i}) > label`);
            let nthInput = document.querySelector(`form > div:nth-child(${i}) > input`);

            if(nthLabel != null) {
                let inputType = nthLabel.innerText;

                if (typeof nthInput.value == "undefined" || nthInput.value == null || nthInput.value == "") {
                    e.preventDefault();
                    alert(`${inputType}를(을) 입력해주세요`);
                    nthInput.focus();
                }
            }
        }
    }
    
    chkPwd(e) {
        const pwd = document.querySelector("#password");
        const pwdConfirm = document.querySelector("#passwordConfirm");
        
        if (pwd.value !== pwdConfirm.value) {
            alert("비밀번호가 일치하지 않습니다");
            // 비밀번호 불일치시 pwd도 공백으로 만들어야 함
            pwd.value = '';
            this.props.onMemberChange(e, "password");
            pwdConfirm.value = '';
            this.props.onMemberChange(e, "passwordConfirm");
            pwd.focus();
        }
    }
    
    pwdRegx(e) {
        const pwd = document.querySelector("#password");
        const regx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    
        if (!regx.test(pwd.value)) {
            pwd.value = '';
            this.props.onMemberChange(e);
            pwd.setAttribute("placeholder", "비밀번호 형식을 확인해주세요");
        } else {
            pwd.setAttribute("placeholder", "Password");
        }
    }

    render() {
        const { item, onUpdate, onMemberChange } = this.props;

        return (
            <div>
                <form id="memberForm">
                    <h1>회원 정보 수정</h1>
                    <div>
                        <label>이름</label>
                        <input type="text" name="name" id="name" value={item.name} onChange={onMemberChange} placeholder="Name" maxLength="8"/>
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input type="password" name="password" id="password" value={item.password} onChange={onMemberChange} onBlur={this.pwdRegx}  placeholder="Password" maxLength="15"/>
                    </div>
                    <div>
                        <label>비밀번호 확인</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" value={item.passwordConfirm} onChange={onMemberChange} placeholder="Confirm Password" maxLength="15"/>
                    </div>
                    <div>
                        <label>주소</label>
                        <input type="text" id="address" name="address" value={item.address} onChange={onMemberChange} onBlur={onMemberChange} placeholder="Address" maxLength="64"/>
                        <button type="button" onClick={execDaumPostcode} className="addressbtn text-center">주소 찾기</button>
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input type="text" id="tel" name="tel" value={item.tel} onChange={onMemberChange} placeholder="Tel" maxLength="16"/>
                    </div>
                    <div>
			            <label>이메일</label>
                        <input type="email" name="email" id="email" placeholder="Email" maxLength="32" value={item.email} onChange={onMemberChange} />
			        </div>
                    <button type="button" id="modifyBtn" onClick={(e) => {
                        // 91, 92번을 만족시키지 못할 경우 onUpdate를 막아야 함
                        this.chkNull(e);
                        this.chkPwd(e);
                        // onUpdate("member");
                    }}>수정</button>
                </form>
            </div>
        );
    }
}