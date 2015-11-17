var rows = 50;
var cols = 50;
var dialog;

var initBoardTesterDialog = function() {
	console.log("started initiating board tester dialog");
	
	$(".spinner").bind("keydown", function (event) {
		event.preventDefault();
	});
	
	var spinnerOptions = {
		icons: { up: "ui-icon-plus", down: "ui-icon-minus"},
		min: 10, max: 100
	};
	
	var rowsSpinner = $("#rowsSpinner");
	var colsSpinner = $("#colsSpinner");
	
	rowsSpinner.spinner(spinnerOptions);
	colsSpinner.spinner(spinnerOptions);
	
	var applyBoardSize = function () {
		rows = rowsSpinner.val();
		cols = colsSpinner.val();
		console.log('applying board size: '+rows+', '+cols);
	};
	
	dialog = $("#board-tester-dialog").dialog({
		autoOpen : false,
		// height : 350,
		width : 500,
		resizable: false,
		modal : true,
		buttons : {
			"Ok" : function() {
				applyBoardSize();
				dialog.dialog("close");
			},
			Cancel : function() {
				dialog.dialog("close");
			}
		},
		close : function() {
			console.log("close ...");
			form[0].reset();
		}
	});
	
	var form = dialog.find("form").on("submit", function(event) {
		event.preventDefault();
		applyBoardSize();
	});
	
	console.log("finished initiating dialog");
};

var loadBoardTesterDialog = function() {
	console.log('started loading form');

	initBoardTesterDialog();

	$("#tester-button").on("click", function(event) {
		event.preventDefault();
		chooseNoTool();
		console.log("openning dialog");
		dialog.dialog("open");
	});

	console.log('finished loading form');
}
