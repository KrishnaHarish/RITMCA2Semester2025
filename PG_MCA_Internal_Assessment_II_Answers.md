# Answers to Internal Assessment - II
**Programme:** PG – Master of Computer Applications  
**Course:** Design and Analysis of Algorithms (MCA22)  
**Max Marks:** 30  
**Instructions:** Answer any TWO full questions.

---

## 1.a) Depth-First Search (DFS) Algorithm and Traversal Order

**Algorithm for DFS (recursive):**
```python
def DFS(graph, v, visited):
    visited.add(v)
    for neighbor in graph[v]:
        if neighbor not in visited:
            DFS(graph, neighbor, visited)
```
**Graph Adjacency List:**
- A: B, C
- B: A, D, E
- C: A, D
- D: B, C, E
- E: B, D

**DFS Traversal starting from ‘A’ (assuming alphabetical order):**
1. Start at A: Visit A  
2. Go to B: Visit B  
3. Go to D: Visit D  
4. Go to C: Visit C  
5. Go to E: Visit E  

**Order:** A, B, D, C, E

---

## 1.b) Sort using Comparison Counting

Given List: [62, 31, 84, 96, 19, 47]

| Element | # less than it | Final Position |
|---------|---------------|---------------|
| 62      | 3             | 3             |
| 31      | 1             | 1             |
| 84      | 4             | 4             |
| 96      | 5             | 5             |
| 19      | 0             | 0             |
| 47      | 2             | 2             |

**Sorted List:** [19, 31, 47, 62, 84, 96]

---

## 2.a) Kruskal’s Algorithm for Minimum Spanning Tree (MST)

**Steps:**
1. List edges by increasing weight:  
   2-4(2), 2-5(2), 1-2(3), 1-4(4), 3-4(4), 4-5(4), 1-3(6)
2. Pick smallest edges, avoid cycles:
   - 2-4 (2)
   - 2-5 (2)
   - 1-2 (3)
   - 3-4 (4)
3. All vertices connected.

**MST Edges:** 2-4, 2-5, 1-2, 3-4  
**Total Weight:** 11

---

## 2.b) Source Removal Topological Sort

**Graph:**
```
     6
    / \
   1   5
  / \   \
 0   4   4
  \ /
   2
   |
   3
```
**Steps:**
1. In-degree 0: 6, 0
2. Remove 6 → in-degree 1 becomes 0.
3. Remove 0 → in-degree 2 becomes 0.
4. Remove 1 → in-degree 5 becomes 0.
5. Remove 2 → in-degree 3 becomes 0.
6. Remove 5 → in-degree 4 becomes 0.
7. Remove 3, then 4.

**Possible Topological Order:** 6, 0, 1, 2, 5, 3, 4

---

## 3.a) Warshall’s Algorithm and Transitive Closure

**Adjacency Matrix (Initial):**
|   | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 1 | 0 | 1 | 0 | 1 |
| 2 | 0 | 0 | 1 | 0 |
| 3 | 1 | 0 | 0 | 0 |
| 4 | 0 | 0 | 1 | 0 |

Apply Warshall’s algorithm for closure:
- After applying, all pairs are reachable.

**Transitive Closure Matrix:**
|   | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 |
| 2 | 1 | 1 | 1 | 1 |
| 3 | 1 | 1 | 1 | 1 |
| 4 | 1 | 1 | 1 | 1 |

---

## 3.b) Heap Construction Using Bottom-Up Method

Given List: 14, 22, 19, 18, 17, 10

**Steps:**
1. Arrange as binary tree:
```
        14
      /    \
     22     19
    /  \   /
   18  17 10
```
2. Heapify from bottom up (max heap):
    - Compare children with parent, swap if needed.
    - Step-by-step, final heap:
```
        22
      /    \
     18     19
    /  \   /
   14  17 10
```
**Each iteration can be shown as a tree diagram.**

---
**End of Answers**