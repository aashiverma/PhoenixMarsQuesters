var movingStart = false;
var movingEnd = false;
var movingObject = false;
var movingPointIndex= false;

//walls
$( "td" ).mousedown(function(){
	var index = $( "td" ).index( this );
	var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
	var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
	var point1index = (point1[0] * (totalCols)) + point1[1];
	var point2index = (point2[0] * (totalCols)) + point2[1];
	var point3index = (point3[0] * (totalCols)) + point3[1];
	var point4index = (point4[0] * (totalCols)) + point4[1];

	if ( !inProgress ){
		// Clear board if just finished
		if ( justFinished  && !inProgress ){ 
			clearBoard( keepWalls = true ); 
			
			justFinished = false;
		}
		if (index == startCellIndex){
			movingStart = true;
			//console.log("Now moving start!");
		} else if (index == endCellIndex){
			movingEnd = true;
			//console.log("Now moving end!");
		}else if(index == objectCellIndex) {
			movingObject= true;

		}else if (travellingCalled){

			   if(index == point1index){
					movingPointIndex= true;
					movingPoint = point1;
				}
				if(index == point2index){
					movingPointIndex= true;
					movingPoint = point2;
				}
				if(index == point3index){
					movingPointIndex= true;
					movingPoint = point3;
				}
				if(index == point4index){
					movingPointIndex= true;
					movingPoint = point4;
				}
			//endPoints = initialisEndPointsArray(numberOfcities);
			// for(var k=0; k<endPoints.length;k++){
			// 	var m =  endPoints[k][0];
			// 	var n = endPoints[k][1];
			// 	PointIndex = (m * (totalCols)) + n;
			// 	if(index == PointIndex){
			// 		console.log("moved");
			// 	   movingPointIndex =true;
			// 	   movingPoint= PointIndex;
			// 	}
			}
			else {
				createWalls = true;
			}
	}
		
	
});

$( "td" ).mouseup(function(){
	createWalls = false;
	movingStart = false;
	movingEnd = false;
	movingObject= false;
	movingPointIndex= false;
});

$( "td" ).mouseenter(function() {
	if (!createWalls && !movingStart && !movingEnd && !movingObject && !movingPointIndex){ return; }
    var index = $( "td" ).index( this );
    var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];

	var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
	var movingPointkIndex =  (movingPoint[0] * (totalCols)) + movingPoint[1];
	
    var point1index = (point1[0] * (totalCols)) + point1[1];
    var point2index = (point2[0] * (totalCols)) + point2[1];
	var point3index = (point3[0] * (totalCols)) + point3[1];
	var point4index = (point4[0] * (totalCols)) + point4[1];

    if (!inProgress){
    	if (justFinished){ 
			clearBoard( keepWalls = true );
			
    		justFinished = false;
    	}
    	//console.log("Cell index = " + index);
    	if (movingStart && index != endCellIndex && index != objectCellIndex && index != point1index && index != point2index && index != point3index && index != point4index) {
    		moveStartOrEnd(startCellIndex, index, "start");
    	} else if (movingEnd && index != startCellIndex && index != objectCellIndex && index != point1index && index != point2index && index != point3index && index != point4index) {
    		moveStartOrEnd(endCellIndex, index, "end");
		}else if (movingObject && index != endCellIndex && index != startCellIndex  && index != point1index && index != point2index && index != point3index && index != point4index){
            moveStartOrEnd(objectCellIndex, index, "object");
		} else if(movingPointIndex && index != endCellIndex && index != startCellIndex && index!= objectCellIndex){
			moveStartOrEnd(movingPointkIndex, index, "ending");

			// if( index == point1index && index!= point2index && index != point3index && index != point4index)
			// 	 {moveStartOrEnd(movingPointkIndex, index, "ending");}
			// if( index==point2index && index != point1index && index != point3index && index != point4index)
			// 	 {moveStartOrEnd(movingPointkIndex, index, "ending");}
			// if(index == point3index && index != point1index && index != point2index && index != point4index)
			// 	 {moveStartOrEnd(movingPointkIndex, index, "ending");}
			// if(index == point4index &&  index != point1index && index != point2index && index != point3index)
			// 	 {moveStartOrEnd(movingPointkIndex, index, "ending");}
				 
			console.log("2mouseenter");


		}else if (index != startCellIndex && index != endCellIndex && index !=objectCellIndex && index != movingPointIndex) {
    		$(this).toggleClass("wall");}
    } 
});
a
$( "td" ).click(function() {
    var index = $( "td" ).index( this );
    var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
	var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
	var movingPointkIndex =  (movingPoint[0] * (totalCols)) + movingPoint[1];
	if ((inProgress == false) && !(index == startCellIndex) && !(index == endCellIndex) && !(index == objectCellIndex) && !(index == movingPointkIndex)){
    	if ( justFinished ){ 
			clearBoard( keepWalls = true );
			
    		justFinished = false;
    	}
    	$(this).toggleClass("wall");
    }
});
// optimise
$( "body" ).mouseup(function(){
	createWalls = false;
	movingStart = false;
	movingEnd = false;
	movingObject= false;
	movingPointIndex = false;
});

function moveStartOrEnd(prevIndex, newIndex, startOrEnd){
	var newCellY = newIndex % totalCols;
	var newCellX = Math.floor((newIndex - newCellY) / totalCols);

	if (startOrEnd == "start"){
    	startCell = [newCellX, newCellY];
    	console.log("Moving start to [" + newCellX + ", " + newCellY + "]")
	} 
	else if(startOrEnd == "end"){
    	endCell = [newCellX, newCellY];
    	//console.log("Moving end to [" + newCellX + ", " + newCellY + "]")
	}
	else if(startOrEnd == "ending" && travellingCalled){

		console.log("3Moving ending to [" + newCellX + ", " + newCellY + "]")
		        var point1index = (point1[0] * (totalCols)) + point1[1];
				var point2index= (point2[0] * (totalCols)) + point2[1];
				var point3index= (point3[0] * (totalCols)) + point3[1];
				var point4index= (point4[0] * (totalCols)) + point4[1];
	
	            if(prevIndex == point1index  )
					point1 = [newCellX,newCellY];
					 
				if(prevIndex == point2index )
				    point2 = [newCellX,newCellY];
				
				if(prevIndex == point3index )
				    point3 = [newCellX,newCellY];
				
				if(prevIndex == point4index  )
				    point4 = [newCellX,newCellY];


		// $(movingPoint).addClass("ending");
		//  for(var k=0; k<endPoints.length; k++){
		// 	var m =  endPoints[k][0];
		// 	var n = endPoints[k][1];
		// 	PointIndex = (m * (totalCols)) + n;
		// 	if(PointIndex == prevIndex){
		// 		console.log("yessssss" + m + " "+ n);
		// 	   m = newCellX;
		// 	   n = newCellY;
		// 	   break;
		// 	}
		//  }
	}
	else if(startOrEnd == "object"){
	   objectCell= [newCellX, newCellY];
	}

	clearBoard(keepWalls = true);
	
    return;
}

// to be looked 
function moveEnd(prevIndex, newIndex){
	// Erase last end cell
	$($("td").find(prevIndex)).removeClass();

	var newEnd = $("td").find(newIndex);
	$(newEnd).removeClass();
    $(newEnd).addClass("end");

    var newEndX = Math.floor(newIndex / totalRows);
	var newEndY = Math.floor(newIndex / totalCols);
    startCell = [newStartX, newStartY];
    return;
}