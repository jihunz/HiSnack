$(function() {
	$('#user-dropdown').hide();

	$('#user-btn').click(function(e){
		const dropdown = $('#user-dropdown');
		
		
		
		dropdown.css({
			left:`${e.clientX + 10}px`,
			top:`${e.clientY + 10}px`
		});
		
		// 화면의 크기
		const screenWidth = window.innerWidth;
		// 요소의 위치
		const elemX = dropdown[0].getBoundingClientRect().right;
		
		if(screenWidth < elemX){
			dropdown.css({
				left:`${e.clientX + 10 - dropdown[0].getBoundingClientRect().width}px`,
				top:`${e.clientY + 10}px`
			});
			
			console.log(dropdown[0].getBoundingClientRect().width);
		}
		
		dropdown.toggle();
	});
	
	$(`.menubtn`).click(function(){
		$(this).toggleClass('active');
	
		$(`.menefont`).toggleClass('active');
	})
	
});