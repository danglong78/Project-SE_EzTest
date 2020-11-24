
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ----
$(document).ready(function(){

	$(".button-view").click( function(e){
		
		var theid = $(this).attr("id");
		// var theproducts = $("ul#products");
		

		
		if($(this).hasClass("active")) {
			// if currently clicked button has the active class
			// then we do nothing!
			return false;
		} else {
			// otherwise we are clicking on the inactive button
			// and in the process of switching views!

  			if(theid == "dashboard-btn") {
				$(this).addClass("active");
				$("#list-btn").removeClass("active");


				$(".quiz").addClass("row row-cols-2");
				$(".quiz").removeClass("list-group");
				$(".quiz .list-group-item").addClass(" col-sm-4");
				$(".quiz .list-group-item").removeClass("list-group-item");
				$(".quiz .list-group-item>p").addClass("card");



			}
			
			else if(theid == "list-btn") {
				$(this).addClass("active");
				$("#dashboard-btn").removeClass("active");
					
				
				// $(".quiz card card-header").removeClass("card-header");

				// $(".quiz card card-footer").removeClass("card-footer");
				$(".quiz").removeClass("row row-cols-2" );
				$(".quiz").addClass("list-group");
				$(".quiz .col-sm-4").addClass("list-group-item");
				$(".quiz .col-sm-4").removeClass("col-sm-4");
				$(".quiz .col-sm-4>p").removeClass("card");



			} 
		}

	});
});