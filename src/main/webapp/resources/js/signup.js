$(function() {
	$("#signupBtn").click((e) => {
        chkNull(e);
    });
});

function chkNull(e) {
   const inputNum = $("form input").length

    for(let i=1; i<=inputNum; i++) {
        let nthLabel = $(`form > div:nth-child(${i}) > label`);
        let nthInput = $(`form > div:nth-child(${i}) > input`);
		let inputType = $(nthLabel).text();

        if(typeof $(nthInput).val() == "undefined"|| $(nthInput).val() == null || $(nthInput).val() == "") {
            e.preventDefault();
            alert(`${inputType}를 입력해주세요`);
            return;
        }
    }
}