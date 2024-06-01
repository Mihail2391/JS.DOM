const slider = document.querySelector(".slider");
const sliderThumb = document.querySelector(".slider-thumb");
const sliderValue = document.querySelector(".slider-value");
let isdragging = false;
sliderThumb.addEventListener("mousedown", function () {
	isdragging = true;
	console.log(isdragging);

	document.addEventListener("mousemove", onMouseMove);

	document.addEventListener(
		"mouseup",
		function () {
			isdragging = false;
			console.log(isdragging);

			document.removeEventListener("mousemove", onMouseMove);
		},
		{
			once: true,
		}
	);
});

function onMouseMove(event) {
	if (!isdragging) return;
	const sliderRect = slider.getBoundingClientRect();
	let newLeft = event.clientX - sliderRect.left - sliderThumb.offsetWidth / 2;

	const rightEdge = slider.offsetWidth - sliderThumb.offsetWidth;
	if (newLeft < 0) {
		newLeft = 0;
	} else if (newLeft > rightEdge) {
		newLeft = rightEdge;
	}

	const step = rightEdge / 5;
	const stepIndex = Math.round(newLeft / step);
	newLeft = stepIndex * step;

	sliderThumb.style.left = newLeft + "px";
	updateSliderValue(stepIndex * 20);
}

function updateSliderValue(value) {
	sliderValue.textContent = value;
	sliderValue.style.left = sliderThumb.style.left;
}
