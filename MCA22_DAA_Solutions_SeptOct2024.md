# MCA22: Design and Analysis of Algorithms  
**Model Answers – Sept / Oct 2024**

---

## UNIT - I

### 1.a) Explain the term Algorithm. Explain the characteristics of a good algorithm.

**Algorithm:**  
An algorithm is a finite sequence of well-defined instructions to solve a problem or perform a computation.

**Characteristics of a Good Algorithm:**  
1. **Input:** Clearly defined inputs.
2. **Output:** Clearly defined outputs.
3. **Definiteness:** Each step is precisely defined.
4. **Finiteness:** Must terminate after a finite number of steps.
5. **Effectiveness:** Steps must be basic enough to be performed, in principle, by a human using pen and paper.
6. **Generality:** Applicability to a broad class of problems.

---

### 1.b) List and explain problem types in ADA.

1. **Sorting:** Arranging data in a particular order (e.g., ascending, descending).
2. **Searching:** Finding an element in a data structure.
3. **Optimization:** Finding the best solution among many.
4. **Decision Problems:** Yes/No answers.
5. **Graph Problems:** Shortest path, connectivity, etc.
6. **Numerical Problems:** Calculations, such as finding GCD.

---

### 1.c) Write an Algorithm for Sequential Search, Discuss Worst, Best, and Average-Case Efficiencies.

**Sequential Search Algorithm:**
```pseudo
Algorithm SequentialSearch(A, n, key)
Input: Array A of n elements, key to search
Output: Index of key if found, else -1
for i = 0 to n-1 do
   if A[i] == key then
       return i
return -1
```

**Efficiencies:**
- **Best Case:** 1 comparison (key is at first position). **O(1)**
- **Worst Case:** n comparisons (key is not present or at last position). **O(n)**
- **Average Case:** (n+1)/2 comparisons. **O(n)** (assuming key is equally likely at any position).

---

### 2.a) Algorithm for Element Uniqueness Problem and Time Complexity

**Problem:** Given array A[1..n], are all elements unique?

**Algorithm:**
```pseudo
Algorithm ElementUniqueness(A, n)
for i = 1 to n-1 do
    for j = i+1 to n do
        if A[i] == A[j] then
            return False
return True
```

**Time Complexity:**  
Nested loops ⇒ O(n^2)

---

### 2.b) Explain the algorithm design and analysis process with a flow chart.

**Process:**
1. **Problem Definition**
2. **Algorithm Design**
3. **Algorithm Analysis (Time & Space)**
4. **Implementation**
5. **Testing**

**Flow Chart:**  
[Start] → [Define Problem] → [Design Algorithm] → [Analyze Algorithm] → [Implement] → [Test] → [End]

---

## UNIT - II

### 3.a) Brute–Force Approach; Selection Sort Algorithm and Trace

**Brute-Force:**  
Solves a problem by exploring all possible solutions.

**Selection Sort Algorithm:**
```pseudo
Algorithm SelectionSort(A, n)
for i = 0 to n-2 do
    min = i
    for j = i+1 to n-1 do
        if A[j] < A[min] then
            min = j
    swap A[i] and A[min]
```

**Trace for [81, 43, 66, 87, 21, 34, 15]:**
1. Find min (15), swap with 81 → [15, 43, 66, 87, 21, 34, 81]
2. Next min (21), swap with 43 → [15, 21, 66, 87, 43, 34, 81]
3. Next min (34), swap with 66 → [15, 21, 34, 87, 43, 66, 81]
4. Next min (43), swap with 87 → [15, 21, 34, 43, 87, 66, 81]
5. Next min (66), swap with 87 → [15, 21, 34, 43, 66, 87, 81]
6. Next min (81), swap with 87 → [15, 21, 34, 43, 66, 81, 87]

---

### 3.b) Recursive Binary Search Algorithm, Example and Complexity

