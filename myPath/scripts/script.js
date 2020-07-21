var totalRows = 25;
var totalCols = 73;
var inProgress = false;
//var initialMessage = "Click or drag cells to build walls! Press start when you finish and have selected an algorithm!";
var cellsToAnimate = [];
var createWalls = false;
var algorithm = null;
var justFinished = false;
var animationSpeed = "Fast";
var animationState = null;
var startCell = [11, 15];
var endCell = [11, 25];
var movingStart = false;
var movingEnd = false;
var movingObject = false;
var counter =0;
var objectCell = [11, 20];
var createObject = false;
var del =0;
 var objectCellsToAnimate = [];
 var travellingCalled = false;
 var movingPoint = [];
 var movingPointIndex= false;
 var point1 =  [((startCell[0]+endCell[0])/2)+5,((startCell[1]+endCell[1])/2)+5];
 var point2 =  [((startCell[0]+endCell[0])/2)+1,((startCell[1]+endCell[1])/2)+1];
 var point3 = [((startCell[0]+endCell[0])/2)+2,((startCell[1]+endCell[1])/2)+2];
 var point4 = [((startCell[0]+endCell[0])/2)+3,((startCell[1]+endCell[1])/2)+3];
function generateGrid( rows, cols ) {
    var grid = "<table>";
    for ( row = 1; row <= rows; row++ ) {
        grid += "<tr>"; 
        for ( col = 1; col <= cols; col++ ) {      
            grid += "<td></td>";
        }
        grid += "</tr>"; 
    }
    grid += "</table>"
    return grid;
}
// function initialisEndPointsArray(4) {
// 	var endPoints =[startCell,endCell];
// 	 for(var i=1; i<=numberOfcities; i++){
// 		 var point = [endCell[0]+i+1, endCell[1]+i+1];
// 		 if(startCell == point){ point = [point[0]+1,point[1]];} 
// 		 endPoints.push(point);
// 	 }
// 	 return  endPoints;
//  }

//var endPoints = initialisEndPointsArray(numberOfcities);
var myGrid = generateGrid( totalRows, totalCols);
$( "#tableContainer" ).append( myGrid );

/* --------------------------- */
/* --- OBJECT DECLARATIONS --- */
/* --------------------------- */


/* ------------------------- */
/* ---- MOUSE FUNCTIONS ---- */
/* ------------------------- */
//walls
$( "td" ).mousedown(function(){
	var index = $( "td" ).index( this );
	var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
	var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
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
			var point1index = (point1[0] * (totalCols)) + point1[1];
				var point2index= (point2[0] * (totalCols)) + point2[1];
				var point3index= (point3[0] * (totalCols)) + point3[1];
				var point4index= (point4[0] * (totalCols)) + point4[1];

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
    if (!inProgress){
    	if (justFinished){ 
			clearBoard( keepWalls = true );
			
    		justFinished = false;
    	}
    	//console.log("Cell index = " + index);
    	if (movingStart && index != endCellIndex) {
    		moveStartOrEnd(startCellIndex, index, "start");
    	} else if (movingEnd && index != startCellIndex) {
    		moveStartOrEnd(endCellIndex, index, "end");
		}else if (movingObject && index != endCellIndex && index != startCellIndex){
            moveStartOrEnd(objectCellIndex, index, "object");
		} else if(movingPointIndex && index != endCellIndex && index != startCellIndex && index!= objectCellIndex){
			moveStartOrEnd(movingPointkIndex, index, "ending");
			console.log("2mouseenter");
		}
		else if (index != startCellIndex && index != endCellIndex && index !=objectCellIndex && index != movingPointIndex) {
    		$(this).toggleClass("wall");}
    }
});

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

/* ----------------- */
/* ---- BUTTONS ---- */
/* ----------------- */
//start button us
$( "#startBtn" ).click(function(){
    if ( algorithm == null ){ return;}
    if ( inProgress ){ update("wait"); return; }
	traverseGraph(algorithm);
});

