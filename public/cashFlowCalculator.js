$("#btn").click(function(){
	var address = ($("#address").val());
	var price1 = ($("#price5").val());
	var principal = ($("#principal").val());
	var years = ($("#years").val());
	var rate = ($("#interest").val());


	var n = years*12;
	console.log(n);
	console.log(address);

	var absolute = rate/100/12;
// adjusted interest rate

	var mysterynumber = (Math.pow((1+absolute),n))
	console.log(mysterynumber)

	var top = (absolute*(Math.pow((1+absolute),n)))
	console.log(top)
	// top of formula 
	var bottom = (Math.pow((1+absolute),n)-1)
	console.log(bottom)

	financing = principal*(top/bottom);
	cashneeded = price1-principal;
	console.log(cashneeded);

	$("#result").val(financing.toFixed(2));
	$("#cashneeded").val(cashneeded.toFixed(2));

	return false

	var top = (absolute*(Math.pow((1+absolute),n)))
});

$("#btn2").click(function(e){
	var price = ($("#price5").val());
	var proptax = ($("#proptax").val());
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
	console.log(financing)
	
	var cashFlow = (rents-financing-utilities-water-insurance-maintenance-vacancy-mgmt);
	console.log(cashFlow);

	var annualCashFlows = 12*cashFlow;
	console.log(annualCashFlows);

	console.log(price);
	console.log(principal);
	var cashIn= price-principal;
	console.log(cashIn);
	
	cashOnCash = 100*annualCashFlows/(cashIn);
	capRate = 100*annualCashFlows/price;

	$("#result2").val(cashFlow.toFixed(2));
	$("#result3").val(annualCashFlows.toFixed(2));
	$("#result4").val(cashOnCash.toFixed(2));
	$("#result5").val(capRate.toFixed(2));
	$("#result").val(financing.toFixed(2));

	if(cashOnCash<5){
		$.notify({
			icon: 'ti-home',
			message: "Beware of this one.  You will likely lose money every month if you decide to buy this.  Don't rely on appreciation!"

		},{
			type: 'danger',
			timer: 6000
		});
	} else if(cashOnCash<20){
		$.notify({
			icon: 'ti-home',
			message: "Careful with this one.  It could be a great investment, but heavy maintenance expenditures or long vacancies could kill your investment."

		},{
			type: 'warning',
			timer: 6000
		});
	} else if(cashOnCash>20){
		$.notify({
			icon: 'ti-home',
			message: "This property could be a great buy. <br> Add this to your database, and always<br> get an inspection before you purchase!"

		},{
			type: 'success',
			timer: 6000
		});
	}

	// packaging the value for the variables
	console.log(address, price, cashIn, financing, proptax, insurance, rents, utilities, maintenance, cashFlow,cashOnCash,capRate);
	const obj = {address, price, cashIn, financing, proptax, insurance, rents, utilities, maintenance, cashFlow,cashOnCash,capRate}
	e.stopPropagation();
	$("#btn-add").click(function(e){

	
	});

	return false;

});

$("#btn-add").click(function(){

});

// $("#btn-add").click(function(e){
// 	e.preventDefault();
// 	combine()

// });

// function combine(data){
// 	console.log($('#paymentcalc, #cashflowcalc').serialize());

// 	$.ajax({
// 		type:"POST",
// 		url: "/add",
// 		data: $('#paymentcalc, #cashflowcalc').serialize() + $.param(data)
// 	});
// }



