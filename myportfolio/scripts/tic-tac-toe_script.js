window.onload = function() {

	var user = "user";
	var computer = "computer";
	var none = "none";
	var deskSize = 90;
	var border = 10;
	var isMyTurn = false;

	var allDesks = [{id: "a0",status: none},{id: "a1",status: none},{id: "a2",status: none},{id: "b0",status: none},{id: "b1",status: none},{id: "b2",status: none},{id: "c0",status: none},{id: "c1",status: none},{id: "c2",status: none}];
	var allCases = [
		{
			case: [0, 1, 2],
			user: 0,
			computer: 0,
			priority: 0
		},
		{
			case: [0, 4, 8],
			user: 0,
			computer: 0,
			priority: 0
		},
		{
			case: [0, 3, 6],
			user: 0,
			computer: 0,
			priority: 0
		},
		{
			case: [1, 4, 7],
			user: 0,
			computer: 0,
			priority: 0
		},
		{
			case: [2, 4, 6],
			user: 0,
			computer: 0,
			priority: 0
		},
		{
			case: [2, 5, 8],
			user: 0,
			computer: 0,
			priority: 0
		},
		{
			case: [3, 4, 5],
			user: 0,
			computer: 0,
			priority: 0
		},
		{
			case: [6, 7, 8],
			user: 0,
			computer: 0,
			priority: 0
		},
	];

	var message = document.getElementById("messagearea");
	var canvas = document.querySelectorAll(".draw");
	var lineCanvas = document.querySelector("#winnerLine");
	canvas.forEach( canva => canva.addEventListener("click", userRound, false) );
	message.addEventListener("click", reset, false);
	lineCanvas.addEventListener("click", reset, false);
	reset();

	function reset() {
		if (!result()) {
			isMyTurn = false;
		}
		for (var i = 0; i < 9; i++) {
			allDesks[i].status = none;
		}
		for (var i = 0; i < 8; i++) {
			allCases[i].user = 0;
			allCases[i].computer = 0;
			allCases[i].priority = 0;
		}
		message.innerHTML = "Tic-Tac-Toe";
		canvas.forEach( canva => clearCanvas(canva) );
		clearCanvas(lineCanvas);
		lineCanvas.style.setProperty("z-index", "0");
		isMyTurn = !isMyTurn;
		if (isMyTurn) return;
		setTimeout(computerRound, 200);
	}

	function userRound() {
		var player = user;
		var index = idTransIndex(this.id);
		if (!isMyTurn) return;
		if (allDesks[index].status == none){
		drawCircle(this);
		refreshallCases(player, index);
		if (result()) {
			return;
		} 
			isMyTurn = !isMyTurn;
			setTimeout(computerRound, 200);
		}
		 return;
	}

	function computerRound() {
		var player = computer;
		var index = computerChoose();
		var desk = document.getElementById(allDesks[index].id);
		drawCross(desk);
		refreshallCases(player, index);
		if (result()) {
			return;
		} 
		isMyTurn = !isMyTurn;
	}

	function computerChoose() {
		var caseCandidate = [];
		var maxpriority = 0;
		var r;
		for (var i = 0; i < allCases.length ; i++) {
			if (allCases[i].priority >= maxpriority) {
				maxpriority = allCases[i].priority;
			}
		}
		for (var i = 0; i < allCases.length ; i++) {
			if (allCases[i].priority == maxpriority) {
				caseCandidate.push.apply(caseCandidate, allCases[i].case);
			}
		}
		do {
			r = random(caseCandidate.length);
		}
		while(allDesks[caseCandidate[r]].status != none);
		return caseCandidate[r];
	}

	function refreshallCases(player, index) {
		allDesks[index].status = player;
		for (var i = 0; i < allCases.length; i++) {
			if( allCases[i].case.indexOf(index) >= 0 ) {
				allCases[i][player]++;
			}
		}
		for (var i = 0; i < allCases.length; i++) {
			allCases[i].priority = priorityCalc(allCases[i].user, allCases[i].computer);
		}
	}

	function priorityCalc(a, b) {
		return ((b+1)*(0.5*b-2*a*(2-a))+a+2)*(1-0.5*a*b*(a-1));
	}

	function result() {
		var statusArray = statusTransArray(allDesks);
		var statusArrayOne = [];
		var start = [];
		var end = [];
		var winner; 

		for (var i = 0; i < 9; i++) {
			statusArrayOne.push(allDesks[i].status);
		}
		for (var i = 0; i < 3; i++) {
			if ( (statusArray[i][0] == statusArray[i][1]) && (statusArray[i][1] == statusArray[i][2]) && (statusArray[i][2] != none) ) {
				start = [0, (deskSize * 0.5) + (deskSize + border) * i];
				end = [(deskSize * 3) + border * 2, (deskSize * 0.5) + (deskSize + border) * i];
				winner = statusArray[i][0];
				break;
			}
		}
		for (var i = 0; i < 3; i++) {
			if ( (statusArray[0][i] == statusArray[1][i]) && (statusArray[1][i] == statusArray[2][i]) && (statusArray[2][i] != none) ) {
				start = [(deskSize * 0.5) + (deskSize + border) * i, 0];
				end = [(deskSize * 0.5) + (deskSize + border) * i, (deskSize * 3) + border * 2];
				winner = statusArray[0][i];
				break;
			}
		}
		if ( (statusArray[0][0] == statusArray[1][1]) && (statusArray[1][1] == statusArray[2][2]) && (statusArray[2][2] != none) ) {
			start = [deskSize*0.1, deskSize*0.1];
			end = [(deskSize * 2.9) + border * 2, (deskSize * 2.9) + border * 2];
			winnerLine(start, end, winner);
			winner = statusArray[0][0];
		} else if ( (statusArray[2][0] == statusArray[1][1]) && (statusArray[1][1] == statusArray[0][2]) && (statusArray[0][2] != none) ) {
			start = [deskSize*0.1, (deskSize * 2.9) + border * 2];
			end = [(deskSize * 2.9) + border * 2, deskSize*0.1];
			winner = statusArray[2][0];
		}
		if (winner == user) {
			message.innerHTML = "You Win!";
			winnerLine(start, end, winner);
		} else if (winner == computer) {
			message.innerHTML = "You Lose!";
			winnerLine(start, end, winner);
		} else if (statusArrayOne.indexOf(none) >= 0) {
			return false;
		} else {
			message.innerHTML = "No Winner";
		}
		lineCanvas.style.setProperty("z-index", "1");
		return true;
	}

	function drawCircle(desk) {
		var context = desk.getContext("2d");
		context.lineWidth = deskSize*0.15;
		context.strokeStyle = "rgba(179, 30, 24, 0.9)";
		context.lineCap = "round";
		context.beginPath();
		context.arc(desk.width*0.5, desk.height*0.5, desk.width*0.3, (0 * Math.PI)/180, (360 * Math.PI)/180, true);
		context.stroke();
	}

	function drawCross(desk) {
		var context = desk.getContext("2d");
		context.lineWidth = deskSize*0.15;
		context.strokeStyle = "rgba(34, 101, 144, 0.9)";
		context.lineCap = "round";
		context.beginPath();
		context.moveTo(desk.width*0.75, desk.height*0.25);
		context.lineTo(desk.width*0.25, desk.height*0.75);
		context.stroke();
		context.beginPath();
		context.moveTo(desk.width*0.25, desk.height*0.25);
		context.lineTo(desk.width*0.75, desk.height*0.75);
		context.stroke();
	}

	function winnerLine(start, end, winner) {
		var context = lineCanvas.getContext("2d");
		context.lineWidth = deskSize*0.2;
		if (winner == user) {
			context.strokeStyle = "rgb(179, 30, 24)";
		} else {
			context.strokeStyle = "rgb(34, 101, 144)";
		}
		context.lineCap = "butt";
		context.beginPath();
		context.moveTo(start[0], start[1]);
		context.lineTo(end[0], end[1]);
		context.stroke();
	}

	function clearCanvas(canvas) {
		var context = canvas.getContext("2d");
		context.clearRect(0,0,canvas.width,canvas.height); 
	}

	function statusTransArray() {
		var statusArray = [[],[],[]];
		var index = 0;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++){
				statusArray[i][j] = allDesks[index].status;
				index++;
			}
		}
		return statusArray;
	}

	function idTransIndex(id) {
		var idArray = [];
		for (var i = 0; i < allDesks.length; i++) {
			idArray.push(allDesks[i].id);
		}
		return idArray.indexOf(id);
	}

	function random(n) {
		return Math.floor(Math.random() * n);
	}


};










