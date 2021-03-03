$(document).ready(function(){

	$(".nextbtn").click(function(){
		var srcString = $(this).prev().children().attr("src").substring(17,23);
		var nowNum = parseInt(srcString[5]);
		var maxNum = parseInt(srcString[3]);
		var picName = srcString.substring(0,2);
		if(nowNum == maxNum){
			nowNum = 0;
		}
		nowNum++;
		$(this).prev().children().attr("src","images/portfolio/" + picName + "_" + maxNum + "-" + nowNum + ".jpg");
	})
	$(".prevbtn").click(function(){
		var srcString = $(this).next().children().attr("src").substring(17,23);
		var nowNum = parseInt(srcString[5]);
		var maxNum = parseInt(srcString[3]);
		var picName = srcString.substring(0,2);
		if(nowNum == 1){
			nowNum = maxNum+1;
		}
		nowNum--;

		$(this).next().children().attr("src","images/portfolio/" + picName + "_" + maxNum + "-" + nowNum + ".jpg");
	})

	$(".portfoliopics").click(function(){
		$("#fullsizepic").attr("src", $(this).attr("src"));
		$(".largerpic").css({"display":"block"});
	});

	$(".largerpic").click(function(){
		$(this).css({"display":"none"});
	});

});