$( "#clearBtn" ).click(function(){
	if ( inProgress ){ update("wait"); return; }
	if( del ==0){
	clearBoard(keepWalls = false);
	}

	else if( del ==1){
		clearBoard1( keepWeight = false);
		del = 0;
	}
	

});

document.getElementById("skipButton").onclick = () => {
	document.getElementById("tutorial").style.display = "none";
  // $(this).toggleButtons();
  }
/* --------------------- */
/* --- NAV BAR MENUS --- */
/* --------------------- */

$( "#algorithms .dropdown-item").click(function(){
	if ( inProgress ){ update("wait"); return; }
	algorithm = $(this).text();
	if(algorithm == "Travelling SalesMan"){
    //numberOfcities= 4;
	travellingCalled= true;
	clearBoard(keepWalls = true);}
	updateStartBtnText();
	console.log("Algorithm has been changd to: " + algorithm);
});

$( "#speed .dropdown-item").click(function(){
	if ( inProgress ){ update("wait"); return; }
	animationSpeed = $(this).text();
	updateSpeedDisplay();
	console.log("Speed has been changd to: " + animationSpeed);
});

$( "#mazes .dropdown-item").click(function(){
	if ( inProgress ){ update("wait"); return; }
	maze = $(this).text();
	if (maze == "Random" ){
		if( del ==1){
			clearBoard1(keepWeight= false);
			randomMaze();
		}
		else{
		randomMaze();}
	} else if (maze == "Recursive Division"){
		if( del ==1){
			clearBoard1(keepWeight= false);
			recursiveDivMaze(null);
		}
		else{
		recursiveDivMaze(null);}
	} else if (maze == "Recursive Division (Vertical Skew)"){
		if( del ==1){
			clearBoard1(keepWeight= false);
			recursiveDivMaze("VERTICAL");
		}
		else{
		recursiveDivMaze("VERTICAL");}
	} else if (maze == "Recursive Division (Horizontal Skew)"){
		if( del ==1){
			clearBoard1(keepWeight= false);
			recursiveDivMaze("HORIZONTAL");
		}
		else
		   recursiveDivMaze("HORIZONTAL");
	} else if (maze == "Simple Spiral"){

		if( del ==1){
			clearBoard1(keepWeight= false);
			spiralMaze();
		}
		else{
		spiralMaze();}
	}else if (maze == "High Meteorite Hit Region" ){
		
	   randomMaze1();

	}
	console.log("Maze has been changd to: " + maze);
});


	
		// let innerHTML = document.getElementById("startButtonAddObject").innerHTML;
		// if (this.currentAlgorithm !== "bidirectional") {
			// document.getElementById("water").onclick = () => {
		    //  createObject = true;
		// var cells = $("#tableContainer").find("td");
		// var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
		// for(var i =0; i<cells.length; i++){
		// 	if (i == objectCellIndex  ){
        //         $(cells[i]).addClass("object");
		// 	}
		// }
		// if((objectCell[1] < startCell[1]) && (objectCell[1] < endCell[1]) || ((objectCell[1] > startCell[1])
		// 	(objectCell[1] > endCell[1])) )
		// 	{
		// 	   alert("Please place water in the area between start and end position");
		// 	   objectCell = [11,20];
		// 	   objectCell.addClass("object");
		// 	}
			// if (this.endCell === objectNodeId || this.startCell === objectNodeId || this.numberOfObjects === 1) {
			//   console.log("Failure to place object.");
			// } else {
			  //document.getElementById("water").innerHTML = '<a href="#">Water</a></li>';
			//  this.clearPath("clickedButton");
			 // this.object = objectNodeId;
			//  this.numberOfObjects = 1;
			//  this.cell.addClass = "object";
			 // document.getElementById(objectNodeId).className = "object";
			//}
			 
	// to be worked upon	

