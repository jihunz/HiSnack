$(function () {
    $("#signupBtn").click((e) => {
        chkNull(e);
        chkPwd(e);
    });

    $("#userId").on({
        "keyup": () => restrictId(),
        "focusout": () => chkId()
    });

    $("#password").change(() => pwdRegx());
});

function chkNull(e) {
    const inputNum = $("form input").length

    for (let i = 1; i <= inputNum; i++) {
        let nthLabel = $(`form > div:nth-child(${i}) > label`);
        let nthInput = $(`form > div:nth-child(${i}) input`);
        let inputType = $(nthLabel).text();

        if (typeof $(nthInput).val() == "undefined" || $(nthInput).val() == null || $(nthInput).val() == "") {
            e.preventDefault();
            alert(`${inputType}를(을) 입력해주세요`);
            nthInput.focus();
            return;
        }
    }
}

function chkPwd(e) {
    const pwd = $("#password");
    const pwdConfirm = $("#pwdConfirm");

    if (pwd.val() !== pwdConfirm.val()) {
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
    const userId = $("#userId").val();

    if (userId === "") return;

    $.ajax(`rest/member/confirm?id=${userId}`, {
        method: "GET",
        success: result => {
            idMsg(result);
            return;
        },
        error: xhr => {
            idErrMsg(xhr);
        }
    })

    function idErrMsg(xhr) {
        alert(`아이디 중복확인 중 오류 발생: ${xhr.statusText}`);
        $("#userId").val("");
        return;
    }

    //서버에서 id 중복을 확인하여 id 개수가 0일 경우 "ok"를 전송하고
    //이를 통해 아래의 함수에서 id의 중복여부를 확인
    function idMsg(result) {
        if (result === "ok") {
            alert("사용 가능한 아이디입니다");
        } else {
            alert("사용 중인 아이디입니다");
            $("#userId").val("");
        }
    }
}

// 특수문자와 공백에 대한 정규식으로
// 아이디 input에 이메일 형식의 값이 입력되는 것을 제한
function restrictId() {
    //특수문자 정규식
    const spacial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    //모든 공백 체크 정규식
    const blank = /\s/g;
    const userId = $("#userId").val();

    if (spacial.test(userId) || blank.test(userId)) {
        alert("특수문자, 공백은 입력할 수 없습니다");
        $("#userId").val("");
        return;
    }
}