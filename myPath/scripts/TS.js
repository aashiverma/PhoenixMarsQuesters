var endPoints = [endCell,point1, point2, point3, point4];

var popSize = 100;
var population = [];
var fitness = [];

var recordDistance = Infinity;
var bestEver= [];
var currentBest;

function createOrderandPopulation(){
  var order = [];
  for(var k=0; k<endPoints.length; k++){
    order[k]= k;
  }
  for (var i = 0; i < popSize; i++) {
         population[i] = shuffle(order,8);
         
         //  console.log(population[i]);
         
      }
}

//var statusP;

// function setup() {
//   createCanvas(800, 800);
//   var order = [];
//   for (var i = 0; i < totalCities; i++) {
//     var v = createVector(random(width), random(height / 2));
//     cities[i] = v;
//     order[i] = i;
//   }

//   for (var i = 0; i < popSize; i++) {
//     population[i] = shuffle(order);
//   }
//   statusP = createP('').style('font-size', '32pt');
// }

function draw() {

  endPoints= [endCell,point1, point2, point3, point4];

  //background(0);
   createOrderandPopulation();
  // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

//   stroke(255);
//   strokeWeight(4);
//   noFill();
//   beginShape();
  var CELLS = [];
  console.log(bestEver);
 
  for (var i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
  
   
    CELLS[i]= endPoints[n];
   // cellsToAnimate.push( [[endPoints[n][0],endPoints[n][1]], "visited"] );

   console.log(endPoints[n]);
  //  vertex(endPoints[n][0], endPoints[n][1]);
  //  ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  //console.log(population.length);
 display(CELLS);
 //travellingCalled = false;
  //endShape();
  return true;
  // translate(0, height / 2);
  // stroke(255);
  // strokeWeight(4);
  // noFill();
  // beginShape();
  // for (var i = 0; i < currentBest.length; i++) {
  //   var n = currentBest[i];
  //   vertex(cities[n].x, cities[n].y);
  //   ellipse(cities[n].x, cities[n].y, 16, 16);
  // }///////
  // endShape();
}

function shuffle(a, num) {
  for (var i = 0; i < num; i++) {
    var indexA = Math.floor(Math.random() * a.length);
    var indexB = Math.floor(Math.random() * a.length);
    swap(a, indexA, indexB);
  // console.log(a);
  }
  return a;
}

function display(CELLS){
    var collect = [];
   for(var k=0; k<CELLS.length-1; k++){
          var i = CELLS[k][0];
          var j = CELLS[k][1];

          var x = CELLS[k+1][0];
          var y = CELLS[k+1][1];

          collect.push(dijkstra([i,j],[x,y],null));
   }
  // collect.map(collect[i].map( ([r,c]) => cellsToAnimate.push( [[r,c], "success"] )));
  for(var i=0; i<collect.length; i++){
      collect[i].map(([r,c]) => cellsToAnimate.push( [[r,c], "success"] ));
  }
  collect = [];
}



function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = getDistance(cityA[0], cityA[1], cityB[0], cityB[1]);
   // var d = dist(cityA[0], cityA[1], cityB[0], cityB[1]);
    sum += d;
  }
  return sum;
}
function getDistance(xA, yA, xB, yB) { 
	var xDiff = xA - xB; 
	var yDiff = yA - yB; 

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}


function calculateFitness() {
    var currentRecord = Infinity;
    for (var i = 0; i < population.length; i++) {
        console.log(/*population[i].length + " "+*/ population.length);
      var d =  2;  /* calcDistance(endPoints, population[i]);*/
      if (d < recordDistance) {
        recordDistance = d;
        bestEver = population[i];
      }
      if (d < currentRecord) {
        currentRecord = d;
        currentBest = population[i];
      }
  
      // This fitness function has been edited from the original video
      // to improve performance, as discussed in The Nature of Code 9.6 video,
      // available here: https://www.youtube.com/watch?v=HzaLIO9dLbA
      fitness[i] = 1 / (Math.pow(d, 8) + 1);
    }
  }
  
  function normalizeFitness() {
    var sum = 0;
    for (var i = 0; i < fitness.length; i++) {
      sum += fitness[i];
    }
    for (var i = 0; i < fitness.length; i++) {
      fitness[i] = fitness[i] / sum;
    }
  }
  
  function nextGeneration() {
    var newPopulation = [];
    for (var i = 0; i < population.length; i++) {
      var orderA = pickOne(population, fitness);
      var orderB = pickOne(population, fitness);
      var order = crossOver(orderA, orderB);
      mutate(order, 0.01);
      newPopulation[i] = order;
    }
    population = newPopulation;
  }
  
  function pickOne(list, prob) {
    var index = 0;
    var r = Math.random(1);
  
    while (r > 0) {
      r = r - prob[index];
      index++;
    }
    index--;
    return list[index].slice();
  }
  
  function crossOver(orderA, orderB) {
    var start = Math.floor(Math.random(orderA.length));
    var end = Math.floor(Math.random(start + 1, orderA.length));
    var neworder = orderA.slice(start, end);
    // var left = totalCities - neworder.length;
    for (var i = 0; i < orderB.length; i++) {
      var city = orderB[i];
      if (!neworder.includes(city)) {
        neworder.push(city);
      }
    }
    return neworder;
  }
  
  function mutate(order, mutationRate) {
    for (var i = 0; i < 6; i++) {
      if (Math.random(1) < mutationRate) {
        var indexA = Math.floor(Math.random(order.length));
        var indexB = (indexA + 1) % 6;
        swap(order, indexA, indexB);
      }
    }
  }