/* ----------------- */
/* --- FUNCTIONS --- */
/* ----------------- */

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
	
	             if(prevIndex == point1index)
					 point1 = [newCellX,newCellY];
					 
					 if(prevIndex == point2index)
					 point2 = [newCellX,newCellY];
					 
					 if(prevIndex == point3index)
					 point3 = [newCellX,newCellY];
					 
					 if(prevIndex == point4index)
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
//speed change in navbar
function updateSpeedDisplay(){
	if (animationSpeed == "Slow"){
		$(".speedDisplay").text("Speed: Slow");
	} else if (animationSpeed == "Normal"){
		$(".speedDisplay").text("Speed: Normal");
	} else if (animationSpeed == "Fast"){
		$(".speedDisplay").text("Speed: Fast");
	}
	return;
}
//selects the algo
function updateStartBtnText(){
	let strikethrough = ["bfs", "dfs"];
	let name = "";
	if (algorithm == "Depth-First Search (DFS)"){
		$("#startBtn").html("Start DFS");
	} else if (algorithm == "Breadth-First Search (BFS)"){
		$("#startBtn").html("Start BFS");
	} else if (algorithm == "Dijkstra"){
		$("#startBtn").html("Start Dijkstra");
	
	} else if (algorithm == "A*"){
		$("#startBtn").html("Start A*");
	} else if (algorithm == "Greedy Best-First Search"){
		$("#startBtn").html("Start Greedy BFS");
	} else if (algorithm == "Jump Point Search"){
		$("#startBtn").html("Start JPS");
	}else if (algorithm == "Bidirectional BFS"){
		$("#startBtn").html("Start Bidirectional BFS");
	}
	else if (algorithm == "Travelling SalesMan"){
		console.log("ts");
		$("#startBtn").html("Start Travelling SalesMan");
	}
	return;
}
//     document.getElementById("algorithmDescriptor").innerHTML = `${name} is <i><b>weighted</b></i> and <i><b>does not guarantee</b></i> the shortest path!`;
//     document.getElementById("bombLegend").className = "strikethrough";
//     document.getElementById("startButtonAddObject").className = "navbar-inverse navbar-nav disabledA";
//   } else {
    // document.getElementById("pani").className = "";
    // document.getElementById("water");


// Used to display error messages
function update(message){
	$("#resultsIcon").removeClass();
	$("#resultsIcon").addClass("fas fa-exclamation");
	$('#results').css("background-color", "#ffc107");
	$("#length").text("");
	if (message == "wait"){
		$("#duration").text("Please wait for the algorithm to finish.");
	}
}

// Used to display results
function updateResults(duration, pathFound, length){
	var firstAnimation = "swashOut";
	var secondAnimation = "swashIn";
	$("#results").removeClass();
    $("#results").addClass("magictime " + firstAnimation); 
    setTimeout(function(){ 
    	$("#resultsIcon").removeClass();
    	//$("#results").css("height","80px");
    	if (pathFound){
    		$('#results').css("background-color", "#77dd77");
    		$("#resultsIcon").addClass("fas fa-check");
    	} else {
    		$('#results').css("background-color", "#ff6961");
    		$("#resultsIcon").addClass("fas fa-times");
    	}
    	$("#duration").text("Duration: " + duration + " ms");
    	$("#length").text("Length: " + length);
    	$('#results').removeClass(firstAnimation);
    	$('#results').addClass(secondAnimation); 
    }, 1100);
}

// Counts length of success
function countLength(){
	var cells = $("td");
	var l = 0;
	for (var i = 0; i < cells.length; i++){
		if ($(cells[i]).hasClass("success")){
			l++;
		}
	}
	return l;
}

