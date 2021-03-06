//JS and jQuery for RQ
$('document').ready(function(){


});

var StrictModeOn = false;
var GameStarted = false;
var SequenceCount = 00;
var ActiveGame = false;
var ColorArray = ['section1', 'section2', 'section3', 'section4'];
var ActiveArray = [];
var CurrentPlayerCount = 0;
var GettingPlayerInput = false;
var PlayerRightSoFar = false;

var sound1 = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
var sound2 = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
var sound3 ="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
var sound4 ="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
var errorSound = './js/no.mp3';


$('#on-off-btn').on('click', function(){
	if($(this).hasClass('btn-off-game')){
		$(this).removeClass('btn-off-game');
		$(this).text('ON');
		activateGame();
	} else {
		$(this).addClass('btn-off-game');
		$(this).text('OFF');
		deactivateGame();
	}
});

$('#start-btn').on('click', function(){
	if(ActiveGame){
		if(!$(this).hasClass('btn-start-on')){
			startGame($(this));
		} else {
			$(this).removeClass('btn-start-on');
			endGame($(this));
		}	
	}
	
});

$('#strict-btn').on('click', function(){
	if(ActiveGame){
		if(!$(this).hasClass('btn-strict-on')){
			enableStrictMode($(this));
		} else {
			disableStrictMode($(this));
		}
	}
});


$('span').on('click', function(){
	if(GettingPlayerInput){
		var clickedId = $(this).attr('id');
		$(this).fadeIn(100).fadeOut(100).fadeIn(100);
		if(clickedId === ActiveArray[CurrentPlayerCount]){
			playSound(clickedId);
			CurrentPlayerCount += 1;
			if(CurrentPlayerCount === 20){
				alert('You did it!');
				deactivateGame();
			}
			if(CurrentPlayerCount === ActiveArray.length){
				GettingPlayerInput = false;
				runSimonSequence();
			}
		} else {
			var sound = new Audio(errorSound);
			sound.play();
			CurrentPlayerCount = 0;
			if(StrictModeOn){
				ActiveArray = [];
				SequenceCount = 00;
				GettingPlayerInput = false;

				runSimonSequence();
			}
		}
	}
});


var activateGame = function(){
	ActiveGame = true;
}

var deactivateGame = function(){
	$('#on-off-btn').text('OFF').addClass('btn-off-game');
	disableStrictMode($('#strict-btn'));
	GameStarted = false;
	ActiveGame = false;
}

var startGame = function(startBtn){
	$(startBtn).addClass('btn-start-on');
	GameStarted = true;
	runSimonSequence();
}
var endGame = function(startBtn){
	$(startBtn).removeClass('btn-start-on');
	GameStarted = false;
	resetGame();
}

var enableStrictMode = function(strictBtn){
	$(strictBtn).addClass('btn-strict-on');
	$('#start-btn').removeClass('btn-start-on');
	resetCounter();
	StrictModeOn = true;
	GameStarted = false;
	SequenceCount = 00;
	ActiveArray = [];
	CurrentPlayerCount = 0;
	GettingPlayerInput = false;
}

var disableStrictMode = function(strictBtn){
	$(strictBtn).removeClass('btn-strict-on');
	StrictModeOn = false;
	resetGame();
}

var resetCounter = function(){
	$('#count-display').html('00');
}

var runSimonSequence = function(){
	if(ActiveGame){
		SequenceCount += 1;
		$('#count-display').html(SequenceCount);
		var nextColor = getRandomInt();
		nextColor = ColorArray[nextColor];
		ActiveArray.push(nextColor);
		var speed;
		if (SequenceCount > 13){
			speed = 450;
		} else if (SequenceCount > 7){
			speed = 600;
		} else {
			speed = 800;
		}
		var counter = 0;
		function animateSection(){
			setTimeout(function(){
				playSound(ActiveArray[counter]);
				$('#' + ActiveArray[counter]).fadeIn(300).fadeOut(300).fadeIn(300);
				counter++;
				if(counter < ActiveArray.length){
					animateSection();
				}	
			}, speed);
		}
		animateSection();

		GettingPlayerInput = true;
		CurrentPlayerCount = 0;
	}
	
}

var getRandomInt = function(){
	var randomInt = Math.floor(Math.random() * (3 - 0 + 1) + 0);
	return randomInt;
}

var resetGame = function(){
	resetCounter();
	$('#start-btn').removeClass('btn-start-on');
	StrictModeOn = false;
	GameStarted = false;
	SequenceCount = 00;
	ActiveArray = [];
	CurrentPlayerCount = 0;
	GettingPlayerInput = false;
}


var playSound = function(section){
	var sectionNumber = section[section.length-1];
	var audio;
	switch(sectionNumber){
		case "1":
			audio = new Audio(sound1);
			break;
		case "2":
			audio = new Audio(sound2);
			break;
		case "3":
			audio = new Audio(sound3);
			break;
		case "4":
			audio = new Audio(sound4);
			break;
		default:
			audio = new Audio(sound1);
			break;
	}
	audio.play();
}