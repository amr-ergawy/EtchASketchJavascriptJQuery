$(document).ready(
	function() {
		var rows = 16;
		var cols = 16;
		
		var table = document.getElementById("board");
		
		for (i = 0; i < rows; i++) {
			var row = table.insertRow(i);
			for (j = 0; j < cols; j++) {
				var cell =  row.insertCell(j);
				cell.innerHTML = "NEW CELL";
			}
		}
	}
);