async function traverseGraph(algorithm){
    inProgress = true;
	clearBoard( keepWalls = true );

	
	var startTime = Date.now();
	var pathFound = executeAlgo();
	var endTime = Date.now();
	await animateCells();
	if ( pathFound ){ 
		updateResults((endTime - startTime), true, countLength());
	} else {
		updateResults((endTime - startTime), false, countLength());
	}
	inProgress = false;
	justFinished = true;
}

function executeAlgo(){
	if (algorithm == "Depth-First Search (DFS)" ){
		if(createObject && del==0){ alert("Kindly choose one of BFS,DIJKSTRA,A*,GREEDY-BEST-FIRST")}
		else if( del ==1){
				alert("Kindly choose one of DIJKSTRA,A*,GREEDY-BEST-FIRST")
			}
		else{var visited = createVisited();
		var pathFound = DFS(startCell[0], startCell[1], visited, objectCell);}
	} else if (algorithm == "Breadth-First Search (BFS)"){
		if(createObject && del==0)
		{var pathFound = BFS(startCell,endCell, objectCell);}
		else if( del ==1){
			alert("Kindly choose one of DIJKSTRA,A*,GREEDY-BEST-FIRST")
		}
		else{
			var pathFound = BFS(startCell,endCell, null);
		}
	} else if (algorithm == "Dijkstra"){
		
		if(createObject)
		{var pathFound = dijkstra(startCell,endCell, objectCell);}
		else{
			var pathFound = dijkstra(startCell,endCell, null);
		}

	} else if (algorithm == "A*"){
		//travellingCalled= true;
		if(createObject)
		{var pathFound = AStar(startCell,endCell, objectCell);}
		else{
			var pathFound = AStar(startCell,endCell, null);
		}
	} else if (algorithm == "Greedy Best-First Search"){
		if(createObject){
		var pathFound = greedyBestFirstSearch(startCell,endCell,objectCell);}
		else{
			var pathFound = greedyBestFirstSearch(startCell,endCell,null);
		}
	} else if (algorithm == "Jump Point Search"){
		if(createObject && del==0){ alert("Kindly choose one of BFS,DIJKSTRA,A*,GREEDY-BEST-FIRST")}
		else if( del ==1){
			alert("Kindly choose one of DIJKSTRA,A*,GREEDY-BEST-FIRST")
		}
		else{var pathFound = jumpPointSearch(startCell,endCell,objectCell);}
	}
	else if (algorithm == "Bidirectional BFS"){
		if(createObject && del==0){ alert("Kindly choose one of BFS,DIJKSTRA,A*,GREEDY-BEST-FIRST")}
		else if( del ==1  ){
			alert("Kindly choose one of DIJKSTRA,A*,GREEDY-BEST-FIRST")
		}
		else{var pathFound = BidirectionalBFS()};
	}
	else if (algorithm == "Travelling SalesMan"){
	      var pathFound = draw();
	}
	return pathFound;
}

function makeWall(cell){
	if (!createWalls){return;}
    var index = $( "td" ).index( cell );
    var row = Math.floor( ( index ) / totalRows) + 1;
    var col = ( index % totalCols ) + 1;
    console.log([row, col]);
    if ((inProgress == false) && !(row == 1 && col == 1) && !(row == totalRows && col == totalCols)){
    	$(cell).toggleClass("wall");
    }
}

function createVisited(){
	var visited = [];
	var cells = $("#tableContainer").find("td");
	for (var i = 0; i < totalRows; i++){
		var row = [];
		for (var j = 0; j < totalCols; j++){
			
			if (cellIsAWall(i, j, cells)){
				row.push(true);
			} else {
				row.push(false);
			}
		}

		
			
		visited.push(row);
	}
		
	
	return visited;
	
	
	}

function cellIsAWall(i, j, cells){
	var cellNum = (i * (totalCols)) + j;
	return $(cells[cellNum]).hasClass("wall");
}

// Make it iterable?


	//Animate cells
	




