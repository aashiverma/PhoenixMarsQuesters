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
function BFS(start, end ,object){
	var pathFound = false;
	var myQueue = new Queue();
	var prev = createPrev();
	var visited = createVisited();
	myQueue.enqueue( start );
	if(!object){
	cellsToAnimate.push(start, "searching");}
	else{
		cellsToAnimate.push(start, "searching2");
	}
	visited[ start[0] ][ start[1] ] = true;
	while ( !myQueue.empty() ){
		var cell = myQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		if(object){
		cellsToAnimate.push( [cell, "visited"] );}
		else{
			cellsToAnimate.push( [cell, "visited2"] );
		}
		if(!object){
		     if (r == end[0] && c == end[1]){
			  pathFound = true;
			  break;
		   }
	    }else{
			if (r == object[0] && c == object[1]){
				pathFound = true;
				break;
			}   
	    }
		// Put neighboring cells in queue
		var neighbors = getNeighbors(r, c);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if ( visited[m][n] ) { continue ;}
			visited[m][n] = true;
			prev[m][n] = [r, c];
			if(!object){
			cellsToAnimate.push( [neighbors[k], "searching"] );}
			else{ 
				cellsToAnimate.push( [neighbors[k], "searching2"] );
			}
			myQueue.enqueue(neighbors[k]);
		}
	}
	// Make any nodes still in the queue "visited"
	while ( !myQueue.empty() ){
		var cell = myQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		if(object){
			cellsToAnimate.push( [cell, "visited"] );}
			else{
				cellsToAnimate.push( [cell, "visited2"] );
			}
	}
	
	// If a path was found, illuminate it
	if (pathFound) {
		if(object){
		var r = object[0];
		var c = object[1];}
		else{
		 var r =  end[0];
		 var c = end[1];
			}
		objectCellsToAnimate.push([r,c]);
		//cellsToAnimate.push( [[r, c], "success"] );
		while (prev[r][c] != null){
			var prevCell = prev[r][c];
			r = prevCell[0];
			c = prevCell[1];
			//cellsToAnimate.push( [[r, c], "success"] );
			objectCellsToAnimate.push([r,c]);
		}
	}
	if(object) { BFS (object, end, null); }
	objectCellsToAnimate.map(([r,c]) => cellsToAnimate.push( [[r, c], "success"] ));
	objectCellsToAnimate= [];
	return pathFound;
}
function BidirectionalBFS(){
	
    var pathFound = false;
    let startQueue = new Queue();
    let endQueue = new Queue();

   // let visitArray = [];
   var visitedS = createVisited();
   var visitedE = createVisited();

   var prevS = createPrev();
	var prevE = createPrev();

    startQueue.enqueue(startCell);
    endQueue.enqueue(endCell);

    cellsToAnimate.push(startCell, "searching");
    cellsToAnimate.push(endCell,"searching");

    visitedS[ startCell[0] ][ startCell[1] ] = true;
    visitedE[ endCell[0] ][ endCell[1] ] = true;
    
    var intersectNode = [];
    while ( !startQueue.empty()   && !endQueue.empty() ){
			   
	        	var cell = startQueue.dequeue();
                var r = cell[0];
		        var c = cell[1];
                cellsToAnimate.push( [[r,c], "visited" ]);
                var  neighborNodes = getNeighbors(r, c);
                for (var k=0; k<neighborNodes.length; k++){
                   // if(n.visited1 == false && !n.isWall()){
                        // startQueue.enqueue(n);
                        // n.prev = node;
                        // n.visited1 = true;
                        // visitArray.push(n);
                        // if(n.visited2 == true){
                        //     return [visitArray, true];
                        // }
                        var m = neighborNodes[k][0];
                        var n = neighborNodes[k][1];
                    if ( visitedS[m][n] ) { continue ;}
                    visitedS[m][n] = true;
                    prevS[m][n] = [r, c];
					if(visitedE[m][n]) {intersectNode = neighborNodes[k]; pathFound= true;
						console.log([m,n]);
						break;}


					
                    cellsToAnimate.push( [neighborNodes[k], "searching"] );
					startQueue.enqueue(neighborNodes[k])
					
					}
					if(pathFound==true) break;
                var  cell = endQueue.dequeue();
                var r = cell[0];
		        var c = cell[1];
                cellsToAnimate.push( [[r,c], "visited"] );
                
                var neighborNodes2 = getNeighbors(r, c);
                for(var k =0; k<neighborNodes2.length; k++){
                    // if(n.visited2 == false && !n.isWall()){
                    //     endQueue.enqueue(n);
                    //     n.next = node;
                    //     n.visited2 = true;
                    //     visitArray.push(n);
                    //     if(n.visited1 == true){
                    //         return [visitArray, true];
                    //     }
                    var m = neighborNodes2[k][0];
                        var n = neighborNodes2[k][1];
                    if ( visitedE[m][n] ) { continue ;}
                    visitedE[m][n] = true;
                    prevE[m][n] = [r, c];
					if(visitedS[m][n]) {intersectNode = neighborNodes2[k]; pathFound=true;
						console.log("inter found"); break;}
                    cellsToAnimate.push( [neighborNodes2[k], "searching"] );
                    endQueue.enqueue(neighborNodes2[k]);
					}
					if(pathFound) break;
                }
                while ( !startQueue.empty() ){
                    var cell = startQueue.dequeue();
                    var r = cell[0];
                    var c = cell[1];
                    cellsToAnimate.push( [[r,c], "visited"] );
                }
                while ( !endQueue.empty() ){
                    var cell = endQueue.dequeue();
                    var r = cell[0];
                    var c = cell[1];
                    cellsToAnimate.push( [[r,c], "visited"] );
                }
		   if(intersectNode != null)
		   
		   shortestPathBidirectional(startCell, endCell, intersectNode,prevS, prevE);  
		   
			
		   return pathFound;
		   
           
        }
   
    function shortestPathBidirectional(startNode, endNode, intersectNode, prevS, prevE){
		
		
    //var path = [];
    var nodeS = intersectNode;
    var nodeE = intersectNode;
        var r = intersectNode[0];
		var c = intersectNode[1];
		// var startNode = startNode;
		// var endNode = endNode;
		// var prevS = prevS;
		// var prevE = prevE;
	//	while (prev[r][c] != null){
	var flag = 0;
	var flag2 =0;
    while( prevS[r][c] != null &&  prevE[r][c] != null /*nodeS != startNode || nodeE != endNode*/){
        var r = intersectNode[0];
		var c = intersectNode[1];
		console.log([r,c]);
        if(nodeS != startNode && flag==0){
            var prevCell = prevS[r][c];
			r = prevCell[0];
			c = prevCell[1];
			cellsToAnimate.push( [[r, c], "success"] );
			
           // path.push(nodeS);
            nodeS = prevCell ;
		}
		if( startNode){
			flag= 1;
		}


		for( var k=0; k<prevE.length; k++){
			console.log( prevE[k][0] +" "+ prevE[k][1]);
		}
        if( prevE[r,c] != null && nodeE != endNode && flag2==0){
			var prevCel = prevE[r][c];
			if( prevCel != null){			
				r = prevCel[0];
				c = prevCel[1];
			}
           
			cellsToAnimate.push( [[r, c], "success"] );
			console.log(prevCel[r,c]);
//path.push(nodeE);
            nodeE = prevCel;
		}
		if( endNode){
			flag2 =1 ;
		}
		

    }
    //return path;
}

