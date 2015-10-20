$(document).ready(
	function() {
		var rows = 50;
		var cols = 100;
		
		var table = document.getElementById("board");
		
		for (i = 0; i < rows; i++) {
			var row = table.insertRow(i);
			for (j = 0; j < cols; j++) {
				var cell =  row.insertCell(j);
				// cell.innerHTML = "NEW CELL";
				cell.className = "board-cell";
			}
		}
	}
);
