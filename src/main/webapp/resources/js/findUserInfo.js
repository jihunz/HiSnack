$(function () {
    $("form").keydown((e) => stopExec(e));

    $("#idBtn").click(() => validEmail());

    $("#id-confirm-btn").click(() => findId());
});

function stopExec(e) {
    if (e.keyCode == 13) e.preventDefault();  
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
        error: xhr => {
        }
    })
}

function findId(email) {
    const id = $("#userId").val();
    let url = `rest/member/find?id=${id}`;

    if(email) url = `rest/member/?email=${email}`

    $.ajax(url , {
        method: "GET",
        success: result => {
            if(email) alert(`아이디는 ${result.id} 입니다.`);

            alert('이메일로 확인');
            return;
        },
        error: xhr => {
        }
    })
}

// 이메일 확인을 했는지 체크한다
function chkEmail(e){
	// email하고 email-confirm-hidden하고 같은지 확인한다
	const email = $('#email').val();
	const confirm = $('#email-confirm-hidden').val();
	if(email !== confirm){
		e.preventDefault();
		alert('이메일 확인을 다시 해주세요.');
		$('#email-confirm').val('').focus();
		$('#email-confirm-wrapper span').text('');
		return false;
	}
	
	return true;
}