$(function () {
    $("form").keydown((e) => stopExec(e));

    $("#idBtn").click(() => validEmail());

    $("#id-confirm-btn").click(() => chkId());

    $('#pwdBtn').click(() => getTempPwd()); 
});


function getTempPwd() {
    const cofirmed_email = $('#email-confirm-hidden').val();
    const email = $('#email').val();
    const id = $('#userId').val();
    
    if(id !== null && cofirmed_email !== null && email !== null) {
        if(cofirmed_email === email) {
            $.ajax('rest/member/change/temp/password', {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                data: JSON.stringify({id: id}),
                success: result => {
                    alert(`임시 비밀번호는 ${result.password} 입니다.`);
                },
                error: xhr => {}
            });
        }
    }
}


function chkId() {
    const id = $('#userId').val();

    $.ajax(`rest/member/confirm?id=${id}`, {
        method: "GET",
        success: result => {
            if (result === 'no') {
                alert('아이디가 확인되었습니다. 가입 시 입력한 이메일을 입력해주세요.')
                $('.email-wrapper').css('display', 'block');
                $('#email').removeAttr('readonly');
                $('#email-confirm').removeAttr('readonly');
            } else {
                alert('아이디가 존재하지 않습니다.');
            }
            return;
        },
        error: xhr => {}
    });
}

function stopExec(e) {
    if (e.keyCode === 13) e.preventDefault();
}

function validEmail() {
    const email = $("#email-id").val();

    if (email === "") return;

    $.ajax(`rest/member/confirm/email?email=${email}`, {
        method: "GET",
        success: result => {
            if (result == 'no') {
                findId(email);
            } else {
                alert('이메일에 해당하는 아이디가 존재하지 않습니다.');
            }
            return;
        },
        error: xhr => {}
    });
}

function findId(email) {
    $.ajax(`rest/member/find?email=${email}`, {
        method: "GET",
        success: result => {
            alert(`아이디는 ${result.id} 입니다.`)
            return;
        },
        error: xhr => {}
    });
}

// 이메일 확인을 했는지 체크한다
function chkEmail(e) {
    // email하고 email-confirm-hidden하고 같은지 확인한다
    const email = $('#email').val();
    const confirm = $('#email-confirm-hidden').val();
    if (email !== confirm) {
        e.preventDefault();
        alert('이메일 확인을 다시 해주세요.');
        $('#email-confirm').val('').focus();
        $('#email-confirm-wrapper span').text('');
        return false;
    }
    return true;
}