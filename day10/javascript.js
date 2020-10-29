let lastCheck;

const checks = document.querySelectorAll('input[type="checkbox"]'); //'.inbox input[type="checkbox"]'

checks.forEach( check => check.addEventListener("click", handler) );

function handler(e) {
	if (e.shiftKey && lastCheck != null && lastCheck.checked ) {
		let isInBetween = false;
		checks.forEach( check => {
			if (check === lastCheck || check === this) {
				isInBetween = !isInBetween;
			}
			if (isInBetween) {
		    	check.checked = true;
			}
		} );
	}
	lastCheck = this;
}