function makeWalls(){
	var walls = [];
	for (var i = 0; i < totalRows; i++){
		var row = [];
		for (var j = 0; j < totalCols; j++){
			row.push(true);
		}
		walls.push(row);
	}
	return walls;
}

function neighborsThatAreWalls( neighbors, walls ){
	var neighboringWalls = 0;
	for (var k = 0; k < neighbors.length; k++){
		var i = neighbors[k][0];
		var j = neighbors[k][1];
		if (walls[i][j]) { neighboringWalls++; }
	}
	return neighboringWalls;
}

function createDistances(){
	var distances = [];
	for (var i = 0; i < totalRows; i++){
		var row = [];
		for (var j = 0; j < totalCols; j++){
			row.push(Number.POSITIVE_INFINITY);
		}
		distances.push(row);
	}
	return distances;
}

function createPrev(){
	var prev = [];
	for (var i = 0; i < totalRows; i++){
		var row = [];
		for (var j = 0; j < totalCols; j++){
			row.push(null);
		}
		prev.push(row);
	}
	return prev;
}

function getNeighbors(i, j){
	var neighbors = [];
	if ( i > 0 ){ neighbors.push( [i - 1, j] );}
	if ( j > 0 ){ neighbors.push( [i, j - 1] );}
	if ( i < (totalRows - 1) ){ neighbors.push( [i + 1, j] );}
	//total rows , total columns 
	if
	( j < (totalCols - 1) ){ neighbors.push( [i, j + 1] );}
	return neighbors;
}

async function animateCells(){
	animationState = null;
	var cells = $("#tableContainer").find("td");
	var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
	var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
	var point1index = (point1[0] * (totalCols)) + point1[1];
				var point2index= (point2[0] * (totalCols)) + point2[1];
				var point3index= (point3[0] * (totalCols)) + point3[1];
				var point4index= (point4[0] * (totalCols)) + point4[1];
	//var weightCellIndex = num.hasClass
	var delay = getDelay();
	for (var i = 0; i < cellsToAnimate.length; i++){
		var cellCoordinates = cellsToAnimate[i][0];
		var x = cellCoordinates[0];
		var y = cellCoordinates[1];
		var num = (x * (totalCols)) + y;
		if (num == startCellIndex || num == endCellIndex || (num == objectCellIndex && createObject == true) ||
		 cellIsAWeight(x, y, cells) || (travellingCalled==true && (num==point1index || num==point2index || 
			num == point3index || num == point4index))){ continue; }
		var cell = cells[num];
		var colorClass = cellsToAnimate[i][1];

		// Wait until its time to animate
		await new Promise(resolve => setTimeout(resolve, delay));

		$(cell).removeClass();
		$(cell).addClass(colorClass);
	}
	cellsToAnimate = [];
	
	//console.log("End of animation has been reached!");
	return new Promise(resolve => resolve(true));
}

/*
async function flash(color){
	var item = "#logo";
	var originalColor = $(item).css("color");
	if (color == "green"){
		var colorRGB = '40,167,50';
	} else if (color == "red"){
		var colorRGB = '255,0,0';
	}
	var delay = 1; //ms
	for (var i = 0.45; i <= 2.6; i += 0.01){
    	$(item).css("color", 'rgba(' + colorRGB + ','+Math.abs(Math.sin(i))+')');
		await new Promise(resolve => setTimeout(resolve, delay));
	}
	$(item).css("color", originalColor);
	return new Promise(resolve => resolve(true));
}
*/

function getDelay(){
	var delay;
	if (animationSpeed === "Slow"){
		if (algorithm == "Depth-First Search (DFS)") {
			delay = 25;
		} else {
			delay = 20;
		}
	} else if (animationSpeed === "Normal") {
		if (algorithm == "Depth-First Search (DFS)") {
			delay = 15;
		} else {
			delay = 10;
		}
	} else if (animationSpeed == "Fast") {
		if (algorithm == "Depth-First Search (DFS)") {
			delay = 10;
		} else {
			delay = 5;
		}
	}
	console.log("Delay = " + delay);
	return delay;
}

