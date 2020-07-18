# PHEONIX MARS QUESTERS (Mars Colonization Project)

Our project is a shortest path finding  web Application based on the theme "MARS COLONIZATION".
This project was build to establish a permanent human settlement on Mars.

What can it do?
Our Pheonix Mars Quester is a mars rover which finds the shortest path between two points while avoiding obstacles on the way.

How it works?
It finds the shortest path using the algorithm selected by the user.

Meet The Algorithms

The application supports the following algorithms :-

1. Dijkstra's Algorithm (weighted): the father of pathfinding algorithms; guarantees the shortestpath

2. A Search* (weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm.

3. Greedy Best-first Search (weighted): a faster, more heuristic-heavy version of A*; does not  guarantee the shortest path

4. Breath-first Search (unweighted): a great algorithm; guarantees the shortest path

5. Depth-first Search (unweighted): a very bad algorithm for pathfinding; does not guarantee the     shortest path

6. Bi-directional BFS : breath first search algorithm which searches bidirectionally

7. Jump Point search : jump point search (JPS) is an optimization to the A* search algorithm for uniform-cost grids.

8. Travelling Salesman : gives shortest possible route that visits every city/Node exactly once and returns to the starting point.

MAZES

There are the following mazes :-

1. Random (recursive backtracking)
2. Recursive Division
3. Recursive Division (horizontal skew)
4. Recursive Division (vertical skew)
5. Simple Spiral
6. High Meteorite Hit Region

All the mazes are implemented using recursion and bactracking

HIGH METEORITE HIT REGION 
Meteorite hit is very usual on planets like mars . The meteorite hit region is high risk region so our rover must avoid travelling through that region . It needs to decide to travel through such a path which might not be the shortest but contains least amount of hits in its way as our ultimate goal is to find the shortest path so it might have to face certain amount of risks. 

WATER
The most important thing required for human settlement on mars is WATER. So, if our rover finds the presence of water on mars  prioritizing the need of water it travles through  water even if it may not provide the shortest path between our start node and end node. 

