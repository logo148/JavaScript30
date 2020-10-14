const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
	let sizing = this.dataset.sizing || "";
	document.documentElement.style.setProperty(`--${this.name}`, this.value + sizing);
}

inputs.forEach(input => input.addEventListener("change", handleUpdate));
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate));