function createDistancesPrevWalls(dist, prev, walls,weights,visited,visitedWeight){
    
    var array= [];

    var cells = $("#tableContainer").find("td");

	for (var i = 0; i < totalRows; i++){
		var row = [];
		for (var j = 0; j < totalCols; j++){
            if(dist) row.push(Number.POSITIVE_INFINITY);
            else if(prev) row.push(null);
            else if(walls) row.push(true);
            else if(weights) row.push(true);
            else if(visited){
                if (cellIsAWallAndWeight(i, j, cells,true,false)){
                    row.push(true);
                } else {
                    row.push(false);
                }    
            }
            else if(visitedWeight){
                if (cellIsAWallAndWeight(i, j, cells,false,true)){
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

