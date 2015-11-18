const TOOL_NONE = 0;
const TOOL_PEN = 1;
const TOOL_ERASER = 2;

var activeTool = TOOL_NONE;
var clickMouseButtonDown = false;

var choosePen = function() {
	// console.log("choosing pen");
	$('body').css('cursor', 'pointer');
	activeTool = TOOL_PEN;
}

var chooseEraser = function() {
	// console.log("choosing eraser");
	$('body').css('cursor', 'cell');
	activeTool = TOOL_ERASER;
}

var chooseNoTool = function() {
	// console.log("choosing no tool");
	$('body').css('cursor', 'auto');
	activeTool = TOOL_NONE;
}

var applyTool = function(gridCell) {
	switch(activeTool) {
		case TOOL_PEN:
			gridCell.css('background-color', color);
			break;
		case TOOL_ERASER:
			gridCell.css('background-color', 'white');
			break;
		default:
			// TOOL_NONE, do no thing.
	}
}

var initTools = function() {
	console.log('started initiating tools');

	$("#pen-button").on("click", function(event) {
		event.preventDefault();
		choosePen();
	});

	$("#eraser-button").on("click", function(event) {
		event.preventDefault();
		chooseEraser();
	});

	$("#clear-all-button").on("click", function(event) {
		event.preventDefault();
		chooseNoTool();
		clearAllWarningDialog.dialog("open");
	});

	$("#auto-resize-button").on("click", function(event) {
		event.preventDefault();
		chooseNoTool();
		clearAllWarningNextDialog = autoResizeDialog;
		clearAllWarningDialog.dialog("open");
	});

	$("#manual-resize-button").on("click", function(event) {
		event.preventDefault();
		chooseNoTool();
		clearAllWarningNextDialog = manualResizeDialog;
		clearAllWarningDialog.dialog("open");
	});

	$("body").mousedown(function(event) {
		// Logging is only enabled for debugging.
		// console.log("button down: "+event.button);
		if (event.button == 0) {
			event.preventDefault();
			// on left-hand mouse configs, the values are inverted.
			clickMouseButtonDown = true;
		}
	});

	$("body").mouseup(function(event) {
		// Logging is only enabled for debugging.
		// console.log("button up: "+event.button);
		if (event.button == 0) {
			event.preventDefault();
			// on left-hand mouse configs, the values are inverted.
			clickMouseButtonDown = false;
		}
	});

	console.log('finished initiating tools');
}

var initBoardCellMouseHandler = function() {
	console.log('started initiating board-cell mouse handlers');

	$(".board-cell").mouseover(function(event) {
		event.preventDefault();
		if (clickMouseButtonDown) {
			// on left-hand mouse configs, the values are inverted.
			applyTool($(this));
		}
	});

	$(".board-cell").click(function(event) {
		event.preventDefault();
		if (event.button == 0) {
			// on left-hand mouse configs, the values are inverted.
			applyTool($(this));
		}
	});

	console.log('finished initiating board-cell mouse handlers');
}
