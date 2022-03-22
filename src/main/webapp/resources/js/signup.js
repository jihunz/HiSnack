$(function() {
	$("#signupBtn").click((e) => {
        chkNull(e);
        chkPwd(e);
    });

    $("#userId").focusout(() => chkId());

    $("#password").change(() => pwdRegx());
});

function chkNull(e) {
   const inputNum = $("form input").length

    for(let i=1; i<=inputNum; i++) {
        let nthLabel = $(`form > div:nth-child(${i}) > label`);
        let nthInput = $(`form > div:nth-child(${i}) > input`);
		let inputType = $(nthLabel).text();

        if(typeof $(nthInput).val() == "undefined"|| $(nthInput).val() == null || $(nthInput).val() == "") {
            e.preventDefault();
            alert(`${inputType}를(을) 입력해주세요`);
            nthInput.focus();
            return;
        }
    }
}

// state로 chkNull, chkPwd 활용 여부 결정해야함
function chkPwd(e) {
    const pwd = $("#password");
    const pwdConfirm = $("#pwdConfirm");

    if(pwd.val() !== pwdConfirm.val()) {
        e.preventDefault();
        alert("비밀번호가 일치하지 않습니다");
        pwd.val("").focus();
        pwdConfirm.val("");
        return;
    }
}

function pwdRegx() {
    const pwd = $("#password");
    const regx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

	if (!regx.test(pwd.val())) {
        // alert("비밀번호 형식을 확인해주세요 \n 비밀번호는 최소 8~15자, 하나 이상의 숫자와 문자, 특수기호를 포함해야합니다")
        pwd.val("").attr("placeholder", "비밀번호 형식을 확인해주세요");
        pwd.focus();
        return;
	} else {
        pwd.attr("placeholder", "Password");
    }
}

function chkId() {
	let userId = $("#userId").val();

    if(userId == "") return;
	
	$.ajax(`rest/member/${userId}`, {
		method: "GET",
		success: result => {
			console.log(result);
			idMsg(result);
		},
		error: xhr => {
			idErrMsg(xhr);
		}
	})

	function idErrMsg(xhr) {
		alert(`아이디 중복확인 중 오류 발생: ${xhr.statusText}`);
		$("#userId").val("");
	}

	function idMsg(result) {
		if (result.length < 1)
			alert("사용 가능한 아이디입니다");
		else {
			alert("사용 중인 아이디입니다");
			$("#userId").val("");
		}
	}
}