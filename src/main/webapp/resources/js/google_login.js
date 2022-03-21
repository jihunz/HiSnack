const onClickGoogleLogin = (e) => {
    	//구글 인증 서버로 인증코드 발급 요청
 		window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?
	client_id=154631232160-ms9nmt9aggc9dgl6625fb0dij3sdhsb2.apps.googleusercontent.com&
	redirect_uri=http://localhost:9080/login/google&
	response_type=code&
	scope=email%20profile%20openid&
	access_type=offline`);
}

/*function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}*/

$(function(){
	$('#googleLoginBtn').click(onClickGoogleLogin);
});