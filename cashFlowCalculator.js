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
});

$("#btn2").click(function(){
	console.log("hello");
	var price = ($("#price5").val());

	var rents = ($("#rents").val());
	var utilities = ($("#utilities").val());
	var water = ($("#water").val());
	var insurance = ($("#ins").val());
	var maintenance = ($("#maintenance").val());
	var principal = ($("#principal").val());
	var vacancy = rents/12;

	var expenses = (utilities+water);
	console.log(expenses)
	console.log(water);
	console.log(insurance);
	console.log(maintenance);
	console.log(vacancy); 
	
	var cashFlows = (rents-utilities-water-insurance-maintenance-vacancy);
	console.log(cashFlows);

	var annualCashFlows = 12*cashFlows;
	console.log(annualCashFlows);

	console.log(price);
	console.log(principal);
	var cashIn= price-principal;
	console.log(cashIn);
	
	cashOnCash = annualCashFlows/(cashIn);
	capRate = annualCashFlows/price;

	$("#result2").html(cashFlows.toFixed(2));
	$("#result3").html(annualCashFlows.toFixed(2));
	$("#result4").html(cashOnCash.toFixed(2));
	$("#result5").html(capRate.toFixed(2));
	// $("#result").html(payment.toFixed(2));

});