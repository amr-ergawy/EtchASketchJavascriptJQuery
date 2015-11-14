var loadColorPicker = function() {

	var updateColor = function(event, ui) {
		$("#color-picker-viewer").css("background-color", "hsl(0, 0%, "+ui.value+"%)");
	};

	$("#color-picker-slider").slider({
		min: 1,
		max: 100,
		value: 50,
		slide: updateColor,
		change: choosePen
	});
};
