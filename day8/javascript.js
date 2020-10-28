const canvas = document.getElementById("draw");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth*0.9;
canvas.height = window.innerHeight*0.9;
ctx.lineWidth = 100;
ctx.lineJoin = "round";
ctx.lineCap = "round";

let x = 0;
let y = 0;

let isDrawing = false;
let hue = 300;
let lineWidthChangeTrend = true;

let mouseButton = 0; //按下的是滑鼠按鍵

function draw(e) {
	if (!isDrawing) return;
console.log(ctx.lineWidth);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	x = e.offsetX;
	y = e.offsetY;

	hue++;
	if (hue >= 360) {
		hue = 0;
	}

	if (mouseButton == 1) return; //按下的是中鍵就不改變線寬

	if (ctx.lineWidth >= 100 || ctx.lineWidth <=1) {
		lineWidthChangeTrend = !lineWidthChangeTrend;
	}
	
	if(lineWidthChangeTrend) {
		ctx.lineWidth+=0.6;
	} else {
		ctx.lineWidth-=0.6;
	}


}

canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	x = e.offsetX;
	y = e.offsetY;
	mouseButton = e.button; //按下的滑鼠按鍵
});
canvas.addEventListener("mouseup", () => isDrawing = false);

canvas.addEventListener("mouseout", () => isDrawing = false);

canvas.addEventListener("mousemove", draw);

// canvas.addEventListener("click", () => window.location = canvas.toDataURL("image/png"));