**Algorithm:**
```pseudo
Algorithm BinarySearch(A, left, right, key)
if left > right then
    return -1
mid = (left + right) / 2
if A[mid] == key then
    return mid
else if A[mid] > key then
    return BinarySearch(A, left, mid-1, key)
else
    return BinarySearch(A, mid+1, right, key)
```

**Example:** Searching 43 in [15, 21, 34, 43, 66, 81, 87]
- mid = 3 (43). Found at index 3.

**Worst-case Time Complexity:**  
Each step halves the array: T(n) = T(n/2) + O(1).  
So, O(log₂n).

---

### 4.a) Granularity, Task Interaction Graph, Degree of Concurrency

- **Granularity:** Amount of computation in a task. Fine-grained (small tasks), coarse-grained (large tasks).
- **Task Interaction Graph:** Graph showing dependencies/interactions among tasks.
- **Degree of Concurrency:** Number of tasks that can be executed simultaneously.

---

### 4.b) Merge Sort Algorithm and Application

**Algorithm:**
```pseudo
Algorithm MergeSort(A)
if length(A) > 1
    mid = length(A)/2
    left = A[0:mid]
    right = A[mid:]
    MergeSort(left)
    MergeSort(right)
    Merge(left, right, A)
```

**Sorting [8, 3, 2, 9, 7, 1, 5, 4]:**
Step-wise:  
[8,3,2,9,7,1,5,4]  
→ [8,3,2,9] [7,1,5,4]  
→ [8,3] [2,9] [7,1] [5,4]  
→ [8] [3] [2] [9] [7] [1] [5] [4]  
Merge:  
[3,8] [2,9] [1,7] [4,5]  
[2,3,8,9] [1,4,5,7]  
[1,2,3,4,5,7,8,9]

---

### 4.c) Exhaustive Search & Knapsack Problem (w=10)

**Exhaustive Search:**  
Checks all possible solutions to find the best.

**Knapsack Problem:**
- Items: (1:7,$42), (2:3,$12), (3:4,$40), (4:5,$25)
- Capacity = 10

**Subsets:**
- {1,2}: 7+3=10, Value=$54
- {3,4}: 4+5=9, Value=$65
- {2,3,4}: 3+4+5=12 (exceeds)
- {1,3}: 7+4=11 (exceeds)
- {1,4}: 7+5=12 (exceeds)
- {2,3}: 3+4=7, Value=$52
- {2,4}: 3+5=8, Value=$37
- {1}: 7, $42
- {2}: 3, $12
- {3}: 4, $40
- {4}: 5, $25

**Maximum Value:** {3,4}: $65 (weight = 9)

---

## UNIT - III

### 5.a) Graph Construction, Topological Order, Condition

**Graph:**
DS → DAA ← DM  
DBMS → DA ← DAA

**Edges:**
- DS → DAA
- DM → DAA
- DBMS → DA
- DAA → DA

**Topological Order:**  
Possible: DS, DM, DBMS, DAA, DA

**Minimum Condition:**  
Graph must be a Directed Acyclic Graph (DAG).

---

### 5.b) Decrease and Conquer, Variations, Insertion Sort

**Decrease and Conquer:**  
Solve problem by reducing it to a smaller instance.

**Variations:**
- **Decrement by 1:** Reduce size by one.
- **Decrease by Constant:** Reduce by fixed k.
- **Variable Size:** Reduce by variable amount.

**Insertion Sort Algorithm:**
```pseudo
for i = 1 to n-1 do
    key = A[i]
    j = i-1
    while j >= 0 and A[j] > key do
        A[j+1] = A[j]
        j = j-1
    A[j+1] = key
```
**Sort [189,145,168,190,129,134,117]:**  
189,145 → 145,189  
145,189,168 → 145,168,189  
145,168,189,190 → 145,168,189,190  
145,168,189,190,129 → 129,145,168,189,190  
129,145,168,189,190,134 → 129,134,145,168,189,190  
129,134,145,168,189,190,117 → 117,129,134,145,168,189,190

---

### 6.a) Define Heap; Bottom-Up Algorithm; Construct Heap for [14,22,19,18,17,10]

