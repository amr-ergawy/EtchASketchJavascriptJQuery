const MIN_ROWS = 5;
const MIN_COLS = 5;

const MAX_ROWS = 100;
const MAX_COLS = 100;

const DEFAULT_ROWS = 10;
const DEFAULT_COLS = 10;

var rows;
var cols;

$(document).ready(function() {
	handleDocumentReady();
});

var handleDocumentReady = function () {
	console.log('handling document-ready ...');

	loadCachedVerifiedBoardSize();

	applyBoardSize(rows, cols);

	initClearAllWarningDialog();

	initAutoResizeDialog();

	initCustomResizeDialog();

	initTools();

	enableOnBeforeUnload();

	console.log('handled document-ready');
}

const rowsCookie = "rows";
const colsCookie = "cols";

var loadCachedVerifiedBoardSize = function() {

	var cachedRows = getCookie(rowsCookie);
	var cachedCols = getCookie(colsCookie);

	if (cachedRows == "" || cachedCols == "") {
		rows = 40;
		cols = 80;
	} else {
		rows = cachedRows;
		cols = cachedCols;
	}

	console.log("loaded cached-verified-board-size: "+rows+"X"+cols);
}

var applyBoardSize = function (paramRows, paramCols) {

	verifyAndCacheBoardSize(paramRows, paramCols);

	calcBoardVirtualDims();

	boardLayout();

	initBoardCellMouseHandler();
}

var verifyAndCacheBoardSize = function(paramRows, paramCols) {

	verifyBoardSize(paramRows, paramCols);

	updateCachedVerifiedBoardSize();
}

var verifyBoardSize = function(paramRows, paramCols) {
	rows = paramRows;
	cols = paramCols;

	console.log('verifying board size with (rows, cols) = ('+rows+', '+cols+')');

	if (rows < MIN_ROWS || cols < MIN_COLS ||
		rows > MAX_ROWS || cols > MAX_COLS) {
		alert('Board size is out of reach, changing to default '+
				DEFAULT_ROWS+'x'+DEFAULT_COLS+'.'+
				' You can choose another size.');
		rows = DEFAULT_ROWS;
		cols = DEFAULT_COLS;
	}

	console.log('board will be layedout with (rows, cols) = ('+rows+', '+cols+')');
}

var updateCachedVerifiedBoardSize = function () {

	deleteCookie(rowsCookie);
	deleteCookie(colsCookie);

	setCookie(rowsCookie, rows, 1);
	setCookie(colsCookie, cols, 1);

	console.log("updated cached-verified-board-size: "+rows+"X"+cols);
}

var MAX_BOARD_WIDTH_VIRTUAL_UNITS;
var MAX_BOARD_HEIGHT_VIRTUAL_UNITS;

var BOARD_WIDTH_PERCENT;
var BOARD_HEIGHT_PERCENT;

var windowInnerAspectRatio = 1;

var calcWindowInnerAspectRatio = function() {
	/*
	 * The calculation here use the window inner dimensions as an approximation
	 * of the relation among the width and height.
	 */

	console.log('window inner dims: '+window.innerWidth+"x"+window.innerHeight)
	windowInnerAspectRatio = window.innerWidth/window.innerHeight;
	console.log('window inner aspect-ration: '+windowInnerAspectRatio);
}

var calcBoardVirtualDims = function() {

	calcWindowInnerAspectRatio();

	MAX_BOARD_WIDTH_VIRTUAL_UNITS = 90; // Initialization maps to real percentage of 90%.
	MAX_BOARD_HEIGHT_VIRTUAL_UNITS = 90; // Initialization maps to real percentage of 90%.

	if (windowInnerAspectRatio > 1) {
		// The window width is larger than its height.
		MAX_BOARD_WIDTH_VIRTUAL_UNITS = MAX_BOARD_WIDTH_VIRTUAL_UNITS*windowInnerAspectRatio;
	} else if (windowInnerAspectRatio < 1) {
		// The window height is larger than its width.
		MAX_BOARD_HEIGHT_VIRTUAL_UNITS = MAX_BOARD_HEIGHT_VIRTUAL_UNITS/windowInnerAspectRatio;
	} else {
		// windowInnerAspectRatio == 1, do no thing.
	}

	console.log('maximum board dims in virtual units: '+MAX_BOARD_WIDTH_VIRTUAL_UNITS+'x'+MAX_BOARD_HEIGHT_VIRTUAL_UNITS);

	var cellVirtualWidth = MAX_BOARD_WIDTH_VIRTUAL_UNITS/cols;
	var cellVirtualHeight = MAX_BOARD_HEIGHT_VIRTUAL_UNITS/rows;

	if (cellVirtualWidth > cellVirtualHeight) {
		cellVirtualWidth = cellVirtualHeight;
	} else {
		cellVirtualHeight = cellVirtualWidth;
	}

	console.log('cell dims in virtual units: '+cellVirtualWidth+'x'+cellVirtualHeight);

	BOARD_WIDTH_PERCENT = cols*cellVirtualWidth;
	BOARD_HEIGHT_PERCENT = rows*cellVirtualHeight;

	if (windowInnerAspectRatio > 1) {
		BOARD_WIDTH_PERCENT = BOARD_WIDTH_PERCENT/windowInnerAspectRatio;
	} else if (windowInnerAspectRatio < 1) {
		BOARD_HEIGHT_PERCENT = BOARD_HEIGHT_PERCENT*windowInnerAspectRatio;
	} else {
		// windowInnerAspectRatio == 1, do no thing.
	}

	console.log("board dims in percentage: "+BOARD_WIDTH_PERCENT+"x"+BOARD_HEIGHT_PERCENT);
}

