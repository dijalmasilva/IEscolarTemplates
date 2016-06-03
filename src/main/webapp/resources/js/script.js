
$(function(){

	
	$(".maxlength").keyup(function(event){

		var target	= $("#content-countdown");
		var max		= target.attr('title');

		var len 	= $(this).val().length;
		
		var remain	= max - len;

		if(len > max)
		{
			var val = $(this).val();
			$(this).val(val.substr(0, max));
			
			remain = 0;
		}

		target.html(remain);
		
	});

});
