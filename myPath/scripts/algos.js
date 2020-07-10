function DFS(i, j, visited){
	if (i == endCell[0] && j == endCell[1]){
		cellsToAnimate.push( [[i, j], "success"] );
		return true;
	}
	visited[i][j] = true;
	cellsToAnimate.push( [[i, j], "searching"] );
	var neighbors = getNeighbors(i, j);
	for(var k = 0; k < neighbors.length; k++){
		var m = neighbors[k][0];
		var n = neighbors[k][1]; 
		if ( !visited[m][n] ){
			var pathFound = DFS(m, n, visited);
			if ( pathFound ){
				cellsToAnimate.push( [[i, j], "success"] );
				return true;
			} 
		}
	}
	cellsToAnimate.push( [[i, j], "visited"] );
	return false;
}


// NEED TO REFACTOR AND MAKE LESS LONG
function BFS(start, end ){
	var pathFound = false;
	var myQueue = new Queue();
	var prev = createPrev();
	var visited = createVisited();
	myQueue.enqueue( start );
	cellsToAnimate.push(start, "searching");
	visited[ start[0] ][ start[1] ] = true;
	while ( !myQueue.empty() ){
		var cell = myQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		cellsToAnimate.push( [cell, "visited"] );
		if (r == end[0] && c == end[1]){
			pathFound = true;
			break;
		}
		// Put neighboring cells in queue
		var neighbors = getNeighbors(r, c);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if ( visited[m][n] ) { continue ;}
			visited[m][n] = true;
			prev[m][n] = [r, c];
			cellsToAnimate.push( [neighbors[k], "searching"] );
			myQueue.enqueue(neighbors[k]);
		}
	}
	// Make any nodes still in the queue "visited"
	while ( !myQueue.empty() ){
		var cell = myQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		cellsToAnimate.push( [cell, "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var r = end[0];
		var c = end[1];
		cellsToAnimate.push( [[r, c], "success"] );
		while (prev[r][c] != null){
			var prevCell = prev[r][c];
			r = prevCell[0];
			c = prevCell[1];
			cellsToAnimate.push( [[r, c], "success"] );
		}
	}
	return pathFound;
}

function BirecBFS(){
	var pathFound = false;
	var startQueue = new Queue();
	var endQueue = new Queue();
	var prevS = createPrev();
	var prevE = createPrev();
	var visitedS = createVisited();
	var visitedE = createVisited();
	endQueue.enqueue( endCell );
    startQueue.enqueue(startCell);
	cellsToAnimate.push(startCell, "searching");
    cellsToAnimate.push(endCell,"searching");
	visitedS[ startCell[0] ][ startCell[1] ] = true;
	visitedE[ endCell[0] ][ endCell[1] ] = true;
	var intersectNode = [];
	while ( !startQueue.empty() && !endQueue.empty() ){
		// var cell = Queue.dequeue();
		// var r = cell[0];
		// var c = cell[1];
		// cellsToAnimate.push( [cell, "visited"] );
		// if (r == endCell[0] && c == endCell[1]){
		// 	pathFound = true;
		// 	break;
		// }
		// // Put neighboring cells in queue
		// var neighbors = getNeighbors(r, c);
		// for (var k = 0; k < neighbors.length; k++){
		// 	var m = neighbors[k][0];
		// 	var n = neighbors[k][1];
		// 	if ( visited[m][n] ) { continue ;}
		// 	visited[m][n] = true;
		// 	prev[m][n] = [r, c];
		// 	cellsToAnimate.push( [neighbors[k], "searching"] );
		// 	myQueue.enqueue(neighbors[k]);
		
		
		var path1 = BFS(visitedS, startQueue, prevS);
		var path2 = BFS(visitedE, endQueue, prevE);

		intersectNode = isIntersecting(visitedS, visitedE);
	//	path2 = path2.reverse(); 
        		
        // if (pathF) {
		// 	var r = endCell[0];
		// 	var c = endCell[1];
		// 	cellsToAnimate.push( [[r, c], "success"] );
		// 	while (prev[r][c] != null){
		// 		var prevCell = prev[r][c];
		// 		r = prevCell[0];
		// 		c = prevCell[1];
		// 		cellsToAnimate.push( [[r, c], "success"] );
		// 	}
		// }
		// return pathFound;
	}
	
	// Make any nodes still in the queue "visited"
	while ( !myQueue.empty() ){
		var cell = myQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		cellsToAnimate.push( [cell, "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var r = endCell[0];
		var c = endCell[1];
		cellsToAnimate.push( [[r, c], "success"] );
		while (prev[r][c] != null){
			var prevCell = prev[r][c];
			r = prevCell[0];
			c = prevCell[1];
			cellsToAnimate.push( [[r, c], "success"] );
		}
	}
	return pathFound;
}
function isIntersecting(visitedS, visitedE) 
   { 
            var intersectNode = -1; var i=0; var j=0;
        while(i<visitedS.length && j<visited.length)
      { 
        // if a cell is visited by both front 
        // and back BFS search return that cell 
		// else return empty cell
		
        if(visitedS[i] == visitedE[j]) 
			return i;
			
		  i++;
		  j++;
       } 
    return []; 
}; 
function dijkstra() {
	var pathFound = false;
	var myHeap = new minHeap();
	var prev = createPrev();
	var distances = createDistances();
	var visited = createVisited();
	//startcell defined above
	distances[ startCell[0] ][ startCell[1] ] = 0;
	myHeap.push([0, [startCell[0], startCell[1]]]);
	cellsToAnimate.push([[startCell[0], startCell[1]], "searching"]);
	while (!myHeap.isEmpty()){
		//cell is grids node
		var cell = myHeap.getMin();
		//console.log("Min was just popped from the heap! Heap is now: " + JSON.stringify(myHeap.heap));
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push([[i, j], "visited"]);
		//end cell defined above
		if (i == endCell[0] && j == endCell[1]){
			pathFound = true;
			break;
		}
		//get neighbour is a fnctn above
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newDistance = distances[i][j] + 1;
			if (newDistance < distances[m][n]){
				distances[m][n] = newDistance;
				prev[m][n] = [i, j];
				myHeap.push([newDistance, [m, n]]);
				//console.log("New cell was added to the heap! It has distance = " + newDistance + ". Heap = " + JSON.stringify(myHeap.heap));
				cellsToAnimate.push( [[m, n], "searching"] );
			}
		}
		//console.log("Cell [" + i + ", " + j + "] was just evaluated! myHeap is now: " + JSON.stringify(myHeap.heap));
	}
	//console.log(JSON.stringify(myHeap.heap));
	// Make any nodes still in the heap "visited"
	while ( !myHeap.isEmpty() ){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push( [[i, j], "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var i = endCell[0];
		var j = endCell[1];
		cellsToAnimate.push( [endCell, "success"] );
		while (prev[i][j] != null){
			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	return pathFound;
}

function AStar() {
	var pathFound = false;
	var myHeap = new minHeap();
	var prev = createPrev();
	var distances = createDistances();
	var costs = createDistances();
	var visited = createVisited();
	distances[ startCell[0] ][ startCell[1] ] = 0;
	costs[ startCell[0] ][ startCell[1] ] = 0;
	myHeap.push([0, [startCell[0], startCell[1]]]);
	cellsToAnimate.push([[startCell[0], startCell[1]], "searching"]);
	while (!myHeap.isEmpty()){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push([[i, j], "visited"]);
		if (i == endCell[0] && j == endCell[1]){
			pathFound = true;
			break;
		}
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newDistance = distances[i][j] + 1;
			if (newDistance < distances[m][n]){
				distances[m][n] = newDistance;
				prev[m][n] = [i, j];
				cellsToAnimate.push( [[m, n], "searching"] );
			}
			var newCost = distances[i][j] + Math.abs(endCell[0] - m) + Math.abs(endCell[1] - n);
			if (newCost < costs[m][n]){
				costs[m][n] = newCost;
				myHeap.push([newCost, [m, n]]);
			}
		}
	}
	// Make any nodes still in the heap "visited"
	while ( !myHeap.isEmpty() ){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push( [[i, j], "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var i = endCell[0];
		var j = endCell[1];
		cellsToAnimate.push( [endCell, "success"] );
		while (prev[i][j] != null){
			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	return pathFound;
}

function jumpPointSearch() {
	var pathFound = false;
	var myHeap = new minHeap();
	var prev = createPrev();
	var distances = createDistances();
	var costs = createDistances();
	var visited = createVisited();
	var walls = createVisited();
	distances[ startCell[0] ][ startCell[1] ] = 0;
	costs[ startCell[0] ][ startCell[1] ] = 0;
	myHeap.push([0, [startCell[0], startCell[1]]]);
	cellsToAnimate.push([[startCell[0], startCell[1]], "searching"]);
	while (!myHeap.isEmpty()){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push([[i, j], "visited"]);
		if (i == endCell[0] && j == endCell[1]){
			pathFound = true;
			break;
		}
		var neighbors = pruneNeighbors(i, j, visited, walls);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newDistance = distances[i][j] + Math.abs(i - m) + Math.abs(j - n);
			if (newDistance < distances[m][n]){
				distances[m][n] = newDistance;
				prev[m][n] = [i, j];
				cellsToAnimate.push( [[m, n], "searching"] );
			}
			var newCost = distances[i][j] + Math.abs(endCell[0] - m) + Math.abs(endCell[1] - n);
			if (newCost < costs[m][n]){
				costs[m][n] = newCost;
				myHeap.push([newCost, [m, n]]);
			}
		}
	}
	// Make any nodes still in the heap "visited"
	while ( !myHeap.isEmpty() ){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push( [[i, j], "visited"] );
	}
	// If a path was found, illuminate it:
	if (pathFound) {
		var i = endCell[0];
		var j = endCell[1];
		cellsToAnimate.push( [endCell, "success"] );
		while (prev[i][j] != null){
			var prevCell = prev[i][j];
			x = prevCell[0];
			y = prevCell[1];
			// Loop through and illuminate each cell in between [i, j] and [x, y]
			// Horizontal
			if ((i - x) == 0){
				// Move right
				if (j < y){
					for (var k = j; k < y; k++){
						cellsToAnimate.push( [[i, k], "success"] );
					}
				// Move left
				} else {
					for (var k = j; k > y; k--){
						cellsToAnimate.push( [[i, k], "success"] );
					}
				}
			// Vertical
			} else {
				// Move down
				if (i < x){
					for (var k = i; k < x; k++){
						cellsToAnimate.push( [[k, j], "success"] );
					}
				// Move up
				} else {
					for (var k = i; k > x; k--){
						cellsToAnimate.push( [[k, j], "success"] );
					}
				}
			}
			i = prevCell[0];
			j = prevCell[1];
			cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	return pathFound;
}

function pruneNeighbors(i, j, visited, walls){
	var neighbors = [];
	var stored = {};
	// Scan horizontally
	for (var num = 0; num < 2; num++){
		if (!num){
			var direction = "right";
			var increment = 1;
		} else {
			var direction = "left";
			var increment = -1;
		}
		for (var c = j + increment; (c < totalCols) && (c >= 0); c += increment){
			var xy = i + "-" + c;
			if (visited[i][c]){	break; }
			//Check if same row or column as end cell
			if ((endCell[0] == i || endCell[1] == c) && !stored[xy]){
				neighbors.push([i, c]);
				stored[xy] = true;
				continue;
			}
			// Check if dead end
			var deadEnd = !(xy in stored) && ((direction == "left" && (c > 0) && walls[i][c - 1]) || (direction == "right" && c < (totalCols - 1) && walls[i][c + 1]) || (c == totalCols - 1) || (c == 0));  
			if (deadEnd){
				neighbors.push([i, c]);
				stored[xy] = true;
				break;
			}
			//Check for forced neighbors
			var validForcedNeighbor = (direction == "right" && c < (totalCols - 1) && (!walls[i][c + 1])) || (direction == "left" && (c > 0) && (!walls[i][c - 1]));
			if (validForcedNeighbor){
				checkForcedNeighbor(i, c, direction, neighbors, walls, stored);
			}
		}
	}
	// Scan vertically
	for (var num = 0; num < 2; num++){
		if (!num){
			var direction = "down";
			var increment = 1;
		} else {
			var direction = "up";
			var increment = -1;
		}
		for (var r = i + increment; (r < totalRows) && (r >= 0); r += increment){
			var xy = r + "-" + j;
			if (visited[r][j]){	break; }
			if ((endCell[0] == r || endCell[1] == j) && !stored[xy]){
				neighbors.push([r, j]);
				stored[xy] = true;
				continue;
			}
			// Check if dead end
			var deadEnd = !(xy in stored) && ((direction == "up" && (r > 0) && walls[r - 1][j]) || (direction == "down" && r < (totalRows - 1) && walls[r + 1][j]) || (r == totalRows - 1) || (r == 0));  
			if (deadEnd){
				neighbors.push([r, j]);
				stored[xy] = true;
				break;
			}
			//Check for forced neighbors
			var validForcedNeighbor = (direction == "down" && (r < (totalRows - 1)) && (!walls[r + 1][j])) || (direction == "up" && (r > 0) && (!walls[r - 1][j]));
			if (validForcedNeighbor){
				checkForcedNeighbor(r, j, direction, neighbors, walls, stored);
			}
		}
	}
	return neighbors;
}

function checkForcedNeighbor(i, j, direction, neighbors, walls, stored){
	//console.log(JSON.stringify(walls));
	if (direction == "right"){
		var isForcedNeighbor = ((i > 0) && walls[i - 1][j] && (!walls[i - 1][j + 1])) || ((i < (totalRows - 1)) &&  walls[i + 1][j] && (!walls[i + 1][j + 1]));
		var neighbor = [i, j + 1];
	} else if (direction == "left"){
		var isForcedNeighbor = ((i > 0) && walls[i - 1][j] && !walls[i - 1][j - 1]) || ((i < (totalRows - 1)) && walls[i + 1][j] && !walls[i + 1][j - 1]);
		var neighbor = [i, j - 1];
	} else if (direction == "up"){
		var isForcedNeighbor = ((j < (totalCols - 1)) && walls[i][j + 1] && !walls[i - 1][j + 1]) || ((j > 0) && walls[i][j - 1] && !walls[i - 1][j - 1]);
		var neighbor = [i - 1, j];
	} else {
		var isForcedNeighbor = ((j < (totalCols - 1)) && walls[i][j + 1] && !walls[i + 1][j + 1]) || ((j > 0) && walls[i][j - 1] && !walls[i + 1][j - 1]);
		var neighbor = [i + 1, j];
	}
	var xy = neighbor[0] + "-" + neighbor[1];
	if (isForcedNeighbor && !stored[xy]){
		//console.log("Neighbor " + JSON.stringify(neighbor) + " is forced! Adding to neighbors and stored.")
		neighbors.push(neighbor);
		stored[xy] = true;
	} else {
		//console.log("Is not a forced neighbor..");
	}
	//return;
}

function greedyBestFirstSearch() {
	var pathFound = false;
	var myHeap = new minHeap();
	var prev = createPrev();
	var costs = createDistances();
	var visited = createVisited();
	costs[ startCell[0] ][ startCell[1] ] = 0;
	myHeap.push([0, [startCell[0], startCell[1]]]);
	cellsToAnimate.push([[startCell[0], startCell[1]], "searching"]);
	while (!myHeap.isEmpty()){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push([[i, j], "visited"]);
		if (i == endCell[0] && j == endCell[1]){
			pathFound = true;
			break;
		}
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newCost = Math.abs(endCell[0] - m) + Math.abs(endCell[1] - n);
			if (newCost < costs[m][n]){
				prev[m][n] = [i, j];
				costs[m][n] = newCost;
				myHeap.push([newCost, [m, n]]);
				cellsToAnimate.push([[m, n], "searching"]);
			}
		}
	}
	// Make any nodes still in the heap "visited"
	while ( !myHeap.isEmpty() ){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push( [[i, j], "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var i = endCell[0];
		var j = endCell[1];
		cellsToAnimate.push( [endCell, "success"] );
		while (prev[i][j] != null){
			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	return pathFound;
}
