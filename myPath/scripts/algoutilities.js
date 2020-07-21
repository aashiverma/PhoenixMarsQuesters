function createDistancesPrevWalls(dist, prev, walls, visited){
    var array= [];
    var cells = $("#tableContainer").find("td");
	for (var i = 0; i < totalRows; i++){
		var row = [];
		for (var j = 0; j < totalCols; j++){
            if(dist) row.push(Number.POSITIVE_INFINITY);
            else if(prev) row.push(null);
            else if(walls) row.push(true);
            else if(visited){
                if (cellIsAWall(i, j, cells)){
                    row.push(true);
                } else {
                    row.push(false);
                }    
            }
		}
		array.push(row);
    }
	return array;
}

// function createVisited(){
// 	var visited = [];
	
// 	for (var i = 0; i < totalRows; i++){
// 		var row = [];
// 		for (var j = 0; j < totalCols; j++){	
// 			if (cellIsAWall(i, j, cells)){
// 				row.push(true);
// 			} else {
// 				row.push(false);
// 			}
//         }		
// 		visited.push(row);
// 	}
// 	return visited;
// }