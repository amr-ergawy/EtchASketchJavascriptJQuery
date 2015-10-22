$(document).ready(function() {
	console.log('handling document-ready ...');

	boardLayout(20, 20);

	console.log('handled document-ready')
});

const MIN_ROWS = 8;
const MIN_COLS = 8;

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

	var bf = $('#board-frame');
	console.log('board-frame: '+bf.width()+'x'+bf.height());

	var cellWidth = Math.floor(bf.width()/cols);
	var cellHeight = Math.floor(bf.height()/rows);
	cellWidth > cellHeight ? cellWidth = cellHeight : cellHeight = cellWidth;
	console.log('square-cell: '+cellWidth+'x'+cellHeight);

	var boardRowsList = document.getElementById("board-rows-list");

	var boardRowLiNode;
	for (var i = 0; i < rows; i++) {
		console.log('adding row: '+i);
		boardRowLiNode = createBoardRow(cols, cellWidth, cellHeight);
		boardRowsList.appendChild(boardRowLiNode);
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

	console.log(divNode.style.minWidth+', '+divNode.style.height);

	var boardCellDivNode;
	for (var i = 0; i < cols; i++) {
		console.log('adding col: '+i);
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

	console.log(divNode.style.width+', '+divNode.style.height);

	return divNode;
}
