let confirmString = '';
let timerId = 0;

$(function(){
	// email-btn이 눌리면 확인 이메일을 보낸다
	$('#email-btn').click(function(){
		const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		const email = $('#email');
		
		// 이메일이 빈칸이 아닌지, 이메일 형식으로 입력이 됐는지 확인한다
		if(!email || !email.val().match(regExp)){
			alert('이메일을 제대로 입력하세요.');
			email.select();
		}
		else{
			// 입력한 email이 정확하면 그 email로 확인 메시지를 보낸다
			// 확인 번호 생성
			confirmString = Math.random().toString(36).substring(2, 11);
			// 보낼 데이터를 생성
			const item = {
				email:email.val(),
				subject:'HiSnack! 확인 이메일입니다.',
				content:`확인 번호 : ${confirmString}\n확인번호를 입력해주세요!`
			};
			// ajax로 EmailController에게 email을 보낸다
			$.ajax(`/rest/email`, {
				method:'POST',
				dataType:'json',
				data:JSON.stringify(item),
				contentType:'application/json; charset=UTF-8',
				success:function(result){
					alert(`${email.val()}로 확인 이메일이 발송되었습니다.`);
					console.log(result.msg);
					
					let count = 60;
					
					clearInterval(timerId);
					
					// 확인 번호를 입력할 수 있는 시간을 보여줌
					timerId = setInterval(()=>{
						if(count == 0){
							clearInterval(timerId);
							confirmString = '';
						}
						$('#email-confirm-wrapper span').text(count--);
					}, 1000);
				},
				error:function(xhr, status){
					console.log(status);
					alert('이메일 발송에 실패했습니다.');
				}
			});
		}
	});
	
	// 보낸 확인 번호와 사용자가 입력한 확인 번호를 비교
	$('#email-confirm-btn').click(function(){
		// 확인 번호가 빈칸이 아니고 현재 확인 중인 경우
		if(confirmString){
			// 양옆 빈칸을 제거해 준다
			const emailConfirm = $('#email-confirm').val().trim();
			// 같을 경우
			if(emailConfirm === confirmString){
				// 확인 결과를 email-confirm-hidden에 기록
				$('#email-confirm-hidden').val($('#email').val());
				// 타이머를 멈춤
				clearInterval(timerId);
				// 사용자에게 결과를 보여줌
				$('#email-confirm-wrapper span').text('OK');
				// confirmString 초기화
				confirmString = '';
			}
			else{
				alert('확인번호가 틀렸습니다.');
			}
		}
		else{
			alert('확인 번호 보내기를 해주세요.');
		}
	});
});