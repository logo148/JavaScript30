const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const today = document.querySelector(".date");

function setDate() {
	let now = new Date();

	let seconds = now.getSeconds();
	let secondsDegrees = seconds*6 + 90;
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

	let minutes = now.getMinutes();
	let minutesDegrees = minutes*6 + seconds*0.1 + 90;
	minHand.style.transform = `rotate(${minutesDegrees}deg)`;

	let hours = now.getHours();
	let hoursDegrees = hours*30 + minutes*0.5 + seconds/120 + 90;
	hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

	let date = now.getDate();
	today.innerHTML = date;
}

setDate();
setInterval(setDate, 1000);



