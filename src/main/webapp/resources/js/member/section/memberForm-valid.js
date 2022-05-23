$(function () {
    $("#modifyBtn").click((e) => {
        if(!chkNull(e)) return false;
        if(!chkPwd(e)) return false;
        if(!chkEmail(e)) return false;
    });

    $("#password").change(() => pwdRegx());
});

