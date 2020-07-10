function BidirectionalBFS(){
    let startQueue = new Queue();
    let endQueue = new Queue();

   // let visitArray = [];
   var visitedS = createVisited();
   var visitedE = createVisited();

   var prevS = createPrev();
	var prevE = createPrev();

    startQueue.enqueue(startCell);
    endQueue.enqueue(endCell);
    while(true){
        let queue1len = startQueue.length();
        let queue2len = startQueue.length();

        if(queue1len == 0 && queue2len == 0){
            pathFound = false;
            break;
        }

        while(queue1len != 0 || queue2len != 0){
            if(queue1len != 0){
                let cell = startQueue.dequeue();
                cellsToAnimate.push( [cell, "visited"] );
                var r = cell[0];
		        var c = cell[1];
                let neighborNodes = getNeighbors(r, c);
                for (let k of neighborNodes){
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
                    cellsToAnimate.push( [neighbors[k], "searching"] );
                    startQueue.enqueue(neighbors[k]);

                    }
                }
            if(queue2len != 0){
                let cell = endQueue.dequeue();
                cellsToAnimate.push( [cell, "visited"] );
                var r = cell[0];
		        var c = cell[1];
                let neighborNodes = getNeighbors(r, c);
                for(let k of neighborNodes){
                    // if(n.visited2 == false && !n.isWall()){
                    //     endQueue.enqueue(n);
                    //     n.next = node;
                    //     n.visited2 = true;
                    //     visitArray.push(n);
                    //     if(n.visited1 == true){
                    //         return [visitArray, true];
                    //     }
                    var m = neighborNodes[k][0];
                        var n = neighborNodes[k][1];
                    if ( visitedE[m][n] ) { continue ;}
                    visitedE[m][n] = true;
                    prevE[m][n] = [r, c];
                    cellsToAnimate.push( [neighbors[k], "searching"] );
                    endQueue.enqueue(neighbors[k]);
                    }
                }
            }
            var intersectNode = isIntersecting(visitedS,visitedE);
           if(intersectNode != [])
           return  shortestPathBidirectional(startCell, endCell, intersectNode);  
           
           pathFound = false;
           break;
        }
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
function shortestPathBidirectional(startNode, endNode, intersectNode){
    var path = [];
    // console.log(intersectNode)
    var nodeS = intersectNode;
    var nodeE = intersectNode;
    while(nodeS != startNode || nodeE != endNode){
        // console.log("Loop")
        // console.log(nodeS)
        // console.log(nodeE)
        if(nodeS != startNode){
            path.push(nodeS);
            nodeS = nodeS.prev;
        }
        if(nodeE != endNode){
            path.push(nodeE);
            nodeE = nodeE.next;
        }
    }
    return path;
}