**Heap:**  
A complete binary tree where each parent is larger (max-heap) or smaller (min-heap) than its children.

**Bottom-Up Algorithm:**
1. Start from last non-leaf node.
2. Heapify each node up to root.

**Construction:**
Array: [14,22,19,18,17,10]  
Heapify from index 2 (19):  
- Children: 10  
- 19 > 10, no change

Index 1 (22):  
- Children: 18, 17  
- 22 > 18, 17, no change

Index 0 (14):  
- Children: 22, 19  
- 22 > 14, swap → [22,14,19,18,17,10]  
- Heapify 14 with children (18,17) → 18 > 14, swap → [22,18,19,14,17,10]

Final heap: [22,18,19,14,17,10]

*(Pictorial representation: Show tree at each step.)*

---

### 6.b) Minimal Change & Johnson Trotter for Permutations

**Minimal Change:**  
Generate permutations by changing only one element at a time.

**Johnson Trotter Algorithm:**  
Assign directions to each number, find largest mobile integer, swap, reverse directions for larger numbers.

**Example (For 3):**  
123  
213  
231  
321  
312  
132

---

## UNIT - IV

### 7.a) Dijkstra’s Algorithm (From Vertex B)

**Apply Dijkstra’s Algorithm:**  
- Initialize distances from B.
- Choose smallest tentative distance.
- Update distances for neighbors.
- Repeat until all vertices are processed.

*(List all shortest paths from B to other vertices based on graph.)*

---

### 7.b) Warshall’s Algorithm; Transitive Closure

**Warshall’s Algorithm:**
1. For each vertex k
2. For each pair (i, j)
3. If path i→k and k→j exists, set i→j

*(Apply on given matrix. Show resulting closure.)*

---

### 8.a) Hashing; Construct Hash Table h(k)=k mod 11

**Hash Table for (30,20,56,75,31,19):**
- 30 mod 11 = 8
- 20 mod 11 = 9
- 56 mod 11 = 1
- 75 mod 11 = 9 (collision)
- 31 mod 11 = 9 (collision)
- 19 mod 11 = 8 (collision)

Open hash table (chaining or linear probing).  
**Largest comparisons:** At index 9, 3 keys (20,75,31) → 3 comparisons for successful search.

---

### 8.b) Distribution Counting Algorithm; Sort [13,11,12,13,12,12]

**Algorithm:**  
1. Count occurrences of each value.
2. Place values in sorted order.

Counts:  
11:1, 12:3, 13:2

Sorted: [11,12,12,12,13,13]

---

## UNIT - V

### 9.a) Subset-Sum using Backtracking; State-space tree for S={3,5,6,7}, d=15

**Backtracking:**  
Explore subsets recursively, include/exclude element.

**State-space tree:**  
Root: (sum=0)  
Level 1: Include 3/Exclude 3  
Level 2: Include 5/Exclude 5, etc.

**Path to solution:**  
3+5+7=15  
3+6+7=16 (exceeds)  
5+6+7=18 (exceeds)  
3+5+6=14  
So, {3,5,7} is a solution.

*(Draw tree showing decisions at each node.)*

---

### 9.b) Knapsack using Branch and Bound

**Apply Branch and Bound:**  
- Calculate bound at each node.
- Prune nodes with bound < current best.
- Explore promising nodes.

*(Solve instance with capacity, values, and weights and show maximum profit.)*

---

### 10.a) Notes on P, NP, NP Complete, NP Hard

- **P:** Problems solvable in polynomial time.
- **NP:** Solutions verifiable in polynomial time.
- **NP Complete:** NP problems to which any NP problem can be reduced in polynomial time.
- **NP Hard:** As hard as NP Complete, not necessarily in NP.

---

### 10.b) TSP using Branch and Bound

**Branch and Bound for TSP:**
- Start with initial city.
- Calculate cost for partial tours.
- Prune branches with cost > current minimum.
- Continue until all permutations are checked, find minimal cost tour.

---

**End of Solutions**