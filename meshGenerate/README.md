# Mesh Generation
This concept was first implemented in my earlier repository [WebDev-Concepts](https://github.com/mjj0013/WebDev-Concepts). Some of the differences between these two respositories are that, in the earlier version, about 50 nodes would be randomly generated instead of coming from the user's input and the nodes were draggable. This process of mesh generation can be broken into two steps: building the edges and finding cycles in the graph that become shapes(mostly triangles). The second step is more complicated and hasn't been completely implemented to find the shortest cycles and to detect shapes beyond triangles. Sometimes a random node will be left out of the mesh in the first step and I've yet to fit this. 

### Building Edges
I didn't follow a specific methodology in this first step, so it may not be as optimized as it can be. For each generated node, I would find and store the distances between it and every other node. I would then sort these distances from least to greatest to determine the closest nodes to each node.
I would then reiterate through the list of nodes again. For each node, I would take its top 4 closest nodes and then merge their own top 4 closest nodes into one list of common nodes, removing any repeating values. For each permutation of two nodes in this new list, I would first determine if an edge already exists between them. If an edge doesn't exist, I would then evaluate if the edge had a point of intersection with any other existing edges using this equation:
![formula1](../lineIntersectionFormula.png)
[https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection](https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection)

If the point of intersection was located anywhere on both edges, then there would be an intersection, and the edge would be discarded.


### Finding Cycles
For this step, I followed a methodology using a Depth-First Search algorithm. This involved using recursion and traversing the graph structure, from node to node. after traversing a node it would be marked as 'visited'. If the algorithm ever moved to a node that was already visited, it would know that it had traveled in a cycle. One of issues with this method was that it didn't account for the case when a cycle could exist 'inside' a larger cycle. The desired outcome was detecting all of the smallest cycles, so that none of the cycles overlapped each other. However, this was never entirely resolved. The short-term solution was making the color of each shape 'hsla' so that any smaller cycles could at least be seen. 

## Animating the Mesh
To do this, each node's coordinates are expressed with trigonometric functions (x=cos(...), y=sin(...)). A variable was continuously incremented to serve as the time-variable. It was more visually appealing to have the nodes move in different phases from each other, and this was easily done by giving each node a randomly generated number for 'phase' and adding that inside their trigonometric functions.

## Roadmap of future improvements
Many improvements can be made to the cycle detection algorithm. 

## License Information
Copyright 2021 Matthew Joseph Jett

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
