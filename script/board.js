$(document).ready(function() {
	console.log('handling document ready ...');

	boardLayout(16, 16);

	console.log('handled document ready')
});

var boardLayout = function(rows, cols)
{
	console.log('starting board layout with (rows, cols) = ('+rows+', '+cols+')');

	if (rows < 2 || cols < 2) {
		alert('board must be at least 2x2, please re-select its size!');
		console.log('wrong board size, exiting board layout');
		return;
	}

	var bf = $('#board-frame');
	console.log('board-frame: '+bf.width()+'x'+bf.height());

	var cellWidth = Math.floor(bf.width()/cols);
	var cellHeight = Math.floor(bf.height()/rows);
	cellWidth > cellHeight ? cellWidth = cellHeight : cellHeight = cellWidth;
	console.log('square-cell: '+cellWidth+'x'+cellHeight);

	var boardRowsList = document.getElementById("board-rows-list");

	for (i = 0; i < rows; i++) {
		console.log('adding row: '+i);
		var boardRowLiNode = createBoardRow(100+"px", 30+"px");
		boardRowsList.appendChild(boardRowLiNode);
	}

	console.log('done with board layout')
}

var createBoardRow = function(width, height) {
	var liNode;
	var divNode;

	divNode = document.createElement("DIV");
	divNode.appendChild(document.createTextNode("Test"));
	divNode.className = "board-row";
	divNode.style.width = width; // 100+"px";
	divNode.style.height = height; // 30+"px";

	liNode = document.createElement("LI");
	liNode.appendChild(divNode)

	return liNode;
}
