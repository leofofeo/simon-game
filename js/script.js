//JS and jQuery for RQ
$('document').ready(function(){


});

var StrictMode = false;
var Start = false;
var SequenceCount = 00;
var ActiveGame = false;


$('#on-off-btn').on('click', function(){
	if($(this).hasClass('btn-off')){
		$(this).removeClass('btn-off');
		$(this).text('ON');
		ActivateGame();
	} else {
		$(this).addClass('btn-off');
		$(this).text('OFF');
		DisactivateGame();
	}
});




var ActivateGame = function(){}

var DisactivateGame = function(){}