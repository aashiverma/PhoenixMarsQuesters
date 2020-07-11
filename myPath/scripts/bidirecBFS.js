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
						console.log([r,c]);
						break;}
                    cellsToAnimate.push( [neighborNodes[k], "searching"] );
                    startQueue.enqueue(neighborNodes[k])
					}
					if(pathFound) break;
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
		var startNode = startNode;
		var endNode = endNode;
		var prevS = prevS;
		var prevE = prevE;
	//	while (prev[r][c] != null){
    while( prevS[r][c] != null ||  prevE[r][c] != null /*nodeS != startNode || nodeE != endNode*/){
        var r = intersectNode[0];
		var c = intersectNode[1];
		//console.log([r,c]);
        if(nodeS != startNode){
            var prevCell = prevS[r][c];
			r = prevCell[0];
			c = prevCell[1];
			cellsToAnimate.push( [[r, c], "success"] );
			
           // path.push(nodeS);
            nodeS = prevCell ;
        }
        if(nodeE != endNode && prevE[r,c] !== null){
            var prevCell = prevE[r][c];
			r = prevCell[0];
            c = prevCell[1];
            cellsToAnimate.push( [[r, c], "success"] );
           // path.push(nodeE);
            nodeE = prevCell;
        }
    }
    //return path;
}