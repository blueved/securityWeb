function resizeContent(){
	var w = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	var h = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		
	$('#content').height(h-150).width(w-150);
}