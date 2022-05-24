// title 컴포넌트 -> 메뉴 별 title 표시
class MemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nullValid: false,
            pwdValid: false,
        }

        this.chkNull = this.chkNull.bind(this);
        this.setNullVaild = this.setNullVaild.bind(this);
        this.chkPwd = this.chkPwd.bind(this);
        this.pwdRegx = this.pwdRegx.bind(this);
    }

    chkNull() {
        const inputNum = $("form input").length;

        this.setState({ nullValid: false });

        for (let i = 1; i <= inputNum + 1; i++) {
            let nthLabel = document.querySelector(`form > div > div:nth-child(${i}) > label`);
            var nthInput = document.querySelector(`form > div > div:nth-child(${i}) > input`);

            if (nthLabel != null) {
                let inputType = nthLabel.innerText;

                if (typeof nthInput.value == "undefined" || nthInput.value == null || nthInput.value == "") {
                    alert(`${inputType}를(을) 입력해주세요`);
                    nthInput.focus();
                }
            }
        }

        this.setNullVaild(inputNum);
    }

    // 모든 input이 null이 아닐 경우 nullValid를 true로 바꿈
    setNullVaild(inputNum) {
        const inputs = document.getElementsByTagName("input");
        let count = 0;

        for (let k = 0; k <= inputNum - 1; k++) {
            if (inputs[k].value != '') count++;
        }

        if (count === 6) this.setState({ nullValid: true });
    }

    chkPwd(e) {
        const pwd = document.querySelector("#password");
        const pwdConfirm = document.querySelector("#passwordConfirm");

        this.setState({ pwdValid: false });

        if (pwd.value !== pwdConfirm.value & pwd.value !== '' && pwdConfirm.value !== '') {
            alert("비밀번호가 일치하지 않습니다");
            this.props.onMemberChange(e, "pwd");
            pwd.focus();
        } else if (pwd.value === pwdConfirm.value & pwd.value !== '' && pwdConfirm.value !== '') {
            this.setState({ pwdValid: true });
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

    componentDidUpdate() {
        const { nullValid, pwdValid } = this.state;
        const { onUpdate, onChangePwd } = this.props;

        if (nullValid && pwdValid) {
            onUpdate("member");
            onChangePwd();
            this.setState({
                nullValid: false,
                pwdValid: false,
            });
        }
    }

    render() {
        const { item, onMemberChange, onSetAddress } = this.props;

        return (
            <div className="memberForm-wrapper">
                <form id="memberForm">
                    <h1>회원 정보 수정</h1>
                    <div>
                        <div>
                            <label>이름</label>
                            <input type="text" name="name" id="name" value={item.name} onChange={onMemberChange} placeholder="Name" maxLength="8" />
                        </div>
                        <div>
                            <label>비밀번호</label>
                            <input type="password" name="password" id="password" value={item.password} onChange={onMemberChange} onBlur={this.pwdRegx} placeholder="Password" maxLength="15" />
                        </div>
                        <div>
                            <label>비밀번호 확인</label>
                            <input type="password" name="passwordConfirm" id="passwordConfirm" value={item.passwordConfirm} onChange={onMemberChange} placeholder="Confirm Password" maxLength="15" />
                        </div>
                        <div>
                            <label>주소</label>
                            <input type="text" id="address" name="address" value={item.address} onChange={onMemberChange} placeholder="Address" maxLength="64" readOnly />
                            <button type="button" onClick={execDaumPostcode} className="addressbtn text-center">주소 찾기</button>
                        </div>
                        <div>
                            <label>전화번호</label>
                            <input type="text" id="tel" name="tel" value={item.tel} onChange={onMemberChange} onFocus={onSetAddress} placeholder="Tel" maxLength="16" />
                        </div>
                        <div>
                            <label>이메일</label>
                            <input type="email" name="email" id="email" placeholder="Email" maxLength="32" value={item.email} onChange={onMemberChange} />
                        </div>
                        <div className="modifyBtn-wrapper">
                            <button type="button" className="modifyBtn" onClick={(e) => {
                                this.chkNull();
                                this.chkPwd(e);
                                // 회원 정보 수정과 비밀번호 변경 함수는 componentDidUpdate()에서 실행
                            }}>수정</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}