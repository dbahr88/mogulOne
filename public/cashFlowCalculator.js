$("#btn").click(function(){
	var price1 = ($("#price5").val());
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
	cashneeded = price1-principal;
	console.log(cashneeded);

	$("#result").val(payment.toFixed(2));
	$("#cashneeded").val(cashneeded.toFixed(2));

	return false

	var top = (absolute*(Math.pow((1+absolute),n)))
});

$("#btn2").click(function(){
	var price = ($("#price5").val());

	var rents = ($("#rents").val());
	var utilities = ($("#utilities").val());
	var water = ($("#water").val());
	var insurance = ($("#ins").val());
	var maintenance = ($("#maintenance").val());
	var principal = ($("#principal").val());
	var principal = ($("#principal").val());
	var mgmt = ($("#mgmt").val());
	var vacancy = rents/12;

	var expenses = (utilities+water);
	console.log(expenses)
	console.log(water);
	console.log(insurance);
	console.log(maintenance);
	console.log(vacancy); 
	
	var cashFlows = (rents-utilities-water-insurance-maintenance-vacancy-mgmt);
	console.log(cashFlows);

	var annualCashFlows = 12*cashFlows;
	console.log(annualCashFlows);

	console.log(price);
	console.log(principal);
	var cashIn= price-principal;
	console.log(cashIn);
	
	cashOnCash = 100*annualCashFlows/(cashIn);
	capRate = 100*annualCashFlows/price;

	$("#result2").val(cashFlows.toFixed(2));
	$("#result3").val(annualCashFlows.toFixed(2));
	$("#result4").val(cashOnCash.toFixed(2));
	$("#result5").val(capRate.toFixed(2));
	$("#result").val(payment.toFixed(2));

	if(cashOnCash<.1){
		$.notify({
			icon: 'ti-home',
			message: "Beware of this one.  You will likely lose money every month if you decide to buy this.  Don't rely on appreciation!"

		},{
			type: 'danger',
			timer: 6000
		});
	} else if(cashOnCash<.2){
		$.notify({
			icon: 'ti-home',
			message: "Careful with this one.  It could be a great investment, but heavy maintenance expenditures or long vacancies could kill your investment."

		},{
			type: 'warning',
			timer: 6000
		});
	} else if(cashOnCash>.2){
		$.notify({
			icon: 'ti-home',
			message: "This property could be a great buy. <br> Add this to your database, and always<br> get an inspection before you purchase!"

		},{
			type: 'success',
			timer: 6000
		});
	}

	// packaging the value for the variables
	console.log(cashFlows,annualCashFlows,cashOnCash,capRate)
	const obj = {cashFlows,annualCashFlows,cashOnCash,capRate}


	$("#btn-add").click(function(e){
		e.preventDefault();
		combine(obj)
	
	});
	return false;

});


function combine(data){
	console.log($('#paymentcalc, #cashflowcalc').serialize());

	$.ajax({
		type:"POST",
		url: "/add",
		data: $('#paymentcalc, #cashflowcalc').serialize() + $.param(data),
		success: function (result) {
			console.log(result);
			}
	});
}



