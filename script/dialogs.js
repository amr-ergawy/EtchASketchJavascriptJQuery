var clearAllWarningDialog;
var clearAllWarningNextDialog = null;

var clearAll = function() {
	$(".board-cell").css('background-color', 'white');
}

var initClearAllWarningDialog = function() {
	console.log("started initiating clear-all warning dialog");

	clearAllWarningDialog = $("#clear-all-warning-dialog").dialog({
		autoOpen : false,
		// height : 350,
		width : 500,
		resizable: false,
		modal : true,
		buttons : {
			"Ok" : function() {
				clearAll();
				if (clearAllWarningNextDialog != null) {
					clearAllWarningNextDialog.dialog("open");
				}
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
			clearAllWarningNextDialog = null;
			console.log("close ...");
		}
	});

	console.log("finished initiating clear-all warning dialog");
}

var rows = 50;
var cols = 50;

var autoResizeDialog;

var initAutoResizeDialog = function() {
	console.log("started initiating auto resize dialog");

	autoResizeDialog = $("#auto-resize-dialog").dialog({
		autoOpen : false,
		// height : 350,
		width : 500,
		resizable: false,
		modal : true,
		buttons : {
			"Ok" : function() {
				var autoResizeRadio = $("input:radio[name ='auto-resize-radio']:checked").val();
				console.log('checked autoResizeRadio: '+autoResizeRadio);
				autoResize(autoResizeRadio);
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
			console.log("close ...");
		}
	});

	console.log("finished initiating auto resize dialog");
};

var customResizeDialog;

var initCustomResizeDialog = function() {
	console.log("started initiating custom resize dialog");

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

	customResizeDialog = $("#custom-resize-dialog").dialog({
		autoOpen : false,
		// height : 350,
		width : 500,
		resizable: false,
		modal : true,
		buttons : {
			"Ok" : function() {
				rows = rowsSpinner.val();
				cols = colsSpinner.val();
				console.log('attempting to apply board size: '+rows+', '+cols);
				applyBoardSize(rows, cols);
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
			console.log("close ...");
		}
	});

	console.log("finished initiating custom resize dialog");
};