// function backtrace(node) {
//     var path = [[node.x, node.y]];
//     while (node.parent) {
//         node = node.parent;
//         path.push([node.x, node.y]);
//     }
//     return path.reverse();
// }
// function biBacktrace(nodeA, nodeB) {
//     var pathA = backtrace(nodeA),
//      var  pathB = backtrace(nodeB);
//     return pathA.concat(pathB.reverse());
// }
// function BirecBFS(){
// 	var pathFound = false;
// 	var startQueue = new Queue();
// 	var endQueue = new Queue();
// 	var prevS = createPrev();
// 	var prevE = createPrev();
// 	var visitedS = createVisited();
// 	var visitedE = createVisited();
// 	endQueue.enqueue( endCell );
//     startQueue.enqueue(startCell);
// 	cellsToAnimate.push(startCell, "searching");
//     cellsToAnimate.push(endCell,"searching");
// 	visitedS[ startCell[0] ][ startCell[1] ] = true;
// 	visitedE[ endCell[0] ][ endCell[1] ] = true;
// 	var intersectNode = [];
// 	while ( !startQueue.empty() && !endQueue.empty() ){
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
		
		
		// var path1 = BFS(visitedS, startQueue, prevS);
		// var path2 = BFS(visitedE, endQueue, prevE);

		// intersectNode = isIntersecting(visitedS, visitedE);
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
//	}
	
	// Make any nodes still in the queue "visited"