function clearBoard(keepWalls ){
	
	var cells = $("#tableContainer").find("td");
	var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
	var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
	var movingPointI = (movingPoint[0] * (totalCols))+ movingPoint[1];
	for (var i = 0; i < cells.length; i++){
			isWall = $( cells[i] ).hasClass("wall");
			isWeight = $( cells[i] ).hasClass("weight");
			isObject = $( cells[i] ).hasClass("object");
			$( cells[i] ).removeClass();
			if (i == startCellIndex){
				$(cells[i]).addClass("start"); 
			} else if (i == endCellIndex){
				$(cells[i]).addClass("end"); 
			 }else if( isWeight){
			  	$(cells[i]).addClass("weight"); 
			  }
			else if(i == objectCellIndex ) {
				if(((objectCell[1] < startCell[1]) && (objectCell[1] > endCell[1]) )|| 
			        ((objectCell[1] > startCell[1]) && (objectCell[1] < endCell[1]) ))
					 { $(cells[i]).addClass("object");  createObject = true;}
					 else{
						 createObject= false;
					 }
			 	
			 }else if(travellingCalled){
				var point1index = (point1[0] * (totalCols)) + point1[1];
				var point2index= (point2[0] * (totalCols)) + point2[1];
				var point3index= (point3[0] * (totalCols)) + point3[1];
				var point4index= (point4[0] * (totalCols)) + point4[1];

				// endPoints = initialisEndPointsArray(numberOfcities
				//  for(var k=0; k<endPoints.length;k++){
				// 	 var m =  endPoints[k][0];
				// 	 var n = endPoints[k][1];
				// 	 var PointIndex = (m * (totalCols)) + n;
				// 	 if(i == PointIndex){
				// 		$(cells[i]).addClass("ending"); 
				// 	}
				//  }
				// 	}				
				// else if(i == movingPointI){
				// 	console.log("did something");
				// 	$(cells[i]).addClass("ending"); 
				// }
               if(i == point1index){$(cells[i]).addClass("end"); }
			   if(i == point2index) {$(cells[i]).addClass("end"); }
			   if(i == point3index){$(cells[i]).addClass("end"); }
			   if( i == point4index) {$(cells[i]).addClass("end"); }
			   

			 }
			 else if ( keepWalls && isWall ){ 
				$(cells[i]).addClass("wall"); 
			}
			
	}
}


function clearBoard1(keepWeight ){
	
	keepWalls= false;
	var cells = $("#tableContainer").find("td");
	var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
	var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
	var objectCellIndex = (objectCell[0] * (totalCols))+ objectCell[1];
	for (var i = 0; i < cells.length; i++){
		    isWall = $( cells[i] ).hasClass("wall");
			isWeight = $( cells[i] ).hasClass("weight");
			isObject = $( cells[i] ).hasClass("object");
			$( cells[i] ).removeClass();
			if (i == startCellIndex){
				$(cells[i]).addClass("start"); 
			} else if (i == endCellIndex){
				$(cells[i]).addClass("end"); 
			}else if(keepWeight &&  isWeight){
				$(cells[i]).addClass("weight"); 
			}
			else if(i == objectCellIndex ) {
				if(((objectCell[1] < startCell[1]) && (objectCell[1] > endCell[1]) )|| 
			        ((objectCell[1] > startCell[1]) && (objectCell[1] < endCell[1]) ))
					 { $(cells[i]).addClass("object");  createObject = true;}
					 else{
						 createObject= false;
					 }
			 	
			 }
			 else if ( keepWalls && isWall ){ 
				$(cells[i]).addClass("wall"); 
			}
			
			
	}
}




// Ending statements
clearBoard();
//clearBoard1();
//clearBoard1();

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
})

$(window).on('load',function(){
        $('#exampleModalLong').modal('show');
});