const logDims = false;

const ONE_SIDE_MARGIN = 0.2; // TODO perhaps get this value programmatically.

var rowHeight;
var colWidth;

var boardLayout = function() {

	console.log('starting board layout');

	rowHeight = BOARD_HEIGHT_PERCENT/rows;
	colWidth = (100-(ONE_SIDE_MARGIN*cols))/cols; // (100-(ONE_SIDE_MARGIN*cols))/cols;

	console.log('row-height: '+rowHeight+', col-width: '+colWidth);

	var board = document.getElementById("content");

	while(board.hasChildNodes()){
		board.removeChild(board.firstChild);
	}

	var boardRowNode;
	for (var i = 0; i < rows; i++) {
		if (logDims) console.log('adding row: '+i);
		boardRowNode = createBoardRow();
		board.appendChild(boardRowNode);
	}

	console.log('done with board layout');
}

var createBoardRow = function() {

	var divNode;

	divNode = document.createElement("div");
	divNode.className = "board-row";
	divNode.style.width = BOARD_WIDTH_PERCENT+"%";
	divNode.style.height = rowHeight+"%";

	if (logDims) console.log(divNode.style.width+', '+divNode.style.height);


	var boardCellDivNode;
	for (var i = 0; i < cols; i++) {
		if (logDims)  console.log('adding col: '+i);
		boardCellDivNode = createBoardCell();
		divNode.appendChild(boardCellDivNode);
	}

	return divNode;
}

const cellHeight = 100 - ONE_SIDE_MARGIN; //  Of its parent row height.

var createBoardCell = function() {

	var divNode;

	divNode = document.createElement("div");
	divNode.className = "board-cell";

	divNode.style.width = colWidth+"%";
	divNode.style.height = cellHeight+"%";

	if (logDims) console.log(divNode.style.width+', '+divNode.style.height);

	return divNode;
}

const AUTO_RESIZE_SMALL = 0;
const AUTO_RESIZE_NORMAL = 1;
const AUTO_RESIZE_LARGE = 2;

const AUTO_RESIZE_SHORTER_EDGE_SIZES = [10, 20, 40];

var autoResize = function(autoResizeChoice) {

	calcWindowInnerAspectRatio();

	if (windowInnerAspectRatio > 1) {
		// The window width is larger than its height.
		rows = AUTO_RESIZE_SHORTER_EDGE_SIZES[autoResizeChoice];
		cols = 2*rows;
	} else if (windowInnerAspectRatio < 1) {
		// The window width is less than its height.
		cols = AUTO_RESIZE_SHORTER_EDGE_SIZES[autoResizeChoice];
		rows = 2*cols;
	} else {
		// The window width equals its height.
		cols = AUTO_RESIZE_SHORTER_EDGE_SIZES[autoResizeChoice];
		rows = cols;
	}

	console.log("auto resizing to: "+rows+"x"+cols);

	verifyAndCacheBoardSize(rows, cols);
}

var resizingTimeout;

$(window).resize(function() {
	clearTimeout(resizingTimeout);
	resizingTimeout = setTimeout(doneWindowResizing, 100);
});
enableOnBeforeUnload
var doneWindowResizing = function() {
	console.log("started resizing on window resize");

	calcBoardVirtualDims();

	refreshGridOnWindowResize();

	console.log("finished resizing on window resize");
}

var refreshGridOnWindowResize = function() {

	console.log('started refreshing board on window resize');

	chooseNoTool();

	rowHeight = BOARD_HEIGHT_PERCENT/rows;
	colWidth = (100-(ONE_SIDE_MARGIN*cols))/cols; // (100-(ONE_SIDE_MARGIN*cols))/cols;

	console.log('row-height: '+rowHeight+', col-width: '+colWidth);

	var board = document.getElementById("content");

	var boardRows = board.children;
	var boardRowCells;

	var i, j;
	for (i = 0; i < boardRows.length; i++) {
		boardRows[i].style.width = BOARD_WIDTH_PERCENT+"%";
		boardRows[i].style.height = rowHeight+"%";

		boardRowCells = boardRows[i].children;

		for (j = 0; j < boardRowCells.length; j++) {
			boardRowCells[j].style.width = colWidth+"%";
			boardRowCells[j].style.height = cellHeight+"%";
		}
	}

	console.log('finished refreshing board on window resize');
}

var doneGridResizing = function () {

	console.log("started resizing on grid resize");

	calcBoardVirtualDims();

	boardLayout();

	initBoardCellMouseHandler();

	console.log("finished resizing on grid resize");
}

var enableOnBeforeUnload = function () {
	window.onbeforeunload = function(e) {
		return 'You are leaving or refreshing the page, if you continue you will lose the drawing.';
	};
}
