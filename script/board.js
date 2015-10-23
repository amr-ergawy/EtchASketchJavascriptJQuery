$(document).ready(function() {
	console.log('handling document-ready ...');

	boardLayout(50, 50);

	console.log('handled document-ready')
});

const MIN_ROWS = 8;
const MIN_COLS = 8;

const logDims = false;

var boardLayout = function(rows, cols)
{
	console.log('starting board layout with (rows, cols) = ('+rows+', '+cols+')');

	if (rows < MIN_ROWS || cols < MIN_COLS) {
		alert('Wrong board size, changing to the minimum of '+
				MIN_ROWS+'x'+MIN_COLS+'.'+
				' You can choose another size.');
		console.log('wrong board size, changing to minimum');
		rows = MIN_ROWS;
		cols = MIN_COLS;
	}

	var cellWidth = Math.floor(480/cols);
	var cellHeight = Math.floor(480/rows);
	cellWidth > cellHeight ? cellWidth = cellHeight : cellHeight = cellWidth;
	console.log('square-cell: '+cellWidth+'x'+cellHeight);

	/*
	 * both the boardFrame and menu frame are set to the same
	 * minimum width for consistency on window resize
	 */
	var minFramesWidth = ((2*cols)*cellWidth)+"px";
	frame = $('#menu-frame');
	frame.css("minWidth", minFramesWidth);
	var frame = $('#board-frame');
	frame.css("minWidth", minFramesWidth);

	var minBoardFrameHeight = (rows*cellHeight)+"px";
	frame.css("minHeight", minBoardFrameHeight);

	var board = document.getElementById("board");
	var boardRowLiNode;
	for (var i = 0; i < rows; i++) {
		if (logDims) console.log('adding row: '+i);
		boardRowLiNode = createBoardRow(cols, cellWidth, cellHeight);
		board.appendChild(boardRowLiNode);
	}

	console.log('done with board layout')
}

var createBoardRow = function(cols, cellWidth, cellHeight) {
	var liNode;
	var divNode;

	divNode = document.createElement("DIV");
	divNode.className = "board-row";
	divNode.style.minWidth = (cellWidth*cols)+"px";
	divNode.style.height = cellHeight+"px";

	if (logDims) console.log(divNode.style.minWidth+', '+divNode.style.height);

	var boardCellDivNode;
	for (var i = 0; i < cols; i++) {
		if (logDims)  console.log('adding col: '+i);
		boardCellDivNode = createBoardCell(cellWidth, cellHeight);
		divNode.appendChild(boardCellDivNode);
	}

	liNode = document.createElement("DIV");
	liNode.appendChild(divNode)

	return liNode;
}


var createBoardCell = function(cellWidth, cellHeight) {
	var divNode;

	divNode = document.createElement("DIV");
	divNode.className = "board-cell";
	// we subtract 2 from the dimensions for margins.
	divNode.style.width = (cellWidth-2)+"px";
	divNode.style.height = (cellHeight-2)+"px";

	if (logDims) console.log(divNode.style.width+', '+divNode.style.height);

	return divNode;
}