// 	while ( !myQueue.empty() ){
// 		var cell = myQueue.dequeue();
// 		var r = cell[0];
// 		var c = cell[1];
// 		cellsToAnimate.push( [cell, "visited"] );
// 	}
// 	// If a path was found, illuminate it
// 	if (pathFound) {
// 		var r = endCell[0];
// 		var c = endCell[1];
// 		cellsToAnimate.push( [[r, c], "success"] );
// 		while (prev[r][c] != null){
// 			var prevCell = prev[r][c];
// 			r = prevCell[0];
// 			c = prevCell[1];
// 			cellsToAnimate.push( [[r, c], "success"] );
// 		}
// 	}
// 	return pathFound;
// }
// function isIntersecting(visitedS, visitedE) 
//    { 
//             var intersectNode = -1; var i=0; var j=0;
//         while(i<visitedS.length && j<visited.length)
//       { 
//         // if a cell is visited by both front 
//         // and back BFS search return that cell 
// 		// else return empty cell
		
//         if(visitedS[i] == visitedE[j]) 
// 			return i;
			
// 		  i++;
// 		  j++;
//        } 
//     return []; 
// };

function dijkstra(start,end,object) {
	
	var pathFound = false;
	var cells = $("#tableContainer").find("td");
	var myHeap = new minHeap();
	var prev = createPrev();
	var distances = createDistances();
	
	
	
	var visited = createVisited();
	
	//startcell defined above
	distances[ start[0] ][ start[1] ] = 0;
	myHeap.push([0, [start[0], start[1]]]);
	//cellsToAnimate.push([[start[0], start[1]], "searching"]);
	if(!object){
		cellsToAnimate.push( [[start[0], start[1]], "searching"] );}
		else{
			cellsToAnimate.push( [[start[0], start[1]], "searching2"] );
		}
	while (!myHeap.isEmpty()){
		//cell is grids node
		var cell = myHeap.getMin();
		//console.log("Min was just popped from the heap! Heap is now: " + JSON.stringify(myHeap.heap));
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		if(!object){
		cellsToAnimate.push([[i, j], "visited"]);}
		else{
			cellsToAnimate.push([[i, j], "visited2"]);}
		
		//end cell defined above
		if(object){
			if (i == object[0] && j == object[1]){
				pathFound = true;
				break;
			}
		}else{
		if (i == end[0] && j == end[1]){
			pathFound = true;
			break;
		}
	}
		//get neighbour is a fnctn above
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newDistance = distances[i][j] + 1;
			if(cellIsAWeight(m,n,cells)){
                newDistance= distances[i][j] + 4;
			}
			if (newDistance < distances[m][n]){
				distances[m][n] = newDistance;
				prev[m][n] = [i, j];
				myHeap.push([newDistance, [m, n]]);
				//console.log("New cell was added to the heap! It has distance = " + newDistance + ". Heap = " + JSON.stringify(myHeap.heap));
			  //		cellsToAnimate.push( [[m, n], "searching"] );
			  if(!object){
				cellsToAnimate.push( [[m,n], "searching"] );}
				else{
					cellsToAnimate.push( [[m,n], "searching2"] );
				}
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
		if(!object){
		cellsToAnimate.push( [[i, j], "visited"] );}
		else{
			cellsToAnimate.push( [[i, j], "visited2"] );}
		
	}
	// If a path was found, illuminate it
	if (pathFound) {
		if(!object){
		var i = end[0];
		var j = end[1];}
		else{
			var i = object[0];
			var j = object[1];}
			objectCellsToAnimate.push([i,j]);
	//	cellsToAnimate.push( [endCell, "success"] );
		while (prev[i][j] != null){
			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			objectCellsToAnimate.push([i,j]);
			//cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	if(object){dijkstra(object,end, null)}
	
	objectCellsToAnimate.map(([r,c]) => cellsToAnimate.push( [[r,c], "success"] ));
	objectCellsToAnimate= [];
	return pathFound;
}

// function dijkstra1() {
	
// 	var pathFound = false;
// 	var myHeap = new minHeap();//no wall
// 	var prev = createPrev(flag=1);// no wall
// 	var distances = createDistances();//no wall
// 	var visited = createVisited1();// wall used
// 	//startcell defined above
// 	distances[ startCell[0] ][ startCell[1] ] = 0;
// 	myHeap.push([0, [startCell[0], startCell[1]]]);
// 	cellsToAnimate.push([[startCell[0], startCell[1]], "searching"]);
// 	while (!myHeap.isEmpty()){
// 		//cell is grids node
// 		var cell = myHeap.getMin();
// 		//console.log("Min was just popped from the heap! Heap is now: " + JSON.stringify(myHeap.heap));
// 		var i = cell[1][0];
// 		var j = cell[1][1];
// 		if (visited[i][j]){ continue; }
// 		visited[i][j] = true;
// 		cellsToAnimate.push([[i, j], "visited"]);
// 		//end cell defined above
// 		if (i == endCell[0] && j == endCell[1]){
// 			pathFound = true;
// 			break;
// 		}
// 		//get neighbour is a fnctn above
// 		var neighbors = getNeighbors(i, j);
// 		for (var k = 0; k < neighbors.length; k++){
// 			var m = neighbors[k][0];
// 			var n = neighbors[k][1];
// 			if (visited[m][n]){ continue; }
// 			var newDistance = distances[i][j] + 1;
// 			if (newDistance < distances[m][n]){
// 				distances[m][n] = newDistance;
// 				prev[m][n] = [i, j];
// 				myHeap.push([newDistance, [m, n]]);
// 				//console.log("New cell was added to the heap! It has distance = " + newDistance + ". Heap = " + JSON.stringify(myHeap.heap));
// 				cellsToAnimate.push( [[m, n], "searching"] );
// 			}
// 		}
// 		//console.log("Cell [" + i + ", " + j + "] was just evaluated! myHeap is now: " + JSON.stringify(myHeap.heap));
// 	}
// 	//console.log(JSON.stringify(myHeap.heap));
// 	// Make any nodes still in the heap "visited"
// 	while ( !myHeap.isEmpty() ){
// 		var cell = myHeap.getMin();
// 		var i = cell[1][0];
// 		var j = cell[1][1];
// 		if (visited[i][j]){ continue; }
// 		visited[i][j] = true;
// 		cellsToAnimate.push( [[i, j], "visited"] );
// 	}
// 	// If a path was found, illuminate it
// 	if (pathFound) {
// 		var i = endCell[0];
// 		var j = endCell[1];
// 		cellsToAnimate.push( [endCell, "success"] );
// 		while (prev[i][j] != null){
// 			var prevCell = prev[i][j];
// 			i = prevCell[0];
// 			j = prevCell[1];
// 			cellsToAnimate.push( [[i, j], "success"] );
// 		}
// 	}
	
// 	return pathFound;
// }

function AStar(start, end , object) {
	var pathFound = false;
	var myHeap = new minHeap();
	var prev = createPrev();
	var distances = createDistances();
	var costs = createDistances();
	var visited = createVisited();
	distances[ start[0] ][ start[1] ] = 0;
	costs[ start[0] ][ start[1] ] = 0;
	myHeap.push([0, [start[0], start[1]]]);
	if(!object){
		cellsToAnimate.push( [[start[0], start[1]], "searching"] );}
	else{
			cellsToAnimate.push( [[start[0], start[1]], "searching2"] );
		}
	while (!myHeap.isEmpty()){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		if(!object){
			cellsToAnimate.push( [[i, j], "visited"] );}
		else{
				cellsToAnimate.push( [[i, j], "visited2"] );}
			
	   if(object){
		 if (i == object[0] && j == object[1]){
			pathFound = true;
			break;
		}
		}else{
		if (i == end[0] && j == end[1])
			pathFound = true;
			break;
		}		
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newDistance = distances[i][j] + 1;
			if(cellIsAWeight(m,n,cells)){
                newDistance= distances[i][j] + 4;
			}
			

			if (newDistance < distances[m][n]){
				distances[m][n] = newDistance;
				prev[m][n] = [i, j];
				if(!object){
					cellsToAnimate.push( [[m,n], "searching"] );}
					else{
						cellsToAnimate.push( [[m,n], "searching2"] );
					}
			}
			if(!object)
			{var newCost = distances[i][j] + Math.abs(end[0] - m) + Math.abs(end[1] - n);}
			else{var newCost = distances[i][j] + Math.abs(object[0] - m) + Math.abs(object[1] - n);}
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
		visited[i][j] = true;
		if(!object){
			cellsToAnimate.push( [[i, j], "visited"] );}
		else{
			cellsToAnimate.push( [[i, j], "visited2"] );}
		
	}
	// If a path was found, illuminate it
	if(object) {AStar(object, end, null);}
	objectCellsToAnimate.map(([r,c]) => cellsToAnimate.push( [[r,c], "success"] ));
	objectCellsToAnimate= [];
	pathFound=true;
	if (pathFound) {
		if(!object){
			var i = end[0];
			var j = end[1];}
		else{
		    var i = object[0];
		    var j = object[1];}
				
		objectCellsToAnimate.push([i,j]);
		//	cellsToAnimate.push( [endCell, "success"] );
			while (prev[i][j] != null){
				var prevCell = prev[i][j];
				i = prevCell[0];
				j = prevCell[1];
				objectCellsToAnimate.push([i,j]);
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

function greedyBestFirstSearch(start, end, object) {
	var pathFound = false;
	var myHeap = new minHeap();
	var prev = createPrev();
	var costs = createDistances();
	var visited = createVisited();
	costs[ start[0] ][ start[1] ] = 0;
	myHeap.push([0, [start[0], start[1]]]);
	if(!object){
		cellsToAnimate.push( [[start[0], start[1]], "searching"] );}
	else{
			cellsToAnimate.push( [[start[0], start[1]], "searching2"] );
		}
	
	while (!myHeap.isEmpty()){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		if(!object){
			cellsToAnimate.push( [[start[0], start[1]], "visited"] );}
		else{
				cellsToAnimate.push( [[i,j], "visited2"] );
			}
			if(object){
				if (i == object[0] && j == object[1]){
				   pathFound = true;
				   break;
			   }
			}else{
			   if (i == end[0] && j == end[1])
			    pathFound=true;
				   break;
				  
			   }	

			
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			if(object){
			var newCost = Math.abs(object[0] - m) + Math.abs(object[1] - n);}
			else{
				var newCost = Math.abs(end[0] - m) + Math.abs(end[1] - n);
			}
			if (newCost < costs[m][n]){
				prev[m][n] = [i, j];
				costs[m][n] = newCost;
				myHeap.push([newCost, [m, n]]);
				if(object)
				cellsToAnimate.push([[m, n], "searching"]);
				else
				cellsToAnimate.push([[m, n], "searching2"]);
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
		if(object)
			cellsToAnimate.push([[i, j], "visited"]);
		else
				cellsToAnimate.push([[i, j], "visited2"]);
	}
	
		
		if (pathFound) {
			if(!object){
			  var i = end[0];
			  var j = end[1];}
			  else{
				var i = object[0];
				var j = object[1];
			  }
			objectCellsToAnimate.push([i,j]);
	
			while (prev[i][j] != null){
				var prevCell = prev[i][j];
				i = prevCell[0];
				j = prevCell[1];
				objectCellsToAnimate.push([i,j]);

			}
		
		
		}
		if(object) {
			greedyBestFirstSearch(object, end, null)
		 }
			objectCellsToAnimate.map(([r,c]) => cellsToAnimate.push( [[r,c], "success"] ));
		 
			objectCellsToAnimate= [];


		 return pathFound;
		
 }
 
 
	// If a path was found, illuminate it
