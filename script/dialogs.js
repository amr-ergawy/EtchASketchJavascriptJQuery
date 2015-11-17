var rows = 50;
var cols = 50;
var boardTesterDialog;

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
	
	boardTesterDialog = $("#board-tester-dialog").dialog({
		autoOpen : false,
		// height : 350,
		width : 500,
		resizable: false,
		modal : true,
		buttons : {
			"Ok" : function() {
				applyBoardSize();
				boardTesterDialog.dialog("close");
			},
			Cancel : function() {
				boardTesterDialog.dialog("close");
			}
		},
		close : function() {
			console.log("close ...");
		}
	});
	
	console.log("finished initiating board tester dialog");
};

var loadBoardTesterDialog = function() {
	console.log('started loading board tester dialog');

	initBoardTesterDialog();

	$("#tester-button").on("click", function(event) {
		event.preventDefault();
		chooseNoTool();
		console.log("openning dialog");
		boardTesterDialog.dialog("open");
	});

	console.log('finished loading board tester dialog');
}
