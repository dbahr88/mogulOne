$("#btn").click(function(){
	var principal = ($("#principal").val());
	var years = ($("#years").val());
	var rate = ($("#interest").val());

	var n = years*12;
	console.log(n);

	var absolute = rate/100/12;
// adjusted interest rate


	var mysterynumber = (Math.pow((1+absolute),n))
	console.log(mysterynumber)

	var top = (absolute*(Math.pow((1+absolute),n)))
	console.log(top)
	// top of formula 
	var bottom = (Math.pow((1+absolute),n)-1)
	console.log(bottom)


	payment = principal*(top/bottom);

	$("#result").html(payment.toFixed(2));

	var top = (absolute*(Math.pow((1+absolute),n)))

})

