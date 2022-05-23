// title 컴포넌트 -> 메뉴 별 title 표시
class MemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.chkNull = this.chkNull.bind(this);
        this.chkPwd = this.chkPwd.bind(this);
        this.pwdRegx = this.pwdRegx.bind(this);
        // this.chkEmail = this.chkEmail.bind(this);
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
            e.preventDefault();
            alert("비밀번호가 일치하지 않습니다");
            pwd.value = null;
            pwd.focus();
            pwdConfirm.value = null;
        }
    }
    
    pwdRegx() {
        const pwd = $("#password");
        const regx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    
        if (!regx.test(pwd.val())) {
            pwd.val("").attr("placeholder", "비밀번호 형식을 확인해주세요");
            pwd.focus();
            return;
        } else {
            pwd.attr("placeholder", "Password");
        }
    }
    
    // // 이메일 확인을 했는지 체크한다
    // chkEmail(e){
    //     // email하고 email-confirm-hidden하고 같은지 확인한다
    //     const email = $('#email').val();
    //     const confirm = $('#email-confirm-hidden').val();
    //     if(email !== confirm){
    //         e.preventDefault();
    //         alert('이메일 확인을 다시 해주세요.');
    //         $('#email-confirm').val('').focus();
    //         $('#email-confirm-wrapper span').text('');
    //     }
    // }

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
                        <input type="password" name="password" id="password" value={item.password} onChange={onMemberChange}  placeholder="Password" maxLength="15"/>
                    </div>
                    <div>
                        <label>비밀번호 확인</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" value={item.passwordConfirm} onChange={onMemberChange} placeholder="Confirm Password" maxLength="15"/>
                    </div>
                    <div>
                        <label>주소</label>
                        <input type="text" id="address" name="address" value={item.address != null ? item.address : ''} onChange={onMemberChange} placeholder="Address" maxLength=""/>
                        <button type="button" onClick={execDaumPostcode} className="addressbtn text-center">주소 찾기</button>
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input type="text" id="tel" name="tel" value={item.tel != null ? item.tel : ''} onChange={onMemberChange} placeholder="Tel" maxLength=""/>
                    </div>
                    <div>
			            <label>이메일</label>
                        <input type="email" name="email" id="email" placeholder="Email" maxLength="32" value={item.email} onChange={onMemberChange} />
                        <button type="button" id="email-btn">보내기</button>
			        </div>
			        <div>
			        	<label>이메일 확인 번호</label>
                        <input type="text" id="email-confirm" placeholder="Email Confirm" maxLength="32" value={item.emailConfirm} onChange={onMemberChange}/>
                        <button type="button" id="email-confirm-btn">확인</button>
			        </div>
                    <button type="button" id="modifyBtn" onClick={(e) => {
                        this.chkNull(e);
                        this.chkPwd(e);
                    }}>수정</button>
                </form>
            </div>
        );
    }
}